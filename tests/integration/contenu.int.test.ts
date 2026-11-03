/**
 * Payload réel (base Postgres jetable semée avec e2e/instantane/, faux S3) : les requêtes que font les pages
 * renvoient ce qu'elles attendent. Garde-fou des montées de Payload et de son adaptateur Postgres.
 * Lancé par e2e/ci.sh après le semis ; refuse toute base qui n'est pas locale.
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import config from '@payload-config'
import { getPayload, type Payload } from 'payload'
import { beforeAll, describe, expect, it } from 'vitest'
import sitemap from '@/app/sitemap'
import type { Media, Post } from '@/payload-types'

const hote = new URL(process.env.DATABASE_URI ?? 'postgres://aucune').hostname
if (!['localhost', '127.0.0.1', 'postgres'].includes(hote)) {
	throw new Error(`Tests d'intégration : base locale jetable attendue, reçu « ${hote} »`)
}

const instantane = JSON.parse(
	readFileSync(path.resolve(import.meta.dirname, '../../e2e/instantane/contenu.json'), 'utf8')
) as {
	medias: { fichier: string }[]
	categories: { slug: string }[]
	posts: { slug: string; title: string }[]
	landing: { hero: { title: string }; familyMembers: unknown[]; settings: { phone: string } }
}

let payload: Payload
beforeAll(async () => {
	payload = await getPayload({ config })
})

describe('contenu semé', () => {
	it('contient tous les médias, catégories et articles de l’instantané', async () => {
		const [medias, categories, posts] = await Promise.all([
			payload.count({ collection: 'media' }),
			payload.count({ collection: 'categories' }),
			payload.count({ collection: 'posts' }),
		])
		expect(medias.totalDocs).toBe(instantane.medias.length)
		expect(categories.totalDocs).toBe(instantane.categories.length)
		expect(posts.totalDocs).toBe(instantane.posts.length)
	})
})

describe('requêtes des pages', () => {
	it('accueil : le global landing est peuplé en profondeur 2 (images avec leur adresse)', async () => {
		const landing = await payload.findGlobal({ slug: 'landing', depth: 2 })
		expect(landing.hero?.title).toBe(instantane.landing.hero.title)
		expect(landing.settings?.phone).toBe(instantane.landing.settings.phone)
		expect(landing.familyMembers).toHaveLength(instantane.landing.familyMembers.length)
		const image = landing.about?.image as Media
		expect(typeof image).toBe('object')
		expect(image.url).toMatch(/^http:\/\/localhost:3000\/api\/media\/file\//)
		expect(image.width).toBeGreaterThan(0)
	})

	it('accueil : les articles importants publiés, du plus récent au plus ancien', async () => {
		const { docs } = await payload.find({
			collection: 'posts',
			where: { isImportant: { equals: true }, status: { equals: 'published' } },
			limit: 6,
			sort: '-publishedAt',
			depth: 2,
		})
		expect(docs.length).toBeGreaterThan(0)
		const dates = docs.map(p => new Date(p.publishedAt ?? 0).getTime())
		expect(dates).toEqual([...dates].sort((a, b) => b - a))
		expect(typeof docs[0].featuredImage).toBe('object')
	})

	it('article : retrouvé par son slug, catégories et image peuplées', async () => {
		const { slug, title } = instantane.posts[0]
		const { docs } = await payload.find({
			collection: 'posts',
			where: { slug: { equals: slug }, status: { equals: 'published' } },
			limit: 1,
			depth: 2,
		})
		const post = docs[0] as Post
		expect(post.title).toBe(title)
		expect(post.content?.root?.children?.length).toBeGreaterThan(0)
		expect((post.categories ?? []).every(c => typeof c === 'object')).toBe(true)
	})

	it('un slug inconnu ne renvoie rien', async () => {
		const { docs } = await payload.find({ collection: 'posts', where: { slug: { equals: 'inconnu' } }, limit: 1 })
		expect(docs).toEqual([])
	})
})

describe('sitemap sur la vraie base', () => {
	it('liste les pages et chaque article publié, avec une date', async () => {
		const entrees = await sitemap()
		for (const { slug } of instantane.posts) {
			const entree = entrees.find(e => e.url === `https://isabelle-cinquin.fr/blog/${slug}`)
			expect(entree?.lastModified).toBeInstanceOf(Date)
		}
		expect(entrees[0]).toMatchObject({ url: 'https://isabelle-cinquin.fr', lastModified: expect.any(Date) })
	})
})

describe('stockage des médias (plugin S3)', () => {
	it('chaque fichier de l’instantané est lisible dans le stockage', async () => {
		const { docs } = await payload.find({ collection: 'media', limit: 1000, depth: 0 })
		const noms = docs.map(d => d.filename).sort()
		expect(noms).toEqual(instantane.medias.map(m => m.fichier).sort())
	})
})
