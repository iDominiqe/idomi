// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://idominiqe.com',
	integrations: [
		starlight({
			title: 'iDominiqe',
			description: 'iDominiqe — Astro Starlight Hub, Projects & Documentation',
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
					label: 'Guides',
					items: [
						{ label: 'Getting Started', slug: 'guides/getting-started' },
					],
				},
				{
					label: 'Projects',
					items: [{ autogenerate: { directory: 'projects' } }],
				},
				{
					label: 'Reference',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
		}),
	],
});
