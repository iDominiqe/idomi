---
title: Securitate Web & Apărare CSP
description: Întărirea aplicațiilor web moderne prin Content-Security-Policy, HSTS, Subresource Integrity și filtrare WAF.
sidebar:
  order: 2
---

Chiar și site-urile statice Astro sau scenele 3D WebGL beneficiază semnificativ de headere HTTP de securitate și limite stricte de origine.

## Headere Esențiale de Securitate

- **Strict-Transport-Security (HSTS)**: Forțează conexiunea HTTPS pe domeniul principal și subdomenii.
- **Content-Security-Policy (CSP)**: Limitează originile permise pentru scripturi, fonturi, stiluri și iframe-uri.
- **X-Content-Type-Options: nosniff**: Previne executarea fișierelor cu tip MIME falsificat.
- **Referrer-Policy: strict-origin-when-cross-origin**: Protejează căile interne la navigarea către linkuri externe.

## Practici pentru Frontend & API Edge

1. Construiți elementele dinamice prin `textContent` în locul `innerHTML` pentru orice text extern.
2. Păstrați cheile de API și tokenurile exclusiv în **Secrets** pe Cloudflare Worker, niciodată în codul static din GitHub.
3. Aplicați limitare de rată pe IP și validare strictă a dimensiunii payload-ului pentru endpoint-urile publice.
