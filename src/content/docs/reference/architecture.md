---
title: Architecture & Deployment
description: Starlight component overrides, Pagefind static indexing, local Node.js 22 compilation, and GitHub Pages + Cloudflare Edge deployment.
sidebar:
  order: 1
---

## VisionOS + Starlight Layering

Instead of replacing Starlight's routing, Markdown pipeline, or Pagefind search, **`iDominiqe/idomi`** overrides two core layout slots cleanly in `astro.config.mjs`:

- **`PageFrame` → `src/components/VisionPageFrame.astro`**: Wraps Starlight inside the blurred studio loft backdrop, detached address bar, vertical glass dock, rounded `.vsl-window` viewport, and the slide-over Theme Studio drawer.
- **`Header` → `src/components/VisionHeader.astro`**: Embeds Starlight's native `<Search />` pill alongside category navigation tabs (`Home`, `Projects`, `Blog`, `Guides`, `Themes`), edge status popover, and developer social channels menu.
- **`customCss` → `src/styles/vision-starlight.css`**: Unifies VisionOS frosted variables (`Vision Loft`, `Obsidian`, `Aurora`) and zero-blur matte modes (`Flat Dark`, `Flat Light`) directly with Starlight's `--sl-color-*` theme system.

## Build & Deployment Stack

- **Framework:** Astro `^7.3.6` + `@astrojs/starlight` `^0.43.1`
- **Search Index:** Static Pagefind index built locally during `npm run build`
- **Build & Deploy:** Local Node.js 22 build → `dist/` pushed to the `gh-pages` branch on `iDominiqe/idomi`
- **Edge & TLS:** Cloudflare Anycast proxy with Full SSL over `idominiqe.com` and isolated subdomain CNAMEs
