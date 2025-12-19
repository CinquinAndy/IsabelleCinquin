import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
	slug: 'tags',
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
			hooks: {
				beforeValidate: [
					({ value, data }) => {
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
