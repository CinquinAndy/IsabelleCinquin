import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
	slug: 'categories',
	admin: {
		useAsTitle: 'name',
		group: 'Blog',
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			label: 'Nom',
			required: true,
		},
		{
			name: 'slug',
			type: 'text',
			label: 'Slug',
			required: true,
			unique: true,
			admin: {
				description: 'URL-friendly identifier (ex: activites, conseils, actualites)',
			},
			hooks: {
				beforeValidate: [
					({ value, data }) => {
						// Auto-generate slug from name if not provided
						if (!value && data?.name) {
							return data.name
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
	],
}
