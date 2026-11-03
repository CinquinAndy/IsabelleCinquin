import { describe, expect, it } from 'vitest'
import { generateSEOMetadata, getSiteUrl } from './seo'

describe('generateSEOMetadata', () => {
	it('prend le titre et la description SEO, et pose l’adresse canonique du site', () => {
		const meta = generateSEOMetadata(
			{ seo_title: 'Titre SEO', seo_description: 'Description SEO', title: 'Titre' },
			'/blog'
		)
		expect(meta).toEqual({
			title: 'Titre SEO',
			description: 'Description SEO',
			alternates: { canonical: 'https://isabelle-cinquin.fr/blog' },
		})
	})

	it('se replie sur le titre, puis sur la description courte', () => {
		const meta = generateSEOMetadata({ title: 'Titre', shortDescription: 'Courte' }, '/contact')
		expect(meta.title).toBe('Titre')
		expect(meta.description).toBe('Courte')
	})

	it('tire une description du texte riche et la coupe à 155 caractères sur un mot', () => {
		const mot = 'enfant '
		const meta = generateSEOMetadata({ title: 'T', description: mot.repeat(40) }, '/')
		const description = String(meta.description)
		expect(description.length).toBeLessThanOrEqual(158)
		expect(description.endsWith('enfant...')).toBe(true)
	})

	it('coupe une description SEO trop longue', () => {
		const meta = generateSEOMetadata({ title: 'T', seo_description: 'a '.repeat(100) }, '/')
		expect(String(meta.description).length).toBeLessThanOrEqual(158)
	})

	it('donne un titre par défaut sans titre', () => {
		expect(generateSEOMetadata({}, '/')).toEqual({ title: 'Isabelle Cinquin | Nounou Sciez' })
	})

	it('ajoute la directive robots demandée', () => {
		expect(generateSEOMetadata({ title: 'T' }, '/', { robots: 'noindex' }).robots).toBe('noindex')
	})

	it('expose l’adresse du site', () => {
		expect(getSiteUrl()).toBe('https://isabelle-cinquin.fr')
	})
})
