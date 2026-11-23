const ALLOWED_ORIGINS = new Set([
	'https://idominiqe.com',
	'https://www.idominiqe.com',
	'http://127.0.0.1:4321',
	'http://localhost:4321',
]);

const MAX_BODY_BYTES = 8192;
const SESSION_TTL_SEC = 604800; // 7 days
const RATE_LIMIT_WINDOW_SEC = 60;
const RATE_LIMIT_MAX_REQ = 15;

function buildCorsHeaders(origin) {
	const allowed = origin && ALLOWED_ORIGINS.has(origin) ? origin : 'https://idominiqe.com';
	return {
		'Access-Control-Allow-Origin': allowed,
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, X-Session-Token, X-Setup-Secret',
		'Cache-Control': 'no-store',
		Vary: 'Origin',
	};
}

function jsonResponse(data, status, origin) {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			...buildCorsHeaders(origin),
		},
	});
}

function logEvent(level, event, details = {}) {
	console.log(JSON.stringify({ level, event, ts: new Date().toISOString(), ...details }));
}

function toHex(bytes) {
	return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

function randomHex(byteLength) {
	const buf = new Uint8Array(byteLength);
	crypto.getRandomValues(buf);
	return toHex(buf);
}

async function sha256Bytes(value) {
	const encoded = new TextEncoder().encode(String(value ?? ''));
	const hash = await crypto.subtle.digest('SHA-256', encoded);
	return new Uint8Array(hash);
}

async function sha256Hex(value) {
	return toHex(await sha256Bytes(value));
}

async function timingSafeEqual(a, b) {
	if (typeof a !== 'string' || typeof b !== 'string' || !a || !b) return false;
	const [hashA, hashB] = await Promise.all([sha256Bytes(a), sha256Bytes(b)]);
	let diff = 0;
	for (let i = 0; i < hashA.length; i += 1) {
		diff |= hashA[i] ^ hashB[i];
	}
	return diff === 0;
}

async function readBoundedJson(request, maxBytes = MAX_BODY_BYTES) {
	const contentLength = Number(request.headers.get('content-length') || '0');
	if (contentLength > maxBytes) {
		return { error: 'Payload too large', status: 413 };
	}
	if (!request.body) {
		return { error: 'Empty request body', status: 400 };
	}

	const reader = request.body.getReader();
	const chunks = [];
	let total = 0;

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		if (!value) continue;
		total += value.byteLength;
		if (total > maxBytes) {
			try {
				await reader.cancel();
			} catch (_) {}
			return { error: 'Payload too large', status: 413 };
		}
		chunks.push(value);
	}

	const combined = new Uint8Array(total);
	let offset = 0;
	for (const chunk of chunks) {
		combined.set(chunk, offset);
		offset += chunk.byteLength;
	}

	try {
		const decoded = new TextDecoder().decode(combined);
		return { data: JSON.parse(decoded) };
	} catch (_) {
		return { error: 'Invalid JSON payload', status: 400 };
	}
}

function escapeHtml(text) {
	return String(text)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

async function callTelegram(env, method, payload) {
	if (!env.TELEGRAM_BOT_TOKEN) {
		return { ok: false, description: 'Bot token missing' };
	}
	const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`;
	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: payload ? JSON.stringify(payload) : '{}',
	});
	const data = await response.json().catch(() => ({ ok: false, description: 'Invalid Telegram JSON' }));
	if (!response.ok || !data?.ok) {
		logEvent('error', 'telegram_api_error', {
			method,
			status: response.status,
			description: data?.description || 'unknown',
		});
	}
	return data;
}

function formatVisitorMessageHtml(name, shortId, text, isQueued = false) {
	const label = isQueued ? '⏳ <b>Отложенное сообщение с idominiqe.com</b>' : '💬 <b>Новое сообщение с idominiqe.com</b>';
	return (
		`${label}\n` +
		`👤 <b>От:</b> ${escapeHtml(name)} · <code>#${escapeHtml(shortId)}</code>\n\n` +
		`${escapeHtml(text)}\n\n` +
		`<i>Сделайте Reply (Ответить) на это сообщение, чтобы ответ появился в чате на сайте.</i>`
	);
}

async function checkRateLimit(env, ip) {
	const key = `rl:${ip}`;
	const currentRaw = await env.CHAT_KV.get(key);
	const current = Number(currentRaw || '0');
	if (current >= RATE_LIMIT_MAX_REQ) {
		return false;
	}
	await env.CHAT_KV.put(key, String(current + 1), { expirationTtl: RATE_LIMIT_WINDOW_SEC });
	return true;
}

async function handleStatus(env, origin) {
	const [ownerChatId, botMetaRaw] = await Promise.all([
		env.CHAT_KV.get('owner:chat_id'),
		env.CHAT_KV.get('meta:bot', { type: 'json' }),
	]);
	return jsonResponse(
		{
			ok: true,
			ownerBound: Boolean(ownerChatId),
			botUsername: botMetaRaw?.username || null,
		},
		200,
		origin
	);
}

async function handleSetup(request, env, origin) {
	const provided = request.headers.get('X-Setup-Secret') || '';
	const authorized = await timingSafeEqual(provided, env.TELEGRAM_WEBHOOK_SECRET || '');
	if (!authorized) {
		return jsonResponse({ ok: false, error: 'Unauthorized' }, 401, origin);
	}

	const me = await callTelegram(env, 'getMe', {});
	if (!me?.ok || !me.result) {
		return jsonResponse({ ok: false, error: 'Telegram getMe failed', details: me?.description || null }, 502, origin);
	}

	const botInfo = {
		id: String(me.result.id),
		username: me.result.username || '',
		firstName: me.result.first_name || '',
	};
	await env.CHAT_KV.put('meta:bot', JSON.stringify(botInfo));

	let ownerChatId = await env.CHAT_KV.get('owner:chat_id');
	let autoBound = false;

	if (!ownerChatId) {
		// Remove active webhook momentarily without dropping updates so getUpdates can inspect recent /start chats
		await callTelegram(env, 'deleteWebhook', { drop_pending_updates: false });
		const updates = await callTelegram(env, 'getUpdates', { limit: 25, allowed_updates: ['message'] });
		if (updates?.ok && Array.isArray(updates.result)) {
			for (let i = updates.result.length - 1; i >= 0; i -= 1) {
				const msg = updates.result[i]?.message;
				if (msg?.chat?.type === 'private' && String(msg.chat.id) !== botInfo.id) {
					ownerChatId = String(msg.chat.id);
					autoBound = true;
					await env.CHAT_KV.put('owner:chat_id', ownerChatId);
					await callTelegram(env, 'sendMessage', {
						chat_id: ownerChatId,
						text: '✅ Чат сайта idominiqe.com автоматически подключён! Все сообщения посетителей придут сюда.',
					});
					break;
				}
			}
		}
	}

	const webhookRes = await callTelegram(env, 'setWebhook', {
		url: 'https://idominiqe.com/api/chat/webhook',
		secret_token: env.TELEGRAM_WEBHOOK_SECRET,
		allowed_updates: ['message'],
		drop_pending_updates: false,
	});

	logEvent('info', 'setup_completed', {
		botUsername: botInfo.username,
		ownerBound: Boolean(ownerChatId),
		autoBound,
		webhookSet: Boolean(webhookRes?.ok),
	});

	return jsonResponse(
		{
			ok: true,
			bot: botInfo,
			ownerBound: Boolean(ownerChatId),
			autoBound,
			webhookSet: Boolean(webhookRes?.ok),
		},
		200,
		origin
	);
}

async function handleSend(request, env, origin) {
	const parsed = await readBoundedJson(request, MAX_BODY_BYTES);
	if (parsed.error) {
		return jsonResponse({ ok: false, error: parsed.error }, parsed.status || 400, origin);
	}

	const body = parsed.data || {};
	if (typeof body.website === 'string' && body.website.trim() !== '') {
		return jsonResponse({ ok: false, error: 'Invalid submission' }, 400, origin);
	}

	const text = String(body.text || '').trim();
	if (!text || text.length > 800) {
		return jsonResponse({ ok: false, error: 'Сообщение должно содержать от 1 до 800 символов.' }, 400, origin);
	}

	const name = String(body.name || '').trim().slice(0, 48) || 'Гость';
	const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
	const allowed = await checkRateLimit(env, ip);
	if (!allowed) {
		return jsonResponse({ ok: false, error: 'Слишком много сообщений. Подождите минуту.' }, 429, origin);
	}

	let sessionId = typeof body.sessionId === 'string' ? body.sessionId.trim() : '';
	let sessionToken = typeof body.sessionToken === 'string' ? body.sessionToken.trim() : '';
	let session = null;

	if (sessionId && sessionToken) {
		const existing = await env.CHAT_KV.get(`sess:${sessionId}`, { type: 'json' });
		const suppliedHash = await sha256Hex(sessionToken);
		if (existing && (await timingSafeEqual(suppliedHash, existing.tokenHash))) {
			session = existing;
			session.name = name;
		}
	}

	if (!session) {
		sessionId = crypto.randomUUID();
		sessionToken = randomHex(24);
		const shortId = sessionId.slice(0, 8).toLowerCase();
		session = {
			tokenHash: await sha256Hex(sessionToken),
			shortId,
			name,
			messages: [],
		};
		await env.CHAT_KV.put(`short:${shortId}`, sessionId, { expirationTtl: SESSION_TTL_SEC });
	}

	const visitorMsg = {
		id: crypto.randomUUID(),
		role: 'visitor',
		text,
		ts: Date.now(),
	};
	session.messages = [...(session.messages || []), visitorMsg].slice(-40);

	const [ownerChatId, botMeta] = await Promise.all([
		env.CHAT_KV.get('owner:chat_id'),
		env.CHAT_KV.get('meta:bot', { type: 'json' }),
	]);

	let delivered = false;
	if (ownerChatId && (!botMeta || ownerChatId !== String(botMeta.id))) {
		const tgRes = await callTelegram(env, 'sendMessage', {
			chat_id: ownerChatId,
			parse_mode: 'HTML',
			text: formatVisitorMessageHtml(name, session.shortId, text, false),
		});
		if (tgRes?.ok && tgRes.result?.message_id) {
			delivered = true;
			await env.CHAT_KV.put(`tgmsg:${tgRes.result.message_id}`, sessionId, {
				expirationTtl: SESSION_TTL_SEC,
			});
		}
	}

	let queued = false;
	if (!delivered) {
		queued = true;
		const queueRaw = (await env.CHAT_KV.get('pending:queue', { type: 'json' })) || [];
		const nextQueue = [
			...queueRaw,
			{ sessionId, shortId: session.shortId, name, text, ts: visitorMsg.ts },
		].slice(-25);
		await env.CHAT_KV.put('pending:queue', JSON.stringify(nextQueue), {
			expirationTtl: SESSION_TTL_SEC,
		});
	}

	await env.CHAT_KV.put(`sess:${sessionId}`, JSON.stringify(session), {
		expirationTtl: SESSION_TTL_SEC,
	});

	return jsonResponse(
		{
			ok: true,
			delivered,
			queued,
			ownerBound: Boolean(ownerChatId),
			botUsername: botMeta?.username || null,
			sessionId,
			sessionToken,
			messages: session.messages,
		},
		200,
		origin
	);
}

async function handlePoll(request, env, origin, url) {
	const sessionId = (url.searchParams.get('session') || '').trim();
	const token = (request.headers.get('X-Session-Token') || '').trim();
	if (!sessionId || !token) {
		return jsonResponse({ ok: false, error: 'Missing session credentials' }, 401, origin);
	}

	const [session, ownerChatId] = await Promise.all([
		env.CHAT_KV.get(`sess:${sessionId}`, { type: 'json' }),
		env.CHAT_KV.get('owner:chat_id'),
	]);

	if (!session) {
		return jsonResponse({ ok: false, error: 'Session expired or not found' }, 404, origin);
	}

	const suppliedHash = await sha256Hex(token);
	if (!(await timingSafeEqual(suppliedHash, session.tokenHash))) {
		return jsonResponse({ ok: false, error: 'Invalid session token' }, 401, origin);
	}

	return jsonResponse(
		{
			ok: true,
			ownerBound: Boolean(ownerChatId),
			messages: session.messages || [],
		},
		200,
		origin
	);
}

async function handleWebhook(request, env, origin) {
	const secretHeader = request.headers.get('X-Telegram-Bot-Api-Secret-Token') || '';
	const authorized = await timingSafeEqual(secretHeader, env.TELEGRAM_WEBHOOK_SECRET || '');
	if (!authorized) {
		return jsonResponse({ ok: false, error: 'Unauthorized webhook' }, 401, origin);
	}

	const parsed = await readBoundedJson(request, 32768);
	if (parsed.error) {
		return jsonResponse({ ok: true }, 200, origin);
	}

	const msg = parsed.data?.message;
	if (!msg) {
		return jsonResponse({ ok: true }, 200, origin);
	}

	const chatId = String(msg.chat?.id || '');
	const chatType = msg.chat?.type;
	const text = String(msg.text || '').trim();

	const [botMeta, currentOwnerChatId] = await Promise.all([
		env.CHAT_KV.get('meta:bot', { type: 'json' }),
		env.CHAT_KV.get('owner:chat_id'),
	]);

	if (chatType === 'private' && chatId && (!botMeta || chatId !== String(botMeta.id)) && (text.startsWith('/start') || text.startsWith('/bind'))) {
		const parts = text.split(/\s+/);
		const suppliedCode = parts[1] || '';
		if (await timingSafeEqual(suppliedCode, env.OWNER_BIND_CODE || '')) {
			await env.CHAT_KV.put('owner:chat_id', chatId);
			await callTelegram(env, 'sendMessage', {
				chat_id: chatId,
				text: '✅ Чат сайта idominiqe.com подключён! Все сообщения посетителей придут сюда — делайте Reply на любое сообщение, чтобы ответить прямо в чат на сайте.',
			});

			const pending = (await env.CHAT_KV.get('pending:queue', { type: 'json' })) || [];
			for (const item of pending) {
				const sent = await callTelegram(env, 'sendMessage', {
					chat_id: chatId,
					parse_mode: 'HTML',
					text: formatVisitorMessageHtml(item.name || 'Гость', item.shortId || 'chat', item.text || '', true),
				});
				if (sent?.ok && sent.result?.message_id && item.sessionId) {
					await env.CHAT_KV.put(`tgmsg:${sent.result.message_id}`, item.sessionId, {
						expirationTtl: SESSION_TTL_SEC,
					});
				}
			}
			if (pending.length > 0) {
				await env.CHAT_KV.delete('pending:queue');
			}
			logEvent('info', 'owner_bound', { flushedPending: pending.length });
			return jsonResponse({ ok: true }, 200, origin);
		}
		if (!currentOwnerChatId) {
			await callTelegram(env, 'sendMessage', {
				chat_id: chatId,
				text: 'Для подключения чата откройте персональную ссылку активации с кодом привязки.',
			});
		}
		return jsonResponse({ ok: true }, 200, origin);
	}

	if (currentOwnerChatId && chatId === currentOwnerChatId && msg.reply_to_message && text) {
		const replyMsgId = String(msg.reply_to_message.message_id || '');
		let sessionId = await env.CHAT_KV.get(`tgmsg:${replyMsgId}`);
		if (!sessionId) {
			const match = String(msg.reply_to_message.text || '').match(/#([a-f0-9]{8})/i);
			if (match) {
				sessionId = await env.CHAT_KV.get(`short:${match[1].toLowerCase()}`);
			}
		}

		if (sessionId) {
			const session = await env.CHAT_KV.get(`sess:${sessionId}`, { type: 'json' });
			if (session) {
				const replyEntry = {
					id: crypto.randomUUID(),
					role: 'owner',
					text: text.slice(0, 2000),
					ts: Date.now(),
				};
				session.messages = [...(session.messages || []), replyEntry].slice(-40);
				await env.CHAT_KV.put(`sess:${sessionId}`, JSON.stringify(session), {
					expirationTtl: SESSION_TTL_SEC,
				});
				await callTelegram(env, 'sendMessage', {
					chat_id: chatId,
					reply_to_message_id: msg.message_id,
					text: '✅ Ответ доставлен в чат на сайте',
				});
			}
		}
	}

	return jsonResponse({ ok: true }, 200, origin);
}

export default {
	async fetch(request, env, ctx) {
		const origin = request.headers.get('Origin') || '';
		const url = new URL(request.url);

		if (!url.pathname.startsWith('/api/chat')) {
			return fetch(request);
		}

		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: buildCorsHeaders(origin) });
		}

		try {
			if (request.method === 'GET' && url.pathname === '/api/chat/status') {
				return await handleStatus(env, origin);
			}
			if (request.method === 'POST' && url.pathname === '/api/chat/setup') {
				return await handleSetup(request, env, origin);
			}
			if (request.method === 'POST' && url.pathname === '/api/chat/send') {
				return await handleSend(request, env, origin);
			}
			if (request.method === 'GET' && url.pathname === '/api/chat/poll') {
				return await handlePoll(request, env, origin, url);
			}
			if (request.method === 'POST' && url.pathname === '/api/chat/webhook') {
				return await handleWebhook(request, env, origin);
			}
			return jsonResponse({ ok: false, error: 'Not found' }, 404, origin);
		} catch (err) {
			logEvent('error', 'worker_unhandled_exception', {
				path: url.pathname,
				message: err instanceof Error ? err.message : String(err),
			});
			return jsonResponse({ ok: false, error: 'Internal server error' }, 500, origin);
		}
	},
};
