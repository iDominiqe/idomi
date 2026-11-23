---
title: Architecture & Deployment
description: Technical stack, local Node.js 22 build pipeline, and GitHub Pages + Cloudflare DNS/SSL routing powering idominiqe.com.
---

## Build & Deployment Stack

- **Framework:** Astro `^7.3.6` with `@astrojs/starlight` `^0.43.1`
- **Search:** Built-in zero-server **Pagefind** static full-text index
- **Build & Deploy:** Local Node.js 22 build (`npm run build` → `dist/`) deployed to the `gh-pages` branch on GitHub Pages
- **Edge & TLS:** Cloudflare Full SSL with Anycast DNS over `idominiqe.com` apex and proxied CNAME subdomains

## Adding Custom Layouts Later

Because Astro islands support native HTML/CSS, Tailwind CSS, Preact/React/Vue/Svelte components, or WebGL canvases (`Three.js`), you can progressively layer a bespoke Spatial UI template directly on top of Starlight's routing and content collections without touching subdomain projects.
