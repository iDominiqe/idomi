---
title: Cloudflare Edge & Livrare Statică
description: Cum accelerează Anycast TLS 1.3, compresia Brotli și Cloudflare Workers aplicațiile Astro Starlight.
sidebar:
  order: 4
---

Site-urile statice generate cu **Astro Starlight** oferă latență minimă atunci când sunt livrate prin rețeaua **Cloudflare Anycast**.

## Fluxul Cererilor

```
Browser (HTTP/3 QUIC)
   │
   ▼  Anycast Edge (Cloudflare TLS 1.3 + Brotli)
   ├─ Cache HIT  ─► Livrat direct din cel mai apropiat POP (<25ms TTFB)
   ├─ /api/chat* ─► Cloudflare Worker (idomi-tg-chat + Workers KV)
   └─ Cache MISS ─► GitHub Pages (iDominiqe/idomi gh-pages)
```

## Practici în Producție

- **Proxy Portocaliu + Full SSL**: Terminare TLS 1.3 la marginea rețelei cu criptare completă până la origine.
- **Resurse Hash-uite Imutabil**: Astro generează fișiere cu hash în `_astro/`, permițând cache agresiv fără conflicte după deploy.
- **Invalidare Instantanee**: După fiecare publicare pe `gh-pages`, cache-ul zonei este curățat automat.
