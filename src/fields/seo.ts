import type { Field } from 'payload'

/**
 * SEO field for blog posts
 * Simplified: only metaTitle and metaDescription
 * Open Graph image comes from post's featuredImage
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
			admin: {
				description: 'Titre optimisé pour les moteurs de recherche (50-60 caractères recommandés)',
				placeholder: 'Ex: Guide complet activités manuelles enfants | Nounou Sciez',
			},
		},
		{
			name: 'metaDescription',
			type: 'textarea',
			label: 'Méta Description',
			admin: {
				description: 'Description courte pour les moteurs de recherche (150-160 caractères recommandés)',
				placeholder:
					"Ex: Découvrez nos meilleures idées d'activités manuelles pour éveiller la créativité de vos enfants...",
			},
		},
	],
}
