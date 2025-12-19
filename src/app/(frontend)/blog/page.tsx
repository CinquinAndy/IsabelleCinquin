import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PostCard } from '@/components/blog'

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Découvrez les activités, conseils et actualités de nounou Isabelle à Sciez.',
}

const POSTS_PER_PAGE = 9

interface BlogPageProps {
	searchParams: Promise<{
		page?: string
		category?: string
	}>
}

interface Post {
	id: number
	title: string
	slug: string
	excerpt: string
	featuredImage?: { id: number; url?: string | null; alt?: string | null } | number | null
	categories?: ({ id: number; name: string; slug: string } | number)[] | null
	publishedAt?: string | null
}

async function getPosts(page: number, categorySlug?: string) {
	try {
		const payload = await getPayload({ config })

		// Build where clause
		const whereClause: Record<string, { equals?: string; contains?: number }> = {
			status: { equals: 'published' },
		}

		if (categorySlug) {
			// First, find the category by slug
			const categories = await payload.find({
				// @ts-expect-error - categories collection not in generated types yet
				collection: 'categories',
				where: { slug: { equals: categorySlug } },
				limit: 1,
			})

			if (categories.docs.length > 0) {
				whereClause.categories = { contains: (categories.docs[0] as { id: number }).id }
			}
		}

		const posts = await payload.find({
			// @ts-expect-error - posts collection not in generated types yet
			collection: 'posts',
			where: whereClause,
			sort: '-publishedAt',
			page,
			limit: POSTS_PER_PAGE,
			depth: 1,
		})

		return {
			docs: posts.docs as unknown as Post[],
			totalPages: posts.totalPages,
			page: posts.page,
			hasNextPage: posts.hasNextPage,
			hasPrevPage: posts.hasPrevPage,
		}
	} catch {
		return { docs: [] as Post[], totalPages: 0, page: 1, hasNextPage: false, hasPrevPage: false }
	}
}

interface Category {
	id: number
	name: string
	slug: string
}

async function getCategories(): Promise<Category[]> {
	try {
		const payload = await getPayload({ config })
		const categories = await payload.find({
			// @ts-expect-error - categories collection not in generated types yet
			collection: 'categories',
			limit: 100,
		})
		return categories.docs as unknown as Category[]
	} catch {
		return []
	}
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
	const params = await searchParams
	const currentPage = Number(params.page) || 1
	const categorySlug = params.category

	const [postsData, categories] = await Promise.all([getPosts(currentPage, categorySlug), getCategories()])

	const { docs: posts, totalPages, hasNextPage, hasPrevPage } = postsData

	return (
		<>
			<Header />

			<main className="min-h-screen bg-background">
				{/* Hero section */}
				<section className="section-primary pt-32 pb-16 px-4">
					<div className="max-w-5xl mx-auto">
						<Link
							href="/"
							className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
						>
							<ArrowLeft className="w-4 h-4" />
							Retour à l'accueil
						</Link>

						<h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
						<p className="text-xl opacity-90 max-w-2xl">Activités, conseils et actualités de nounou</p>
					</div>
				</section>

				{/* Categories filter */}
				{categories.length > 0 && (
					<section className="bg-muted py-6 px-4">
						<div className="max-w-5xl mx-auto">
							<div className="flex flex-wrap items-center gap-3">
								<span className="text-sm font-medium text-muted-foreground">Filtrer par :</span>
								<Link
									href="/blog"
									className={`text-sm px-4 py-2 rounded-full transition-colors ${
										!categorySlug
											? 'bg-primary text-primary-foreground'
											: 'bg-white text-foreground hover:bg-primary/10'
									}`}
								>
									Tous
								</Link>
								{categories.map(category => (
									<Link
										key={category.id}
										href={`/blog?category=${category.slug}`}
										className={`text-sm px-4 py-2 rounded-full transition-colors ${
											categorySlug === category.slug
												? 'bg-primary text-primary-foreground'
												: 'bg-white text-foreground hover:bg-primary/10'
										}`}
									>
										{category.name}
									</Link>
								))}
							</div>
						</div>
					</section>
				)}

				{/* Posts grid */}
				<section className="py-16 px-4">
					<div className="max-w-5xl mx-auto">
						{posts.length > 0 ? (
							<>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
									{posts.map(post => (
										<PostCard
											key={post.id}
											title={post.title}
											slug={post.slug}
											excerpt={post.excerpt}
											featuredImage={post.featuredImage}
											publishedAt={post.publishedAt}
											categories={post.categories}
										/>
									))}
								</div>

								{/* Pagination */}
								{totalPages > 1 && (
									<div className="flex items-center justify-center gap-4 mt-12">
										{hasPrevPage ? (
											<Link
												href={`/blog?page=${currentPage - 1}${categorySlug ? `&category=${categorySlug}` : ''}`}
												className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-foreground"
											>
												<ChevronLeft className="w-4 h-4" />
												Précédent
											</Link>
										) : (
											<span className="flex items-center gap-2 px-4 py-2 text-muted-foreground opacity-50">
												<ChevronLeft className="w-4 h-4" />
												Précédent
											</span>
										)}

										<span className="text-sm text-muted-foreground">
											Page {currentPage} sur {totalPages}
										</span>

										{hasNextPage ? (
											<Link
												href={`/blog?page=${currentPage + 1}${categorySlug ? `&category=${categorySlug}` : ''}`}
												className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-foreground"
											>
												Suivant
												<ChevronRight className="w-4 h-4" />
											</Link>
										) : (
											<span className="flex items-center gap-2 px-4 py-2 text-muted-foreground opacity-50">
												Suivant
												<ChevronRight className="w-4 h-4" />
											</span>
										)}
									</div>
								)}
							</>
						) : (
							<div className="text-center py-20">
								<p className="text-lg text-muted-foreground mb-4">Aucun article pour le moment.</p>
								{categorySlug && (
									<Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline">
										<ArrowLeft className="w-4 h-4" />
										Voir tous les articles
									</Link>
								)}
							</div>
						)}
					</div>
				</section>
			</main>

			<Footer />
		</>
	)
}
