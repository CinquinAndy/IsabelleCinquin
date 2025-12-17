import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { generateAltText } from '@/lib/forvoyez/generate-alt-text'
import config from '@/payload.config'

export async function POST(req: NextRequest) {
	try {
		const { mediaId } = await req.json()

		if (!mediaId) {
			return NextResponse.json({ error: 'Media ID is required' }, { status: 400 })
		}

		const payload = await getPayload({ config })

		// Get the media document
		const media = await payload.findByID({
			collection: 'media',
			id: mediaId,
		})

		if (!media) {
			return NextResponse.json({ error: 'Media not found' }, { status: 404 })
		}

		// Get the image URL (Payload serves S3 images via /api/media/file/)
		let imageUrl = media.url

		if (!imageUrl) {
			return NextResponse.json({ error: 'Image URL not found' }, { status: 404 })
		}

		// Convert relative URL to absolute for fetch
		if (imageUrl.startsWith('/')) {
			const origin = req.nextUrl.origin
			imageUrl = `${origin}${imageUrl}`
		}

		// Launch generation in background - don't block the response
		setImmediate(async () => {
			try {
				console.log(`🔄 Background: Generating alt text for ${media.filename}...`)

				// Generate alt text using ForVoyez
				const altText = await generateAltText(imageUrl, media.filename || 'image.jpg')

				if (altText) {
					// Update the media document with the generated alt text
					await payload.update({
						collection: 'media',
						id: mediaId,
						data: {
							alt: altText,
						},
					})

					console.log(`✅ Auto-generated alt text for ${media.filename}: "${altText}"`)
				}
			} catch (error) {
				console.error(`❌ Error generating alt text for ${media.filename}:`, error)
			}
		})

		// Return immediately
		return NextResponse.json({
			success: true,
			message: 'Alt text generation started in background',
			filename: media.filename,
		})
	} catch (error) {
		console.error('Error generating alt text:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
