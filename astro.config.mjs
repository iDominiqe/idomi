// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://idominiqe.com',
	integrations: [
		starlight({
			title: 'iDominiqe',
			description: 'iDominiqe — VisionOS Spatial Hub, Engineering Blog & Live WebGL Ecosystem',
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'English',
					lang: 'en',
				},
				ro: {
					label: 'Română',
					lang: 'ro',
				},
				ru: {
					label: 'Русский',
					lang: 'ru',
				},
			},
			customCss: ['./src/styles/vision-starlight.css'],
			components: {
				PageFrame: './src/components/VisionPageFrame.astro',
				Header: './src/components/VisionHeader.astro',
				PageTitle: './src/components/VisionPageTitle.astro',
			},
			head: [
				{
					tag: 'link',
					attrs: {
						id: 'cat-favicon',
						rel: 'icon',
						type: 'image/svg+xml',
						href: '/favicon.svg',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'preconnect',
						href: 'https://fonts.googleapis.com',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'preconnect',
						href: 'https://fonts.gstatic.com',
						crossorigin: true,
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap',
					},
				},
				{
					tag: 'script',
					content:
						"(()=>{try{const t=localStorage.getItem('vslTheme')||'loft';const m=t==='flat-light'?'light':'dark';document.documentElement.dataset.vtheme=t;document.documentElement.dataset.theme=m;localStorage.setItem('starlight-theme',m);}catch(e){document.documentElement.dataset.vtheme='loft';document.documentElement.dataset.theme='dark';}})();",
				},
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/iDominiqe' },
				{ icon: 'discord', label: 'Discord', href: 'https://discord.gg/f5wGW62Jsy' },
				{ icon: 'telegram', label: 'Telegram', href: 'https://t.me/idominiqe' },
				{ icon: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@idominiqe' },
				{ icon: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/idominiqe/' },
				{ icon: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/idominiqe/' },
			],
			sidebar: [
				{
					label: 'About & Calculator',
					translations: { ro: 'Despre & Calculator', ru: 'Обо мне и Расчёт' },
					items: [
						{ label: 'About Me & Bio', translations: { ro: 'Despre Mine', ru: 'Обо мне' }, slug: 'about' },
						{ label: 'Project Calculator', translations: { ro: 'Calculator Proiect', ru: 'Калькулятор проекта' }, slug: 'calculator' },
						{ label: 'About Your System', translations: { ro: 'Despre Sistemul Tău', ru: 'О вашей системе' }, slug: 'system' },
					],
				},
				{
					label: 'Projects',
					translations: { ro: 'Proiecte', ru: 'Проекты' },
					items: [{ autogenerate: { directory: 'projects' } }],
				},
				{
					label: 'Engineering Blog',
					translations: { ro: 'Blog Tehnic', ru: 'Инженерный Блог' },
					items: [{ autogenerate: { directory: 'blog' } }],
				},
				{
					label: 'Guides & Themes',
					translations: { ro: 'Ghiduri & Teme', ru: 'Гайды и Темы' },
					items: [
						{ label: 'Getting Started', translations: { ro: 'Primii Pași', ru: 'Начало работы' }, slug: 'guides/getting-started' },
						{ label: 'Theme Studio & Presets', translations: { ro: 'Teme & Preseturi', ru: 'Студия Тем' }, slug: 'guides/themes' },
					],
				},
				{
					label: 'Reference',
					translations: { ro: 'Referință', ru: 'Справочник' },
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
		}),
	],
});
