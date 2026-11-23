---
title: DNS, NS Records & Subdomain Routing
description: How authoritative nameservers, A/CNAME flattening, DNSSEC, and per-repository CNAME files isolate subdomains under idominiqe.com.
sidebar:
  order: 1
---

Domain architecture determines how visitors reach static and WebGL services reliably across global regions while isolating deployments per repository.

## Core Record Types in Production

| Record | Target Example | Purpose |
|---|---|---|
| **NS** | Cloudflare Authoritative NS | Delegates DNS resolution control for the apex domain zone |
| **A / AAAA** | GitHub Pages Anycast IPs | Maps apex `idominiqe.com` with Cloudflare CNAME flattening |
| **CNAME** | `idominiqe.github.io` | Routes `portfolio`, `smartcity-v3`, `blaze`, `v-2` independently |
| **TXT** | Verification & SPF / DMARC | Domain ownership challenges and anti-spoofing policies |
| **CAA** | Certificate Authorities | Restricts which CAs may issue SSL/TLS certificates for the zone |

## Subdomain Isolation Architecture

Every subdomain in the **iDominiqe** ecosystem points cleanly to its own dedicated repository:

1. `idominiqe.com` → `iDominiqe/idomi` (Astro Starlight core hub)
2. `portfolio.idominiqe.com` → `iDominiqe/portfolio` (VisionOS single-screen showcase)
3. `smartcity-v3.idominiqe.com` → `iDominiqe/smartcity-v3` (3D PBR command center)
4. `v-2.idominiqe.com` → `iDominiqe/v-2` (Liquid Glass Bento archive)

Because each repo owns its own `CNAME` file and `gh-pages` or `main` artifact, publishing an update to one project never invalidates or breaks sibling builds.

## DNSSEC & Propagation Checklist

- Enable **DNSSEC** at both registrar and DNS zone level to prevent cache poisoning.
- Keep TTL short (`Auto` / `60–300s`) during migrations, then rely on Anycast propagation.
- Always test live resolution using `nslookup -type=CNAME <host>` and `curl -I https://<host>/` after DNS updates.
