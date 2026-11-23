---
title: Getting Started
description: How the VisionOS Spatial Glass shell integrates natively on top of Astro Starlight in iDominiqe/idomi.
sidebar:
  order: 1
---

Welcome to **`iDominiqe` (`idominiqe.com`)** — an **Astro + Starlight** documentation, engineering blog, and project ecosystem styled inside a spatial **VisionOS smoked-glass** window shell.

## What Changed in the Redesign

1. **Detached Spatial Browser Bar**: Floating top pill showing live route status (`idominiqe.com/...`), Back/Forward controls, quick URL navigation, animation replay (`↻`), Share button, and Theme Studio launcher.
2. **Vertical Glass Dock**: Sticky left control rail switching seamlessly between **Home (`/`)**, **Projects (`/projects/ecosystem/`)**, **Engineering Blog (`/blog/`)**, **Architecture (`/reference/architecture/`)**, and the **Theme Studio Drawer**.
3. **Containment Architecture**: Every Starlight page (including the left navigation sidebar, Markdown/MDX docs, code blocks, Pagefind `Ctrl+K` modal search, and right-side table of contents) renders cleanly inside the floating rounded glass window.
4. **Standalone Subdomains Stay Isolated**: [`portfolio.idominiqe.com`](https://portfolio.idominiqe.com/) (`iDominiqe/portfolio`) and [`v-2.idominiqe.com`](https://v-2.idominiqe.com/) (`iDominiqe/v-2`) continue running independently on their own branches and DNS records.

## Adding Content or Themes

- **New Blog Post or Guide**: Create a `.md` or `.mdx` file under `src/content/docs/blog/` or `src/content/docs/guides/`.
- **Edit Flagship Cards or Themes**: Update `src/data/ecosystem.ts` and customize tokens in `src/styles/vision-starlight.css`.
- **Switch Preset Live**: Open [Website Themes & VisionOS Presets](/guides/themes/) or press the `+` / Gear button at any time.
