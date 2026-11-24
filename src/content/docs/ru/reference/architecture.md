---
title: Архитектура и деплой
description: Переопределение компонентов Starlight, статическая индексация Pagefind, локальная сборка на Node.js 22 и деплой на GitHub Pages + Cloudflare Edge.
sidebar:
  order: 1
---

## Слои VisionOS + Starlight

Вместо замены маршрутизации Starlight, пайплайна Markdown или поиска Pagefind, проект **`iDominiqe/idomi`** аккуратно переопределяет три слота макета в `astro.config.mjs`:

- **`PageFrame` → `src/components/VisionPageFrame.astro`**: Оборачивает Starlight в размытый фон комнаты лофт, плавающую адресную строку, вертикальный стеклянный док, окно `.vsl-window` и выдвижную Студию Тем.
- **`Header` → `src/components/VisionHeader.astro`**: Встраивает нативный поиск `<Search />` рядом с вкладками навигации (`Главная`, `Проекты`, `Блог`, `Гайды`, `Темы`), переключателем языков `EN | RO | RU`, поповером телеметрии и каналами разработчика.
- **`customCss` → `src/styles/vision-starlight.css`**: Объединяет переменные VisionOS (`Vision Loft`, `Obsidian`, `Aurora`) и плоские режимы (`Flat Dark`, `Flat Light`) с системой `--sl-color-*` в Starlight.

## Стек сборки и деплоя

- **Фреймворк:** Astro `^7.3.6` + `@astrojs/starlight` `^0.43.1`
- **Поисковый индекс:** Статический индекс Pagefind, собираемый локально при `npm run build`
- **Сборка и публикация:** Локальная сборка на Node.js 22 → публикация `dist/` в ветку `gh-pages` репозитория `iDominiqe/idomi`
- **Edge и TLS:** Cloudflare Anycast прокси с Full SSL для `idominiqe.com` и изолированных поддоменов
