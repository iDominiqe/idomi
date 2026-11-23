---
title: Getting Started
description: How the iDominiqe Astro Starlight core repository is structured and deployed on idominiqe.com.
---

Welcome to the new **`iDominiqe`** core website running on **Astro + Starlight**.

## Repository Separation

Your web ecosystem is split into clean, independent repositories:

- **`iDominiqe/idomi`** — Root hub on [`idominiqe.com`](https://idominiqe.com/) built with Astro & Starlight, ready for custom templates, components, and documentation.
- **`iDominiqe/portfolio`** — Standalone VisionOS single-screen showcase hosted separately on [`portfolio.idominiqe.com`](https://portfolio.idominiqe.com/).
- **`iDominiqe/v-2`** — Legacy Liquid Glass Bento archive preserved on [`v-2.idominiqe.com`](https://v-2.idominiqe.com/).

## Customizing the Theme & Template

1. Add custom CSS stylesheets in `src/styles/custom.css` and register them under `customCss` in `astro.config.mjs`.
2. Override any built-in Starlight layout component (`Hero`, `Header`, `Sidebar`, `PageFrame`) via the `components` map in `astro.config.mjs`.
3. Add Markdown or MDX pages under `src/content/docs/` — changes pushed to `main` automatically rebuild and publish to `idominiqe.com` via GitHub Actions.
