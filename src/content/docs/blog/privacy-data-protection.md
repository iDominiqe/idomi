---
title: Privacy & Personal Data Protection
description: Minimizing browser fingerprinting, eliminating third-party tracking beacons, stripping metadata, and securing personal workflows.
sidebar:
  order: 3
---

Strong privacy engineering starts with **not collecting or transmitting personal data in the first place**.

## Zero-Telemetry Static Design

- **No Advertising Trackers**: Pages on `idominiqe.com` execute locally without ad pixels, cross-site cookies, or behavioral fingerprinting scripts.
- **Local-First Preferences**: Selected themes (`vslTheme`) and optional custom studio wallpaper backdrops stay strictly in the visitor's browser `localStorage` and are never uploaded to a backend.
- **Local Search Indexing**: Full-text search runs via static **Pagefind** chunks in the browser — search queries stay client-side rather than being logged by an external SaaS search server.

## Everyday Data Protection Hygiene

1. **Strip EXIF Metadata**: Remove GPS coordinates and device identifiers from screenshots and photos before publishing web assets.
2. **Scoped API Tokens**: Keep CI/CD, Cloudflare, and GitHub tokens scoped to least-privilege permissions (`repo` vs `workflow` vs read-only zones) and never commit `.env` or secret files into git history.
3. **Compartmentalized Profiles**: Separate development, personal banking, and public creative accounts into isolated browser containers and hardware MFA keys.
