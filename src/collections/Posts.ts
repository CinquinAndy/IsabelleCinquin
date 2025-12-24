import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidation'
import { seo } from '../fields/seo'

export const Posts: CollectionConfig = {
	slug: 'posts',
	admin: {
		useAsTitle: 'title',
		group: 'Blog',
		defaultColumns: ['title', 'status', 'isImportant', 'publishedAt'],
	},
	access: {
		read: ({ req }) => {
			// Published posts are public
			// Draft posts require authentication
			if (req.user) return true
			return {
				status: {
					equals: 'published',
				},
			}
		},
	},
	hooks: {
		afterChange: [revalidateAfterChange],
		afterDelete: [revalidateAfterDelete],
	},
	fields: [
		{
			type: 'tabs',
			tabs: [
				{
					label: 'Contenu',
					fields: [
						{
							name: 'title',
							type: 'text',
							label: 'Titre',
							required: true,
						},
						{
							name: 'slug',
							type: 'text',
							label: 'Slug',
							required: true,
							unique: true,
							admin: {
								description: "URL de l'article (auto-généré depuis le titre)",
							},
							hooks: {
								beforeValidate: [
									({ value, data }) => {
										if (!value && data?.title) {
											return data.title
												.toLowerCase()
												.normalize('NFD')
												.replace(/[\u0300-\u036f]/g, '')
												.replace(/[^a-z0-9]+/g, '-')
												.replace(/(^-|-$)/g, '')
										}
										return value
									},
								],
							},
						},
						{
							name: 'excerpt',
							type: 'textarea',
							label: 'Extrait',
							required: true,
							admin: {
								description: 'Court résumé affiché dans les listes',
							},
						},
						{
							name: 'content',
							type: 'richText',
							label: 'Contenu',
							required: true,
						},
						{
							name: 'featuredImage',
							type: 'upload',
							relationTo: 'media',
							label: 'Image mise en avant',
							required: true,
						},
						{
							type: 'row',
							fields: [
								{
									name: 'categories',
									type: 'relationship',
									relationTo: 'categories',
									hasMany: true,
									label: 'Catégories',
									admin: {
										width: '50%',
									},
								},
							],
						},
						{
							name: 'isImportant',
							type: 'checkbox',
							label: 'Article important',
							defaultValue: false,
							admin: {
								description: 'Afficher dans la section Activités de la landing page',
								position: 'sidebar',
							},
						},
						{
							name: 'status',
							type: 'select',
							label: 'Statut',
							defaultValue: 'draft',
							options: [
								{ label: 'Brouillon', value: 'draft' },
								{ label: 'Publié', value: 'published' },
							],
							admin: {
								position: 'sidebar',
							},
						},
						{
							name: 'publishedAt',
							type: 'date',
							label: 'Date de publication',
							admin: {
								position: 'sidebar',
								date: {
									pickerAppearance: 'dayAndTime',
								},
							},
						},
					],
				},
				{
					label: 'SEO',
					fields: [seo],
				},
			],
		},
	],
}
