import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import type { PageContext } from '@/lib/gemini/generate-seo'
import { generateSeoContent } from '@/lib/gemini/generate-seo'
import config from '@/payload.config'

export async function POST(req: NextRequest) {
	try {
		const { documentId, collectionSlug, globalSlug } = await req.json()

		const payload = await getPayload({ config })

		// Determine the page type and get context
		let pageContext: PageContext = { pageType: 'homepage' }
		let updateTarget: { collection?: string; global?: string; id?: string | number } = {}

		if (globalSlug) {
			// Global page
			const globalData = await payload.findGlobal({ slug: globalSlug })
			updateTarget = { global: globalSlug }

			switch (globalSlug) {
				case 'homepage':
					pageContext = {
						pageType: 'homepage',
						title: globalData.hero_title || '',
						description: globalData.hero_subtitle || '',
					}
					break
				case 'faq-page':
					pageContext = {
						pageType: 'faq',
						title: 'Questions fréquentes',
					}
					break
				case 'contact-page':
					pageContext = {
						pageType: 'contact',
						title: 'Contact',
					}
					break
				case 'mentions-legales-page':
					pageContext = {
						pageType: 'mentions-legales',
						title: 'Mentions légales',
					}
					break
			}
		} else if (collectionSlug && documentId) {
			// Collection document
			await payload.findByID({ collection: collectionSlug, id: documentId })
			updateTarget = { collection: collectionSlug, id: documentId }

			// Need to map collection types here when we create them
			switch (
				collectionSlug
				// case 'activities':
				// 	pageContext = {
				// 		pageType: 'service',
				// 		title: doc.title || '',
				// 		description: doc.shortDescription || '',
				// 	}
				// 	break
			) {
			}
		}

		// Generate SEO content with Gemini
		const seoContent = await generateSeoContent(pageContext)

		if (!seoContent) {
			return NextResponse.json({ error: 'Failed to generate SEO content' }, { status: 500 })
		}

		// Update the document/global with generated SEO
		if (updateTarget.global) {
			const globalSlug = updateTarget.global as 'homepage' | 'faq-page' | 'contact-page' | 'mentions-legales-page'

			await payload.updateGlobal({
				slug: globalSlug,
				data: {
					seo_title: seoContent.title,
					seo_description: seoContent.description,
				},
			})
		} else if (updateTarget.collection && updateTarget.id) {
			const collectionSlug = updateTarget.collection as 'users' | 'media' // Add more collections as created
			await payload.update({
				collection: collectionSlug,
				id: updateTarget.id,
				data: {
					seo_title: seoContent.title,
					seo_description: seoContent.description,
				},
			})
		}

		return NextResponse.json({
			success: true,
			title: seoContent.title,
			description: seoContent.description,
		})
	} catch (error) {
		console.error('Error generating SEO:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
