import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Calendar, Tag } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import type { Media } from '@/payload-types'

interface BlogPostPageProps {
	params: Promise<{
		slug: string
	}>
}

interface Post {
	id: number
	title: string
	slug: string
	excerpt: string
	content: unknown
	featuredImage: Media | number | null
	categories?: ({ id: number; name: string; slug: string } | number)[] | null
	tags?: ({ id: number; name: string; slug: string } | number)[] | null
	isImportant: boolean
	status: 'draft' | 'published'
	publishedAt?: string | null
}

async function getPost(slug: string): Promise<Post | null> {
	try {
		const payload = await getPayload({ config })
		const posts = await payload.find({
			// @ts-expect-error - posts collection not in generated types yet
			collection: 'posts',
			where: {
				slug: { equals: slug },
				status: { equals: 'published' },
			},
			limit: 1,
			depth: 2,
		})

		return (posts.docs[0] as unknown as Post) || null
	} catch {
		return null
	}
}

async function getAdjacentPosts(
	publishedAt: string,
	currentId: number
): Promise<{ prev: Post | null; next: Post | null }> {
	try {
		const payload = await getPayload({ config })

		const [prevPost, nextPost] = await Promise.all([
			payload.find({
				// @ts-expect-error - posts collection not in generated types yet
				collection: 'posts',
				where: {
					status: { equals: 'published' },
					publishedAt: { less_than: publishedAt },
					id: { not_equals: currentId },
				},
				sort: '-publishedAt',
				limit: 1,
			}),
			payload.find({
				// @ts-expect-error - posts collection not in generated types yet
				collection: 'posts',
				where: {
					status: { equals: 'published' },
					publishedAt: { greater_than: publishedAt },
					id: { not_equals: currentId },
				},
				sort: 'publishedAt',
				limit: 1,
			}),
		])

		return {
			prev: (prevPost.docs[0] as unknown as Post) || null,
			next: (nextPost.docs[0] as unknown as Post) || null,
		}
	} catch {
		return { prev: null, next: null }
	}
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
	const { slug } = await params
	const post = await getPost(slug)

	if (!post) {
		return { title: 'Article non trouvé' }
	}

	const imageUrl =
		typeof post.featuredImage === 'object' && (post.featuredImage as Media)?.url
			? (post.featuredImage as Media).url
			: undefined

	return {
		title: post.title,
		description: post.excerpt,
		openGraph: imageUrl
			? {
					images: [{ url: imageUrl }],
				}
			: undefined,
	}
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params
	const post = await getPost(slug)

	if (!post) {
		notFound()
	}

	const { prev, next } = post.publishedAt
		? await getAdjacentPosts(post.publishedAt, post.id)
		: { prev: null, next: null }

	const featuredImage = post.featuredImage as Media | null
	const mediaUrl = featuredImage?.url || null
	const mediaAlt = featuredImage?.alt || post.title

	const categories = (post.categories || []).filter(
		(cat): cat is { id: number; name: string; slug: string } => typeof cat === 'object' && cat !== null
	)
	const tags = (post.tags || []).filter(
		(tag): tag is { id: number; name: string; slug: string } => typeof tag === 'object' && tag !== null
	)

	return (
		<>
			<Header />

			<main className="min-h-screen bg-background">
				{/* Hero image */}
				{mediaUrl && (
					<div className="relative h-[50vh] md:h-[60vh]">
						<Image src={mediaUrl} alt={mediaAlt} fill className="object-cover" priority sizes="100vw" />
						<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
					</div>
				)}

				{/* Article content */}
				<article className="relative -mt-32 pb-16">
					<div className="max-w-3xl mx-auto px-4">
						<div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
							{/* Back link */}
							<Link
								href="/blog"
								className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
							>
								<ArrowLeft className="w-4 h-4" />
								Retour au blog
							</Link>

							{/* Categories */}
							{categories.length > 0 && (
								<div className="flex flex-wrap gap-2 mb-4">
									{categories.map(cat => (
										<Link
											key={cat.id}
											href={`/blog?category=${cat.slug}`}
											className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
										>
											{cat.name}
										</Link>
									))}
								</div>
							)}

							{/* Title */}
							<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{post.title}</h1>

							{/* Date */}
							{post.publishedAt && (
								<div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
									<Calendar className="w-4 h-4" />
									{new Date(post.publishedAt).toLocaleDateString('fr-FR', {
										day: 'numeric',
										month: 'long',
										year: 'numeric',
									})}
								</div>
							)}

							{/* Excerpt */}
							<p className="text-lg text-muted-foreground mb-8 italic">{post.excerpt}</p>

							{/* Content - Rich text simplified rendering */}
							<div className="prose prose-lg max-w-none">
								{/* The rich text content would be rendered here */}
								{/* For now, displaying a placeholder */}
								<p className="text-foreground">
									Contenu de l'article à afficher ici. Le rendu du rich text Lexical nécessite un composant dédié.
								</p>
							</div>

							{/* Tags */}
							{tags.length > 0 && (
								<div className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t">
									<Tag className="w-4 h-4 text-muted-foreground" />
									{tags.map(tag => (
										<span key={tag.id} className="text-sm px-3 py-1 bg-muted text-muted-foreground rounded-full">
											{tag.name}
										</span>
									))}
								</div>
							)}
						</div>
					</div>
				</article>

				{/* Navigation prev/next */}
				{(prev || next) && (
					<section className="section-secondary py-12 px-4">
						<div className="max-w-3xl mx-auto">
							<div className="grid md:grid-cols-2 gap-6">
								{prev ? (
									<Link
										href={`/blog/${prev.slug}`}
										className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group"
									>
										<ArrowLeft className="w-5 h-5 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
										<div>
											<p className="text-sm opacity-70">Article précédent</p>
											<p className="font-medium line-clamp-1">{prev.title}</p>
										</div>
									</Link>
								) : (
									<div />
								)}

								{next ? (
									<Link
										href={`/blog/${next.slug}`}
										className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group text-right justify-end"
									>
										<div>
											<p className="text-sm opacity-70">Article suivant</p>
											<p className="font-medium line-clamp-1">{next.title}</p>
										</div>
										<ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
									</Link>
								) : (
									<div />
								)}
							</div>
						</div>
					</section>
				)}
			</main>

			<Footer />
		</>
	)
}
