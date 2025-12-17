import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidation'
import { generateAltText } from '@/lib/forvoyez/generate-alt-text'

export const Media: CollectionConfig = {
	slug: 'media',
	admin: {
		components: {
			beforeList: ['@/components/admin/BulkAltTextGenerator'],
		},
	},
	access: {
		read: () => true,
	},
	hooks: {
		afterChange: [
			// Hook pour générer automatiquement le texte alternatif
			async ({ doc, req, operation }) => {
				// Only generate alt text for new uploads without alt text
				if (operation === 'create' && (!doc.alt || doc.alt === '')) {
					// Launch generation in background - don't block the upload
					setImmediate(async () => {
						try {
							// Get the image URL
							let imageUrl = doc.url
							if (!imageUrl) return

							// Convert relative URL to absolute for fetch (server-side)
							if (imageUrl.startsWith('/')) {
								const protocol = req.protocol || 'http'
								const host = req.headers.get('host') || 'localhost:3000'
								imageUrl = `${protocol}://${host}${imageUrl}`
							}

							console.log(`🔄 Background: Generating alt text for ${doc.filename}...`)

							// Generate alt text
							const altText = await generateAltText(imageUrl, doc.filename || 'image')

							if (altText) {
								// Small delay to ensure document is fully committed
								await new Promise(resolve => setTimeout(resolve, 500))

								// Update the document with generated alt text
								await req.payload.update({
									collection: 'media',
									id: doc.id,
									data: {
										alt: altText,
									},
								})

								console.log(`✅ Auto-generated alt text for ${doc.filename}: "${altText}"`)
							}
						} catch (error) {
							console.error(`❌ Error auto-generating alt text for ${doc.filename}:`, error)
						}
					})
				}

				return doc
			},
			// Hook pour revalider les pages après changement de média
			revalidateAfterChange,
		],
		afterDelete: [revalidateAfterDelete],
	},
	fields: [
		{
			name: 'altGenerator',
			type: 'ui',
			admin: {
				components: {
					Field: '@/components/fields/AltTextGenerator',
				},
			},
		},
		{
			name: 'alt',
			type: 'text',
			required: false,
		},
	],
	upload: true,
}
