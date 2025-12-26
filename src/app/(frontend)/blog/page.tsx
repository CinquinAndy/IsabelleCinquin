import type { Metadata } from 'next'
import { getPayload } from 'payload'
import { BlogPageClient } from '@/components/blog-page-client'
import { formatMediaUrl } from '@/lib/utils'
import configPromise from '@/payload.config'

export const metadata: Metadata = {
	title: 'Blog Petite Enfance | Conseils Nounou - Isabelle Cinquin',
	description:
		"Découvrez mes articles : activités manuelles, recettes pour enfants, jeux d'éveil, conseils éducatifs. Par Isabelle Cinquin, nounou à Sciez depuis 20+ ans.",
	keywords: [
		'blog petite enfance',
		'activités enfants',
		'recettes enfants',
		'conseils nounou',
		'éveil bébé',
		'jeux éducatifs',
		'idées activités manuelles',
		'blog assistante maternelle',
	],
	openGraph: {
		title: 'Blog Petite Enfance - Nounou Sciez',
		description: "Articles et conseils sur la garde d'enfants par une assistante maternelle expérimentée",
		type: 'website',
		url: 'https://isabelle-cinquin.fr/blog',
	},
	alternates: {
		canonical: 'https://isabelle-cinquin.fr/blog',
	},
}

export default async function BlogPage() {
	const payload = await getPayload({ config: configPromise })

	// Fetch posts and landing data in parallel
	const [postsResult, landing] = await Promise.all([
		payload.find({
			collection: 'posts',
			where: {
				status: { equals: 'published' },
			},
			limit: 20,
			sort: '-publishedAt',
			depth: 2, // Populate relations (categories, featuredImage)
		}),
		payload.findGlobal({ slug: 'landing' }),
	])

	// Map posts to the format expected by BlogPageClient
	const posts = postsResult.docs.map(post => {
		// Get first category name if available
		const firstCategory =
			Array.isArray(post.categories) && post.categories.length > 0
				? typeof post.categories[0] === 'object'
					? post.categories[0].name
					: null
				: null

		// Debug: log the featuredImage structure
		console.log('Post:', post.title, 'featuredImage:', post.featuredImage)

		// Get featured image URL and format it
		const imageUrl =
			typeof post.featuredImage === 'object' && post.featuredImage?.url ? formatMediaUrl(post.featuredImage.url) : null

		console.log('Post:', post.title, 'imageUrl after formatting:', imageUrl)

		return {
			id: post.id,
			title: post.title || 'Sans titre',
			slug: post.slug || '',
			excerpt: post.excerpt || '',
			image: imageUrl || '',
			category: firstCategory || '',
			publishedAt: post.publishedAt || '',
			readTime: '3 min', // Could be computed from content length
		}
	})

	return <BlogPageClient posts={posts} landing={landing} />
}
