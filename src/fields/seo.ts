import type { Field } from 'payload'

/**
 * SEO field for blog posts/collections
 * Uses GenerateSeoButton which expects title, excerpt, content fields
 */
export const seo: Field = {
	name: 'seo',
	label: 'SEO',
	type: 'group',
	fields: [
		{
			name: 'generateSeo',
			type: 'ui',
			admin: {
				components: {
					Field: '/components/payload/GenerateSeoButton#GenerateSeoButton',
				},
			},
		},
		{
			name: 'metaTitle',
			type: 'text',
			label: 'Méta Titre',
			required: false,
			admin: {
				description: 'Titre affiché dans les résultats de recherche (laisser vide pour utiliser le titre par défaut)',
			},
		},
		{
			name: 'metaDescription',
			type: 'textarea',
			label: 'Méta Description',
			required: false,
			admin: {
				description: 'Description courte pour les moteurs de recherche',
			},
		},
		{
			name: 'ogImage',
			type: 'upload',
			relationTo: 'media',
			label: 'Image de partage (OG Image)',
			admin: {
				description: 'Image affichée lors du partage sur les réseaux sociaux',
			},
		},
		{
			name: 'keywords',
			type: 'array',
			label: 'Mots-clés',
			fields: [
				{
					name: 'keyword',
					type: 'text',
				},
			],
		},
	],
}
