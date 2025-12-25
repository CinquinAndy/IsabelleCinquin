import type { Metadata } from 'next'
import type { Media } from '@/payload-types'
import { formatMediaUrl } from './utils'

export type SeoData = {
	metaTitle?: string | null
	metaDescription?: string | null
	ogImage?: string | Media | null
	keywords?:
		| {
				keyword?: string | null
				id?: string | null
		  }[]
		| null
}

export function constructMetadata({
	seo,
	fallbackTitle = 'Nounou Sciez - Isabelle Cinquin',
	fallbackDescription = 'Assistante Maternelle au bord du Lac Léman à Sciez (74140). Accueil bienveillant et activités variées pour vos enfants.',
	path = '',
}: {
	seo?: SeoData | null
	fallbackTitle?: string
	fallbackDescription?: string
	path?: string
}): Metadata {
	const title = seo?.metaTitle || fallbackTitle
	const description = seo?.metaDescription || fallbackDescription

	const image = seo?.ogImage ? (typeof seo.ogImage === 'string' ? seo.ogImage : seo.ogImage.url) : null

	const imageUrl = image ? formatMediaUrl(image) : null

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`,
			images: imageUrl ? [{ url: imageUrl }] : [],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: imageUrl ? [imageUrl] : [],
		},
		keywords: seo?.keywords?.map(k => k.keyword).filter(Boolean) as string[],
	}
}
