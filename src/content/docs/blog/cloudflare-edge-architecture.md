---
title: Cloudflare Edge & Static Delivery
description: How Anycast TLS 1.3, Full SSL proxying, Brotli compression, and targeted cache purges accelerate static Astro builds.
sidebar:
  order: 4
---

Static site generators like **Astro Starlight** shine when combined with an Anycast edge proxy.

## Request Path Overview

```
Browser (HTTP/3 QUIC)
   │
   ▼  Anycast Edge (Cloudflare TLS 1.3 + Brotli)
   ├─ Cache HIT  ─► Served directly from nearest POP (<25ms TTFB)
   └─ Cache MISS ─► Origin Pull via GitHub Pages (iDominiqe/idomi gh-pages)
```

## Key Production Practices

- **Orange-Cloud Proxy + Full SSL**: Terminates TLS 1.3 at the nearest edge node while keeping end-to-end encryption intact between Cloudflare and GitHub Pages.
- **Immutable Hashed Assets**: Astro outputs content-hashed bundles inside `_astro/`, allowing aggressive edge caching without stale styling after deployments.
- **Instant Zone Cache Purge**: Following every `gh-pages` deployment commit, calling Cloudflare's zone purge endpoint ensures visitors immediately receive fresh HTML routes without stale CSS/JS skew.
