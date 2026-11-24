---
title: Arhitectură & Deploy
description: Suprapunerea componentelor Starlight, indexarea Pagefind, Cloudflare Workers + KV și livrarea pe GitHub Pages.
sidebar:
  order: 1
---

## Straturile VisionOS + Starlight

- **`PageFrame` → `src/components/VisionPageFrame.astro`**: Încadrează Starlight în fereastra VisionOS, bara de adresă, dock-ul vertical, sertarul de teme și scriptul adaptiv pentru favicon-ul animat cu pisică.
- **`Header` → `src/components/VisionHeader.astro`**: Integrează căutarea nativă `<Search />`, tab-urile de navigare și selectorul de limbă `EN | RO`.
- **`api/chat/*` → `worker/telegram-chat-worker.js`**: Cloudflare Worker cu `Workers KV` pentru chat bidirecțional în timp real cu Telegram.

## Stack de Build & Livrare

- **Framework:** Astro `^7.4` + `@astrojs/starlight` `^0.43.1`
- **Căutare:** Index static Pagefind generat la `npm run build`
- **Deploy:** Build local Node.js 22 → ramura `gh-pages` pe `iDominiqe/idomi` + proxy Cloudflare Anycast TLS 1.3
