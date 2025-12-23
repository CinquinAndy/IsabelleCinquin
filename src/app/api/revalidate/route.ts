import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const { secret, collection, slug, global } = await request.json()

		if (secret !== process.env.REVALIDATE_SECRET) {
			return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
		}

		if (collection) {
			// Invalidate all variants of paths for this collection
			// @ts-expect-error
			revalidateTag(`collection-${collection}`)
			if (slug) {
				// @ts-expect-error
				revalidateTag(`collection-${collection}-${slug}`)
			}
			console.log(`Revalidated collection: ${collection}, slug: ${slug}`)
		}

		if (global) {
			// @ts-expect-error
			revalidateTag(`global-${global}`)
			console.log(`Revalidated global: ${global}`)
		}

		// Revalidate everything to be safe for this specific use case (small site)
		revalidatePath('/', 'layout')

		return NextResponse.json({ revalidated: true, now: Date.now() })
	} catch (err) {
		console.error('Revalidation Error:', err)
		return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
	}
}
