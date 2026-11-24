---
title: Confidențialitate & Protecția Datelor
description: Minimizarea amprentării digitale, eliminarea trackerelor terțe și păstrarea preferințelor local în browser.
sidebar:
  order: 3
---

Protecția reală a datelor personale începe prin **a nu colecta date inutile**.

## Arhitectură Statică Fără Telemetrie

- **Fără Trackere Publicitare**: Paginile de pe `idominiqe.com` nu încarcă scripturi publicitare sau cookie-uri de urmărire.
- **Preferințe Locale**: Tema selectată (`vslTheme`) și imaginea de fundal rămân exclusiv în `localStorage`-ul browserului dumneavoastră.
- **Căutare Locală Pagefind**: Indexul de căutare rulează local în browser, fără a trimite interogările către un server terț.

## Igienă Zilnică a Datelor

1. **Eliminarea Metadatelor EXIF**: Ștergeți coordonatele GPS și identificatorii dispozitivului din imagini înainte de publicare.
2. **Tokenuri cu Permisiuni Minime**: Separați cheile de deploy, DNS și bot în secrete criptate izolate.
