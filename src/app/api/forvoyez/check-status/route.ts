import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(req: NextRequest) {
	try {
		// Get query params
		const searchParams = req.nextUrl.searchParams
		const mediaId = searchParams.get('mediaId')

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

		const hasAlt = !!(media.alt && media.alt !== '')

		return NextResponse.json({
			hasAlt,
			alt: media.alt,
			filename: media.filename,
		})
	} catch (error) {
		console.error('Error checking alt text status:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
