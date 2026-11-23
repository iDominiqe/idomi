---
title: Web Cybersecurity & CSP Defense
description: Practical hardening for modern web applications using Content-Security-Policy, HSTS, Subresource Integrity, and edge WAF filtering.
sidebar:
  order: 2
---

Even static Astro sites and WebGL canvases benefit enormously from defense-in-depth HTTP response headers and strict origin boundaries.

## Essential Security Headers

- **Strict-Transport-Security (HSTS)**: Forces HTTPS across the apex and subdomains, preventing SSL-stripping downgrades.
- **Content-Security-Policy (CSP)**: Restricts script, style, font, and frame origins to explicit allowlists so injected third-party scripts cannot execute.
- **X-Content-Type-Options: nosniff**: Prevents MIME-confusion script execution on uploaded or cached assets.
- **Referrer-Policy: strict-origin-when-cross-origin**: Protects internal path parameters from leaking to external links.

## Hardening Interactive Frontends

When building spatial dashboards, WebGL views, or local-first theme switches:

1. Prefer `textContent` and explicit DOM construction over raw `innerHTML` for untrusted input.
2. Validate custom background image URLs and handle storage quotas inside `try / catch` blocks.
3. Isolate experimental embeds using `sandbox="allow-scripts allow-same-origin"` when previewing child origins.

## Edge Mitigation Layer

Pairing static GitHub Pages origins with **Cloudflare WAF** adds automated bot mitigation, L7 DDoS absorption, and geo/ASN rate limiting before a single packet reaches origin compute.
