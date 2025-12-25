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

/**
 * SEO field for Landing page global
 * Uses LandingSeoGenerator which extracts content from Landing structure
 */
export const seoForLanding: Field = {
	name: 'seo',
	label: 'SEO',
	type: 'group',
	fields: [
		{
			name: 'generateSeo',
			type: 'ui',
			admin: {
				components: {
					Field: '/components/payload/LandingSeoGenerator#LandingSeoGenerator',
				},
			},
		},
		{
			name: 'metaTitle',
			type: 'text',
			label: 'Méta Titre',
			required: false,
			admin: {
				description: 'Titre affiché dans les résultats de recherche (max 60 caractères)',
				placeholder: 'Ex: Nounou Sciez | Isabelle Cinquin - Assistante Maternelle',
			},
		},
		{
			name: 'metaDescription',
			type: 'textarea',
			label: 'Méta Description',
			required: false,
			admin: {
				description: 'Description courte pour les moteurs de recherche (max 160 caractères)',
				placeholder: 'Ex: Assistante maternelle agréée à Sciez (74). Accueil chaleureux au bord du Lac Léman...',
			},
		},
		{
			name: 'ogImage',
			type: 'upload',
			relationTo: 'media',
			label: 'Image de partage (OG Image)',
			admin: {
				description: 'Image affichée lors du partage sur les réseaux sociaux (1200x630px recommandé)',
			},
		},
		{
			name: 'keywords',
			type: 'array',
			label: 'Mots-clés',
			admin: {
				description: 'Mots-clés SEO pour améliorer le référencement',
			},
			fields: [
				{
					name: 'keyword',
					type: 'text',
					label: 'Mot-clé',
				},
			],
		},
	],
}
