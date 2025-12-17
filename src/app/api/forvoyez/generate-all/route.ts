import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import type { Payload } from 'payload'
import { getPayload } from 'payload'
import { generateAltText } from '@/lib/forvoyez/generate-alt-text'
import config from '@/payload.config'

async function generateAltTextForMedia(
	payload: Payload,
	mediaId: string | number,
	origin: string
): Promise<{ success: boolean; alt?: string; error?: string }> {
	try {
		const media = await payload.findByID({
			collection: 'media',
			id: mediaId,
		})

		if (!media || !media.url) {
			return { success: false, error: 'Media not found or no URL' }
		}

		// Get image URL
		let imageUrl = media.url
		if (imageUrl.startsWith('/')) {
			imageUrl = `${origin}${imageUrl}`
		}

		// Generate alt text using ForVoyez
		const altText = await generateAltText(imageUrl, media.filename || 'image.jpg')

		if (!altText) {
			return { success: false, error: 'Failed to generate alt text' }
		}

		// Update the media document
		await payload.update({
			collection: 'media',
			id: mediaId,
			data: {
				alt: altText,
			},
		})

		return { success: true, alt: altText }
	} catch (error) {
		console.error(`Error generating alt text for media ${mediaId}:`, error)
		return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
	}
}

export async function POST(req: NextRequest) {
	try {
		const payload = await getPayload({ config })

		// Get all media without alt text
		const mediaWithoutAlt = await payload.find({
			collection: 'media',
			where: {
				or: [{ alt: { equals: null } }, { alt: { equals: '' } }],
			},
			limit: 1000,
		})

		const totalCount = mediaWithoutAlt.docs.length

		if (totalCount === 0) {
			return NextResponse.json({
				success: true,
				message: 'No media without alt text found',
				total: 0,
			})
		}

		const origin = req.nextUrl.origin

		// Launch generation in background - don't block the response
		setImmediate(async () => {
			console.log(`🔄 Background: Starting bulk generation for ${totalCount} images...`)

			let succeeded = 0
			let failed = 0

			// Process images sequentially to avoid rate limiting
			for (const media of mediaWithoutAlt.docs) {
				try {
					const result = await generateAltTextForMedia(payload, media.id, origin)

					if (result.success) {
						succeeded++
						console.log(`✅ [${succeeded + failed}/${totalCount}] Generated for ${media.filename}`)
					} else {
						failed++
						console.error(`❌ [${succeeded + failed}/${totalCount}] Failed for ${media.filename}: ${result.error}`)
					}

					// Add a small delay between requests to avoid overwhelming ForVoyez API
					await new Promise(resolve => setTimeout(resolve, 500))
				} catch (error) {
					failed++
					console.error(`❌ [${succeeded + failed}/${totalCount}] Error for ${media.filename}:`, error)
				}
			}

			console.log(`✅ Bulk generation complete: ${succeeded} succeeded, ${failed} failed out of ${totalCount}`)
		})

		// Return immediately
		return NextResponse.json({
			success: true,
			message: `Alt text generation started in background for ${totalCount} images`,
			total: totalCount,
		})
	} catch (error) {
		console.error('Error in bulk alt text generation:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
