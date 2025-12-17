import type { Field } from 'payload'

export const seoFields: Field[] = [
	{
		type: 'collapsible',
		label: 'SEO',
		fields: [
			{
				name: 'seoGenerator',
				type: 'ui',
				admin: {
					components: {
						Field: '@/components/fields/SeoGenerator',
					},
				},
			},
			{
				name: 'seo_title',
				type: 'text',
				label: 'Titre SEO',
				admin: {
					description: 'Titre optimisé pour les moteurs de recherche (max 60 caractères)',
				},
				maxLength: 60,
			},
			{
				name: 'seo_description',
				type: 'textarea',
				label: 'Description SEO',
				admin: {
					description: 'Description optimisée pour les moteurs de recherche (max 155 caractères)',
				},
				maxLength: 155,
			},
		],
	},
]
