import configPromise from '@payload-config'
import { ArrowLeft, Calendar, ChevronDown, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { RichTextParser } from '@/components/rich-text-parser'
import { ContactPreview } from '@/components/sections/contact-preview'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { formatMediaUrl } from '@/lib/utils'
import type { Landing, Post } from '@/payload-types'

interface BlogPostPageProps {
	params: Promise<{ slug: string }>
}

// Decorative icons for hero section
const decorativeIcons = [
	{ src: '/icons/scribbbles/7/SVG/Fichier 15.svg', position: 'top-20 left-8 md:left-16' },
	{ src: '/icons/scribbbles/7/SVG/Fichier 10.svg', position: 'top-32 right-4 md:right-20' },
	{ src: '/icons/scribbbles/7/SVG/Fichier 20.svg', position: 'bottom-32 left-12 md:left-24' },
	{ src: '/icons/scribbbles/7/SVG/Fichier 2.svg', position: 'bottom-20 right-8 md:right-16' },
]

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params

	// Fetch post and landing data in parallel
	const [post, landing] = await Promise.all([
		getPostBySlug(slug),
		getLandingData(),
	])

	// If no post found, return 404
	if (!post) {
		notFound()
	}

	// Extract data from post
	const title = post.title
	const category = Array.isArray(post.categories) && post.categories.length > 0
		? (typeof post.categories[0] === 'object' ? post.categories[0].name : null)
		: null
	const publishedAt = post.publishedAt
	const featuredImageUrl = typeof post.featuredImage === 'object' && post.featuredImage?.url
		? formatMediaUrl(post.featuredImage.url)
		: null
	const featuredImageAlt = typeof post.featuredImage === 'object' && post.featuredImage?.alt
		? post.featuredImage.alt
		: title

	return (
		<main className="min-h-screen">
			{/* Hero Section */}
			<section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-secondary via-primary to-primary">
				{/* Floating decorative icons */}
				{decorativeIcons.map((icon, index) => (
					<div
						key={icon.src}
						className={`absolute ${icon.position} w-16 h-16 md:w-20 md:h-20 opacity-60 animate-subtle-spin`}
						style={{ animationDelay: `${index * 0.5}s` }}
					>
						<Image src={icon.src} alt="" width={80} height={80} className="drop-shadow-lg" />
					</div>
				))}

				{/* Back link */}
				<Link
					href="/blog"
					className="absolute top-24 left-6 md:left-12 inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors z-10"
				>
					<ArrowLeft className="w-4 h-4" />
					<span className="hidden sm:inline">Retour au blog</span>
				</Link>

				{/* Center content */}
				<div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
					{/* Category badge */}
					{category && (
						<span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium rounded-full mb-6">
							{category}
						</span>
					)}

					{/* Title in handwriting font */}
					<h1 className="font-handwriting text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-tight mb-6 drop-shadow-lg">
						{title}
					</h1>

					{/* Meta info */}
					<div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70 mb-8">
						<span>Par Isabelle Cinquin</span>
						<div className="w-1 h-1 rounded-full bg-white/40" />
						{publishedAt && (
							<>
								<span className="flex items-center gap-1.5">
									<Calendar className="w-4 h-4" />
									{new Date(publishedAt).toLocaleDateString('fr-FR', {
										day: 'numeric',
										month: 'long',
										year: 'numeric',
									})}
								</span>
								<div className="w-1 h-1 rounded-full bg-white/40" />
							</>
						)}
						<span className="flex items-center gap-1.5">
							<Clock className="w-4 h-4" />
							3 min de lecture
						</span>
					</div>
				</div>

				{/* Scroll indicator */}
				<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
					<ChevronDown className="w-6 h-6" />
					<span className="text-xs">Lire l'article</span>
				</div>

				{/* Wavy bottom border */}
				<div className="absolute bottom-0 left-0 right-0">
					<svg
						viewBox="0 0 1440 120"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="w-full h-auto"
						preserveAspectRatio="none"
					>
						<path
							d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
							fill="currentColor"
							className="text-primary"
						/>
					</svg>
				</div>
			</section>

			{/* Article Content */}
			<SectionWrapper variant="primary" className="pt-0 pb-16">
				<div className="max-w-4xl mx-auto px-4">
					{/* Featured image */}
					{featuredImageUrl && (
						<div className="relative -mt-20 mb-12 z-10">
							<div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
								<Image
									src={featuredImageUrl}
									alt={featuredImageAlt}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 800px"
									priority
								/>
							</div>
						</div>
					)}

					{/* Article content from rich text */}
					<article className="prose prose-invert prose-lg max-w-none">
						{post.content && <RichTextParser content={post.content} />}
					</article>
				</div>
			</SectionWrapper>

			{/* CTA Section */}
			<ContactPreview
				title={landing?.contactSection?.title}
				content={landing?.contactSection?.content}
				phone={landing?.settings?.phone}
			/>
		</main>
	)
}

export async function generateMetadata({ params }: BlogPostPageProps) {
	const { slug } = await params
	const post = await getPostBySlug(slug)

	if (!post) {
		return {
			title: 'Article non trouvé | Blog Nounou Sciez',
		}
	}

	return {
		title: `${post.title} | Blog Nounou Sciez`,
		description: post.excerpt,
	}
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

		return posts.docs.map((post) => ({
			slug: post.slug,
		}))
	} catch {
		return []
	}
}
