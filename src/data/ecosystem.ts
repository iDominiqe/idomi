export interface ProjectItem {
	id: string;
	badge: string;
	tags: string[];
	title: string;
	shortTitle: string;
	description: string;
	stack: string;
	liveUrl: string;
	domainLabel: string;
	repoName: string;
	repoUrl: string;
	accent: string;
	gradient: string;
	highlights: string[];
}

export interface BlogPostItem {
	slug: string;
	href: string;
	category: string;
	title: string;
	excerpt: string;
	readTime: string;
	updated: string;
	accent: string;
}

export interface ThemePreset {
	id: 'loft' | 'obsidian' | 'aurora' | 'flat-dark' | 'flat-light';
	mode: 'dark' | 'light';
	name: string;
	badge: string;
	description: string;
	swatch: string;
}

export interface SocialItem {
	label: string;
	handle: string;
	href: string;
	kind: 'github' | 'discord' | 'telegram' | 'youtube' | 'instagram' | 'facebook';
}

export const PROJECTS: ProjectItem[] = [
	{
		id: 'smartcity-v3',
		badge: '3D WebGL Flagship',
		tags: ['Three.js', 'PBR Daylight', 'WASM'],
		title: 'NEO Smart-City v3',
		shortTitle: 'Smart-City v3',
		description:
			'Photorealistic SolarSync studio-daylight 3D smart city command center featuring procedural RoomEnvironment PBR lighting and smooth camera choreography.',
		stack: 'Three.js · RoomEnvironment PBR · WASM',
		liveUrl: 'https://smartcity-v3.idominiqe.com/',
		domainLabel: 'smartcity-v3.idominiqe.com',
		repoName: 'iDominiqe/smartcity-v3',
		repoUrl: 'https://github.com/iDominiqe/smartcity-v3',
		accent: '#60a5fa',
		gradient:
			'radial-gradient(circle at 75% 22%, rgba(96, 165, 250, 0.55), transparent 55%), radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.35), transparent 55%), linear-gradient(135deg, #0f172a 0%, #1e293b 52%, #0c4a6e 100%)',
		highlights: [
			'Procedural RoomEnvironment IBL reflections',
			'Real-time SolarSync daylight & grid telemetry',
			'Multi-tier WebAssembly compute optimizations',
		],
	},
	{
		id: 'blaze-hud',
		badge: 'Tactical WebGL HUD',
		tags: ['Three.js', 'Preserve-3D', 'Web Audio'],
		title: 'BLAZE // RE41 HUD',
		shortTitle: 'BLAZE // RE41',
		description:
			'High-contrast tactical cyberpunk 3D interface combining hardware-accelerated CSS preserve-3d planes, Three.js geometry, and procedural Web Audio synthesis.',
		stack: 'Three.js · Preserve-3D · Web Audio Synth',
		liveUrl: 'https://blaze.idominiqe.com/',
		domainLabel: 'blaze.idominiqe.com',
		repoName: 'iDominiqe/blaze-re41-hud',
		repoUrl: 'https://github.com/iDominiqe/blaze-re41-hud',
		accent: '#f97316',
		gradient:
			'radial-gradient(circle at 78% 28%, rgba(249, 115, 22, 0.55), transparent 52%), radial-gradient(circle at 25% 75%, rgba(239, 68, 68, 0.38), transparent 58%), linear-gradient(135deg, #18181b 0%, #27150d 55%, #431407 100%)',
		highlights: [
			'Zero-sample procedural Web Audio synthesizer',
			'Gyroscopic preserve-3d spatial depth panels',
			'Low-latency frame pacing for tactical overlays',
		],
	},
	{
		id: 'portfolio-vision',
		badge: 'Spatial Showcase',
		tags: ['VisionOS Glass', 'Open-Meteo', 'i18n'],
		title: 'VisionOS Portfolio',
		shortTitle: 'VisionOS App',
		description:
			'Single-screen smoked-glass showcase dashboard featuring live Open-Meteo weather integration, services configurator, and 5-language support.',
		stack: 'Smoked Glass UI · Open-Meteo · 5 Languages',
		liveUrl: 'https://portfolio.idominiqe.com/',
		domainLabel: 'portfolio.idominiqe.com',
		repoName: 'iDominiqe/portfolio',
		repoUrl: 'https://github.com/iDominiqe/portfolio',
		accent: '#a78bfa',
		gradient:
			'radial-gradient(circle at 75% 25%, rgba(167, 139, 250, 0.48), transparent 54%), radial-gradient(circle at 18% 78%, rgba(56, 189, 248, 0.32), transparent 54%), linear-gradient(135deg, #1f1c2c 0%, #2c2a35 52%, #18181b 100%)',
		highlights: [
			'Dedicated standalone single-screen desktop shell',
			'Live Open-Meteo telemetry bar in footer',
			'5-language localization & services estimator',
		],
	},
	{
		id: 'cyber-of-x',
		badge: 'Metaverse Portal',
		tags: ['WebGL', 'Magnetic UI', 'Overdrive FX'],
		title: 'CYBER OF X Portal',
		shortTitle: 'CYBER OF X',
		description:
			'Interactive neon spatial metaverse portal engineered with magnetic cursor physics, custom post-processing overdrive shaders, and responsive sound cues.',
		stack: 'WebGL · Magnetic Cursor · Overdrive FX',
		liveUrl: 'https://cyber.idominiqe.com/',
		domainLabel: 'cyber.idominiqe.com',
		repoName: 'iDominiqe/cyber-of-x-metaverse',
		repoUrl: 'https://github.com/iDominiqe/cyber-of-x-metaverse',
		accent: '#22d3ee',
		gradient:
			'radial-gradient(circle at 72% 24%, rgba(34, 211, 238, 0.52), transparent 50%), radial-gradient(circle at 22% 82%, rgba(217, 70, 239, 0.42), transparent 55%), linear-gradient(135deg, #090d16 0%, #161032 54%, #0f172a 100%)',
		highlights: [
			'Spring-damped magnetic cursor & interactive hotspots',
			'Toggleable Overdrive GPU shader pipeline',
			'Static edge delivery via Cloudflare Anycast',
		],
	},
	{
		id: 'smartcity-v2',
		badge: 'GLSL Energy Grid',
		tags: ['Three.js', 'GLSL', 'Web Worker'],
		title: 'NEO Smart-City v2',
		shortTitle: 'Smart-City v2',
		description:
			'Lightweight GLSL topographic smart-energy city simulation offloading pathfinding and telemetry math to background Web Workers and WASM.',
		stack: 'Three.js · GLSL · WebAssembly · Web Worker',
		liveUrl: 'https://smartcity-v2.idominiqe.com/',
		domainLabel: 'smartcity-v2.idominiqe.com',
		repoName: 'iDominiqe/smartcity-v2',
		repoUrl: 'https://github.com/iDominiqe/smartcity-v2',
		accent: '#34d399',
		gradient:
			'radial-gradient(circle at 76% 24%, rgba(52, 211, 153, 0.5), transparent 54%), radial-gradient(circle at 20% 78%, rgba(59, 130, 246, 0.34), transparent 56%), linear-gradient(135deg, #052e16 0%, #0f172a 55%, #111827 100%)',
		highlights: [
			'Runs smoothly on integrated GPUs and low-PC devices',
			'Custom GLSL contour & energy pulse shaders',
			'Background Web Worker telemetry processing',
		],
	},
	{
		id: 'smartcity-v1',
		badge: 'Origin Simulation',
		tags: ['Three.js', 'Scroll FX', 'ROI Engine'],
		title: 'NEO Smart-City v1',
		shortTitle: 'Smart-City v1',
		description:
			'Original scroll-choreographed smart city visualization paired with a real-time infrastructure ROI estimator and modular urban overlays.',
		stack: 'Three.js · Scroll Choreography · ROI Engine',
		liveUrl: 'https://smartcity.idominiqe.com/',
		domainLabel: 'smartcity.idominiqe.com',
		repoName: 'iDominiqe/smartcity',
		repoUrl: 'https://github.com/iDominiqe/smartcity',
		accent: '#fbbf24',
		gradient:
			'radial-gradient(circle at 76% 26%, rgba(251, 191, 36, 0.45), transparent 52%), radial-gradient(circle at 22% 80%, rgba(14, 165, 233, 0.36), transparent 54%), linear-gradient(135deg, #1e293b 0%, #27272a 55%, #0f172a 100%)',
		highlights: [
			'Deterministic scroll-bound camera waypoints',
			'Interactive solar & smart-grid ROI calculator',
			'Clean vanilla ES module Three.js architecture',
		],
	},
	{
		id: 'v2-archive',
		badge: 'Bento Archive',
		tags: ['Liquid Glass', 'Canvas 3D', 'Themes'],
		title: 'Portfolio v-2 Archive',
		shortTitle: 'v-2 Archive',
		description:
			'Legacy Liquid Glass Bento edition preserved on its own subdomain with procedural 3D ambient canvas backgrounds and flat-mode toggles.',
		stack: 'Liquid Glass Bento · Canvas 3D Animations',
		liveUrl: 'https://v-2.idominiqe.com/',
		domainLabel: 'v-2.idominiqe.com',
		repoName: 'iDominiqe/v-2',
		repoUrl: 'https://github.com/iDominiqe/v-2',
		accent: '#f472b6',
		gradient:
			'radial-gradient(circle at 74% 26%, rgba(244, 114, 182, 0.46), transparent 54%), radial-gradient(circle at 20% 76%, rgba(129, 140, 248, 0.38), transparent 54%), linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #18181b 100%)',
		highlights: [
			'Multi-scene procedural Canvas 3D backgrounds',
			'Preserved Bento layout with blog & routing',
			'Hosted independently at v-2.idominiqe.com',
		],
	},
	{
		id: 'idomi-starlight',
		badge: 'Astro Core Hub',
		tags: ['Astro 7', 'Starlight', 'Pagefind'],
		title: 'iDominiqe Hub (Starlight)',
		shortTitle: 'idomi Starlight',
		description:
			'Central documentation, engineering blog, and VisionOS spatial dashboard built on Astro Starlight with instant static Pagefind indexing.',
		stack: 'Astro 7 · Starlight · Pagefind · Cloudflare',
		liveUrl: 'https://idominiqe.com/',
		domainLabel: 'idominiqe.com',
		repoName: 'iDominiqe/idomi',
		repoUrl: 'https://github.com/iDominiqe/idomi',
		accent: '#e2e8f0',
		gradient:
			'radial-gradient(circle at 75% 24%, rgba(226, 232, 240, 0.34), transparent 52%), radial-gradient(circle at 22% 80%, rgba(148, 163, 184, 0.28), transparent 54%), linear-gradient(135deg, #18181b 0%, #27272a 54%, #3f3f46 100%)',
		highlights: [
			'Custom VisionOS smoked-glass Starlight theme',
			'Interactive Theme Studio with 5 visual presets',
			'Zero-server Pagefind full-text documentation search',
		],
	},
];

export const BLOG_POSTS: BlogPostItem[] = [
	{
		slug: 'dns-ns-domains',
		href: '/blog/dns-ns-domains/',
		category: 'DNS · Domains',
		title: 'DNS, NS Records & Subdomain Routing',
		excerpt: 'How A, CNAME, NS, DNSSEC, and wildcard routing power multi-repo subdomains cleanly.',
		readTime: '6 min read',
		updated: 'Cloudflare · GitHub',
		accent: '#60a5fa',
	},
	{
		slug: 'cybersecurity-defense',
		href: '/blog/cybersecurity-defense/',
		category: 'Cybersecurity',
		title: 'Web Cybersecurity & CSP Defense',
		excerpt: 'Hardening static sites and edge APIs with CSP, HSTS, SRI hashes, and WAF rules.',
		readTime: '7 min read',
		updated: 'CSP · Zero Trust',
		accent: '#f97316',
	},
	{
		slug: 'privacy-data-protection',
		href: '/blog/privacy-data-protection/',
		category: 'Privacy Vault',
		title: 'Privacy & Personal Data Protection',
		excerpt: 'Local-first storage, zero third-party ad trackers, metadata stripping, and key hygiene.',
		readTime: '5 min read',
		updated: 'Zero Telemetry',
		accent: '#34d399',
	},
	{
		slug: 'cloudflare-edge-architecture',
		href: '/blog/cloudflare-edge-architecture/',
		category: 'Edge Stack',
		title: 'Cloudflare Edge & Static Delivery',
		excerpt: 'Anycast TLS termination, cache invalidation, and clean repository isolation.',
		readTime: '5 min read',
		updated: 'Anycast · TLS 1.3',
		accent: '#a78bfa',
	},
];

export const THEMES: ThemePreset[] = [
	{
		id: 'loft',
		mode: 'dark',
		name: 'Vision Loft',
		badge: 'Default',
		description: 'Warm daylight studio backdrop with frosted smoked-glass depth inspired by VisionOS.',
		swatch: 'linear-gradient(135deg, #d7cec2 0%, #6f6a64 55%, #3d3b38 100%)',
	},
	{
		id: 'obsidian',
		mode: 'dark',
		name: 'Obsidian Glass',
		badge: 'Dark Studio',
		description: 'Deep graphite dark room with subtle cool rim highlights and crisp white typography.',
		swatch: 'linear-gradient(135deg, #09090b 0%, #1e293b 55%, #334155 100%)',
	},
	{
		id: 'aurora',
		mode: 'dark',
		name: 'Aurora Prism',
		badge: 'Ambient',
		description: 'Soft Northern Lights cobalt-violet ambient canvas behind translucent spatial panes.',
		swatch: 'linear-gradient(135deg, #0f172a 0%, #312e81 52%, #0d9488 100%)',
	},
	{
		id: 'flat-dark',
		mode: 'dark',
		name: 'Flat Dark',
		badge: 'Low GPU',
		description: 'Zero blur overhead matte charcoal interface tuned for maximum focus and battery life.',
		swatch: 'linear-gradient(135deg, #111317 0%, #1a1d24 100%)',
	},
	{
		id: 'flat-light',
		mode: 'light',
		name: 'Flat Light',
		badge: 'High Contrast',
		description: 'Crisp matte paper-white theme with clean ink borders and native Starlight light readability.',
		swatch: 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)',
	},
];

export const SOCIALS: SocialItem[] = [
	{ label: 'GitHub', handle: '@iDominiqe', href: 'https://github.com/iDominiqe', kind: 'github' },
	{ label: 'Discord', handle: 'Community', href: 'https://discord.gg/f5wGW62Jsy', kind: 'discord' },
	{ label: 'Telegram', handle: '@idominiqe', href: 'https://t.me/idominiqe', kind: 'telegram' },
	{ label: 'YouTube', handle: '@idominiqe', href: 'https://www.youtube.com/@idominiqe', kind: 'youtube' },
	{ label: 'Instagram', handle: '@idominiqe', href: 'https://www.instagram.com/idominiqe/', kind: 'instagram' },
	{ label: 'Facebook', handle: 'idominiqe', href: 'https://www.facebook.com/idominiqe/', kind: 'facebook' },
];
