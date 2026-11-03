import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { constructMetadata } from './metadata'

describe('constructMetadata', () => {
	const avant = process.env.NEXT_PUBLIC_SERVER_URL
	beforeEach(() => {
		process.env.NEXT_PUBLIC_SERVER_URL = 'https://isabelle-cinquin.fr'
	})
	afterEach(() => {
		process.env.NEXT_PUBLIC_SERVER_URL = avant
	})

	it('utilise les valeurs par défaut sans données SEO', () => {
		const meta = constructMetadata({ path: '/contact' })
		expect(meta.title).toBe('Nounou Sciez - Isabelle Cinquin')
		expect(meta.description).toMatch(/^Assistante Maternelle au bord du Lac Léman/)
		expect(meta.openGraph).toMatchObject({ url: 'https://isabelle-cinquin.fr/contact', images: [] })
		expect(meta.twitter).toMatchObject({ card: 'summary_large_image', images: [] })
	})

	it('reprend titre, description, image et mots-clés saisis', () => {
		const meta = constructMetadata({
			seo: {
				metaTitle: 'Titre',
				metaDescription: 'Description',
				ogImage: { url: 'http://localhost:3000/api/media/file/og.png' } as never,
				keywords: [{ keyword: 'nounou' }, { keyword: null }, { keyword: 'sciez' }],
			},
		})
		expect(meta.title).toBe('Titre')
		expect(meta.description).toBe('Description')
		expect(meta.openGraph).toMatchObject({ images: [{ url: '/api/media/file/og.png' }] })
		expect(meta.twitter).toMatchObject({ images: ['/api/media/file/og.png'] })
		expect(meta.keywords).toEqual(['nounou', 'sciez'])
	})

	it('accepte une image donnée par son adresse', () => {
		const meta = constructMetadata({ seo: { ogImage: 'https://isabelle-cinquin.fr/og-isa.webp' } })
		expect(meta.openGraph).toMatchObject({ images: [{ url: 'https://isabelle-cinquin.fr/og-isa.webp' }] })
	})
})
