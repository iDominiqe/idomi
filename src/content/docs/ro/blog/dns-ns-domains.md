---
title: DNS, Înregistrări NS & Rutare Subdomenii
description: Cum funcționează nameserverele autoritative, CNAME flattening, DNSSEC și fișierele CNAME per repozitoriu pe idominiqe.com.
sidebar:
  order: 1
---

Arhitectura DNS determină cât de rapid și sigur ajung vizitatorii la serviciile statice și aplicațiile WebGL, menținând fiecare repozitoriu complet izolat.

## Înregistrări DNS Principale în Producție

| Înregistrare | Exemplu Țintă | Rol |
|---|---|---|
| **NS** | Nameservere Cloudflare | Delegă controlul autoritativ pentru zona domeniului principal |
| **A / AAAA** | IP-uri Anycast GitHub Pages | Mapează domeniul apex `idominiqe.com` cu CNAME flattening |
| **CNAME** | `idominiqe.github.io` | Rutează independent `portfolio`, `smartcity-v3`, `blaze`, `v-2` |
| **TXT** | Verificare & SPF / DMARC | Validare domeniu și politici anti-spoofing |
| **CAA** | Autorități de Certificare | Restricționează emiterea certificatelor SSL/TLS |

## Izolarea Subdomeniilor

Fiecare subdomeniu din ecosistemul **iDominiqe** indică spre propriul repozitoriu:

1. `idominiqe.com` → `iDominiqe/idomi` (Hub-ul principal Astro Starlight)
2. `portfolio.idominiqe.com` → `iDominiqe/portfolio` (Portofoliul spațial VisionOS)
3. `smartcity-v3.idominiqe.com` → `iDominiqe/smartcity-v3` (Centru de comandă 3D PBR)
4. `v-2.idominiqe.com` → `iDominiqe/v-2` (Arhiva Liquid Glass Bento)
