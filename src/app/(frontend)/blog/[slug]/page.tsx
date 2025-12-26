import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { BlogPostPageClient } from '@/components/blog-post-page-client'
import type { Landing, Post } from '@/payload-types'

interface BlogPostPageProps {
	params: Promise<{ slug: string }>
}

async function getPostBySlug(slug: string): Promise<Post | null> {
	try {
		const payload = await getPayload({ config: configPromise })
		const result = await payload.find({
			collection: 'posts',
			where: {
				slug: { equals: slug },
				status: { equals: 'published' },
			},
			limit: 1,
			depth: 2, // Populate categories and featuredImage
		})

		return result.docs.length > 0 ? result.docs[0] : null
	} catch (error) {
		console.error('Failed to fetch post:', error)
		return null
	}
}

async function getLandingData(): Promise<Landing | null> {
	try {
		const payload = await getPayload({ config: configPromise })
		return await payload.findGlobal({ slug: 'landing' })
	} catch (error) {
		console.error('Failed to fetch landing data:', error)
		return null
	}
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
	const { slug } = await params
	const post = await getPostBySlug(slug)

	if (!post) {
		return {
			title: 'Article non trouvé | Blog Nounou Sciez',
			description: 'Cet article n\'existe pas ou a été supprimé.',
		}
	}

	// Use SEO fields if available, fallback to post data
	const title = post.seo?.metaTitle || `${post.title} | Blog Nounou Sciez`
	const description = post.seo?.metaDescription || post.excerpt || `Découvrez ${post.title} sur notre blog petite enfance`

	// Use featured image for Open Graph, fallback to site default
	const ogImageUrl = typeof post.featuredImage === 'object' && post.featuredImage?.url 
		? post.featuredImage.url 
		: 'https://isabelle-cinquin.fr/og-isa.webp'

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime: post.publishedAt || undefined,
			modifiedTime: post.updatedAt || undefined,
			authors: ['Isabelle Cinquin'],
			images: [
				{
					url: ogImageUrl,
					width: 1200,
					height: 630,
					alt: post.title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImageUrl],
		},
		alternates: {
			canonical: `https://isabelle-cinquin.fr/blog/${post.slug}`,
		},
	}
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params

	// Fetch post and landing data in parallel
	const [post, landing] = await Promise.all([getPostBySlug(slug), getLandingData()])

	// If no post found, return 404
	if (!post) {
		notFound()
	}

	return <BlogPostPageClient post={post} landing={landing} />
}

// Generate static params for all published posts
export async function generateStaticParams() {
	try {
		const payload = await getPayload({ config: configPromise })
		const posts = await payload.find({
			collection: 'posts',
			where: {
				status: { equals: 'published' },
			},
			limit: 100,
		})

		return posts.docs.map(post => ({
			slug: post.slug,
		}))
	} catch {
		return []
	}
}
