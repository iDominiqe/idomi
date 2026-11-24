---
title: Cloudflare Edge и доставка статики
description: Как Anycast TLS 1.3, Full SSL, сжатие Brotli и точечный сброс кеша ускоряют статические сборки Astro.
sidebar:
  order: 4
---

Генераторы статических сайтов вроде **Astro Starlight** раскрываются на максимум в связке с Anycast edge-прокси.

## Схема прохождения запроса

```
Браузер (HTTP/3 QUIC)
   │
   ▼  Anycast Edge (Cloudflare TLS 1.3 + Brotli)
   ├─ Cache HIT  ─► Ответ напрямую с ближайшего POP (<25ms TTFB)
   └─ Cache MISS ─► Запрос к origin GitHub Pages (iDominiqe/idomi gh-pages)
```

## Ключевые практики в продакшене

- **Прокси Cloudflare + Full SSL**: Терминирует TLS 1.3 на ближайшем edge-узле, сохраняя сквозное шифрование до GitHub Pages.
- **Иммутабельные ассеты с хешами**: Astro складывает бандлы с хешами содержимого в `_astro/`, что позволяет агрессивно кешировать их без риска рассинхронизации стилей.
- **Мгновенный сброс кеша зоны**: После каждого пуша в ветку `gh-pages` вызов purge API Cloudflare сразу отдаёт посетителям свежий HTML.
