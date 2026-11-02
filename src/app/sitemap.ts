import config from '@payload-config'
import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

// Régénéré au plus toutes les heures : sans cela, le sitemap est figé au build et un article publié ensuite n'y
// apparaît qu'au déploiement suivant.
export const revalidate = 3600

const baseUrl = 'https://isabelle-cinquin.fr'

const dateOf = (value?: string | null) => (value ? new Date(value) : undefined)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// Pages statiques. Pas de date de modification inventée : seules les dates connues sont données.
	const staticPages: MetadataRoute.Sitemap = [
		{ url: baseUrl, changeFrequency: 'weekly', priority: 1 },
		{ url: `${baseUrl}/blog`, changeFrequency: 'daily', priority: 0.8 },
		{ url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.7 },
		{ url: `${baseUrl}/mentions-legales`, changeFrequency: 'yearly', priority: 0.3 },
	]

	try {
		const payload = await getPayload({ config })
		const [landing, posts] = await Promise.all([
			payload.findGlobal({ slug: 'landing', depth: 0 }),
			payload.find({
				collection: 'posts',
				where: { status: { equals: 'published' } },
				limit: 1000,
				depth: 0,
				sort: '-publishedAt',
			}),
		])

		const accueil = dateOf(landing?.updatedAt)
		if (accueil) staticPages[0].lastModified = accueil

		const blogPosts: MetadataRoute.Sitemap = posts.docs.map(post => ({
			url: `${baseUrl}/blog/${post.slug}`,
			lastModified: dateOf(post.updatedAt) ?? dateOf(post.publishedAt),
			changeFrequency: 'monthly' as const,
			priority: 0.6,
		}))

		// La page du blog change quand un de ses articles change
		const dernier = blogPosts
			.map(p => p.lastModified)
			.filter((d): d is Date => d instanceof Date)
			.sort((a, b) => b.getTime() - a.getTime())[0]
		if (dernier) staticPages[1].lastModified = dernier

		return [...staticPages, ...blogPosts]
	} catch (error) {
		console.error('Error generating sitemap:', error)
		// Pages statiques seules si la lecture des articles échoue
		return staticPages
	}
}
