import config from '@payload-config'
import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = 'https://isabelle-cinquin.fr'

	// Pages statiques
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `${baseUrl}/mentions-legales`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.3,
		},
	]

	// Fetch all published blog posts dynamically
	try {
		const payload = await getPayload({ config })
		const posts = await payload.find({
			collection: 'posts',
			where: {
				status: { equals: 'published' },
			},
			limit: 1000, // Adjust based on expected number of posts
			sort: '-publishedAt',
		})

		const blogPosts: MetadataRoute.Sitemap = posts.docs.map(post => ({
			url: `${baseUrl}/blog/${post.slug}`,
			lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt || new Date()),
			changeFrequency: 'monthly' as const,
			priority: 0.6,
		}))

		return [...staticPages, ...blogPosts]
	} catch (error) {
		console.error('Error generating sitemap:', error)
		// Return static pages only if blog posts fetch fails
		return staticPages
	}
}
