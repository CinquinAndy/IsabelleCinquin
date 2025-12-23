import type { GlobalConfig } from 'payload'
import { seo } from '../fields/seo'
import { revalidateGlobalAfterChange } from '../hooks/revalidation'

export const Seo: GlobalConfig = {
	slug: 'seo',
	label: 'SEO & Méta',
	access: {
		read: () => true,
	},
	hooks: {
		afterChange: [revalidateGlobalAfterChange],
	},
	fields: [
		{
			type: 'tabs',
			tabs: [
				{
					label: 'Blog (Principal)',
					fields: [
						{
							name: 'blog',
							type: 'group',
							label: 'Page Blog',
							fields: [seo],
						},
					],
				},
				{
					label: 'Contact',
					fields: [
						{
							name: 'contact',
							type: 'group',
							label: 'Page Contact',
							fields: [seo],
						},
					],
				},
			],
		},
	],
}
