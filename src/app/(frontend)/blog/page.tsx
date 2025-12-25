'use client'

import configPromise from '@payload-config'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import { ContactPreview } from '@/components/sections/contact-preview'
import { LazyImage } from '@/components/ui/lazy-image'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import type { Landing } from '@/payload-types'

// Default blog posts for preview
const defaultPosts = [
	{
		id: 1,
		title: 'Activités manuelles créatives',
		slug: 'activites-manuelles',
		excerpt:
			'Peinture, dessin, pâte à modeler, sable magique... Des activités pour développer la créativité des enfants !',
		image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&auto=format&fit=crop',
		category: 'Créativité',
		publishedAt: '2024-01-15',
		readTime: '3 min',
	},
	{
		id: 2,
		title: 'Promenades au lac Léman',
		slug: 'promenades-lac',
		excerpt: "Découverte de la nature, observation des canards, jeux au bord de l'eau dans un cadre magnifique.",
		image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&auto=format&fit=crop',
		category: 'Extérieur',
		publishedAt: '2024-01-10',
		readTime: '4 min',
	},
	{
		id: 3,
		title: 'Jeux et éveil musical',
		slug: 'jeux-eveil',
		excerpt: 'Comptines, instruments de musique, danse... Pour éveiller les sens et passer de bons moments.',
		image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=600&auto=format&fit=crop',
		category: 'Éveil',
		publishedAt: '2024-01-05',
		readTime: '5 min',
	},
	{
		id: 4,
		title: 'La lecture avec les petits',
		slug: 'lecture-petits',
		excerpt: 'Histoires du soir, livres imagés, contes... Des moments de calme et de partage autour des livres.',
		image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=600&auto=format&fit=crop',
		category: 'Éveil',
		publishedAt: '2024-01-02',
		readTime: '3 min',
	},
	{
		id: 5,
		title: 'Jeux en plein air',
		slug: 'jeux-plein-air',
		excerpt: 'Toboggan, balançoire, bac à sable... Le jardin est un terrain de jeu idéal pour les enfants.',
		image: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=800&h=600&auto=format&fit=crop',
		category: 'Extérieur',
		publishedAt: '2023-12-28',
		readTime: '4 min',
	},
	{
		id: 6,
		title: 'Cuisine avec les enfants',
		slug: 'cuisine-enfants',
		excerpt: "Gâteaux, biscuits, pizzas maison... Apprendre en s'amusant et déguster ensemble.",
		image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&auto=format&fit=crop',
		category: 'Créativité',
		publishedAt: '2023-12-20',
		readTime: '5 min',
	},
]

export default async function BlogPage() {
	// Try to fetch real posts from CMS
	let posts: typeof defaultPosts = []
	let landing: Landing | null = null

	try {
		const payload = await getPayload({ config: configPromise })

		// Fetch posts and landing data in parallel
		const [postsResult, landingData] = await Promise.all([
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

		if (postsResult.docs && postsResult.docs.length > 0) {
			posts = postsResult.docs.map(post => {
				// Get first category name if available
				const firstCategory =
					Array.isArray(post.categories) && post.categories.length > 0
						? typeof post.categories[0] === 'object'
							? post.categories[0].name
							: null
						: null

				// Get featured image URL
				const imageUrl =
					typeof post.featuredImage === 'object' && post.featuredImage?.url ? post.featuredImage.url : null

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
		}

		landing = landingData
	} catch (error) {
		// CMS not available, use defaults
		console.log('Using default posts', error)
	}

	// Use defaults if no CMS posts
	const displayPosts = posts.length > 0 ? posts : defaultPosts

	return (
		<main className="min-h-screen">
			{/* Hero Section */}
			<section className="relative min-h-[85vh] overflow-hidden bg-primary">
				{/* Content */}
				<div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-40">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						{/* Left: Text content */}
						<div className="max-w-xl">
							{/* Title with stagger animation */}
							<motion.h1
								className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
							>
								Le{' '}
								<motion.span
									className="font-handwriting text-pink-200 inline-block"
									initial={{ opacity: 0, rotate: -5 }}
									animate={{ opacity: 1, rotate: 0 }}
									transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 200 }}
								>
									Blog
								</motion.span>{' '}
								de{' '}
								<motion.span
									className="font-handwriting text-pink-200 inline-block"
									initial={{ opacity: 0, rotate: 5 }}
									animate={{ opacity: 1, rotate: 0 }}
									transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 200 }}
								>
									Nounou
								</motion.span>
							</motion.h1>

							{/* Description with stagger */}
							<motion.p
								className="text-lg md:text-xl text-white/80 leading-relaxed mb-8"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 0.8, y: 0 }}
								transition={{ duration: 0.7, delay: 0.4 }}
							>
								Ici, on partage les <strong className="text-white">actualités</strong>, les{' '}
								<strong className="text-white">activités avec les enfants</strong>, et la{' '}
								<strong className="text-white">vie au jour le jour</strong>. Des idées, des exemples et de l'inspiration
								pour les parents et les assistantes maternelles !
							</motion.p>

							{/* CTA button */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.6, type: 'spring', stiffness: 200 }}
							>
								<Link
									href="#articles"
									className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-full font-semibold hover:bg-white/90 transition-all hover:scale-105 shadow-lg group"
								>
									Découvrir les articles
									<motion.div
										animate={{ x: [0, 4, 0] }}
										transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
									>
										<ArrowRight className="w-5 h-5" />
									</motion.div>
								</Link>
							</motion.div>
						</div>

						{/* Right: Images stacked diagonally */}
						<div className="relative h-96 md:h-[500px] lg:h-[550px] hidden md:block">
							{/* Image 1 - Rotated left */}
							<motion.div
								className="absolute top-0 right-16 w-72 lg:w-96 aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 -rotate-6"
								initial={{ opacity: 0, y: 40, rotate: -15 }}
								animate={{ opacity: 1, y: 0, rotate: -6 }}
								transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
								whileHover={{ scale: 1.05, rotate: 0 }}
							>
								<Image
									src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=600&auto=format&fit=crop"
									alt="Enfants jouant ensemble"
									fill
									className="object-cover"
									sizes="400px"
								/>
							</motion.div>

							{/* Image 2 - Rotated right */}
							<motion.div
								className="absolute bottom-0 right-0 w-72 lg:w-96 aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 rotate-6"
								initial={{ opacity: 0, y: 40, rotate: 15 }}
								animate={{ opacity: 1, y: 0, rotate: 6 }}
								transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
								whileHover={{ scale: 1.05, rotate: 0 }}
							>
								<Image
									src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&auto=format&fit=crop"
									alt="Activité créative avec les enfants"
									fill
									className="object-cover"
									sizes="400px"
								/>
							</motion.div>
						</div>
					</div>
				</div>

				{/* Diagonal wave separator */}
				<motion.div
					className="absolute bottom-0 left-0 right-0"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.9 }}
				>
					<svg
						viewBox="0 0 1440 200"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="w-full h-auto"
						preserveAspectRatio="none"
					>
						{/* Diagonal slant with subtle wave */}
						<motion.path
							d="M0,160 C150,145 300,100 500,85 C700,70 900,55 1100,45 C1250,38 1350,35 1440,30 L1440,200 L0,200 Z"
							className="fill-secondary"
							initial={{ pathLength: 0 }}
							animate={{ pathLength: 1 }}
							transition={{ duration: 1.2, delay: 1, ease: 'easeInOut' }}
						/>
						{/* Decorative dashed line aligned with the diagonal edge */}
						<motion.path
							d="M0,160 C150,145 300,100 500,85 C700,70 900,55 1100,45 C1250,38 1350,35 1440,30"
							stroke="white"
							strokeWidth="2"
							strokeDasharray="12 8"
							fill="none"
							opacity="0.4"
							initial={{ pathLength: 0 }}
							animate={{ pathLength: 1 }}
							transition={{ duration: 1.5, delay: 1.2, ease: 'easeInOut' }}
						/>
					</svg>
				</motion.div>
			</section>

			{/* Articles Section */}
			<SectionWrapper id="articles" variant="secondary" className="pt-8 pb-16">
				<div className="max-w-7xl mx-auto">
					{/* Section header */}
					<motion.div
						className="text-center mb-12"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-100px' }}
						transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
					>
						<motion.h2
							className="text-3xl md:text-4xl font-bold text-white tracking-tight"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.1 }}
						>
							Tous les{' '}
							<motion.span
								className="font-handwriting text-white/80 inline-block"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 0.8 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.2 }}
							>
								articles
							</motion.span>
						</motion.h2>
						<motion.p
							className="mt-4 text-lg text-white/70"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 0.7 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.3 }}
						>
							Parcourez nos publications et découvrez notre quotidien
						</motion.p>
					</motion.div>

					{/* Blog grid with stagger */}
					<motion.div
						className="grid gap-6 p-4 md:grid-cols-2 lg:grid-cols-3"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.1 }}
						variants={{
							hidden: {},
							visible: {
								transition: {
									staggerChildren: 0.08,
									delayChildren: 0.2,
								},
							},
						}}
					>
						{displayPosts.map((post, _index) => (
							<motion.div
								key={post.id}
								variants={{
									hidden: { opacity: 0, y: 30 },
									visible: { opacity: 1, y: 0 },
								}}
								transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
							>
								<Link
									href={`/blog/${post.slug}`}
									className="group flex flex-col gap-3 rounded-2xl p-3 hover:bg-white/10 transition-all block"
								>
									<motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
										<motion.div
											className="relative overflow-hidden rounded-xl"
											whileHover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
										>
											<LazyImage
												src={post.image}
												fallback="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&auto=format&fit=crop"
												inView={true}
												alt={post.title}
												ratio={16 / 9}
												className="transition-transform duration-500 group-hover:scale-105"
											/>
											{/* Overlay on hover */}
											<div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
										</motion.div>

										<div className="space-y-2 px-1 pb-2 mt-3">
											{/* Meta info */}
											<div className="flex items-center gap-2 text-xs text-white/50">
												{post.category && (
													<>
														<motion.span
															className="text-pink-300 font-medium"
															animate={{ opacity: [0.7, 1, 0.7] }}
															transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
														>
															{post.category}
														</motion.span>
														<div className="bg-white/30 size-1 rounded-full" />
													</>
												)}
												{post.publishedAt && (
													<>
														<span>
															{new Date(post.publishedAt).toLocaleDateString('fr-FR', {
																day: 'numeric',
																month: 'short',
																year: 'numeric',
															})}
														</span>
														<div className="bg-white/30 size-1 rounded-full" />
													</>
												)}
												<span>{post.readTime}</span>
											</div>

											{/* Title */}
											<h2 className="text-lg font-semibold text-white leading-snug line-clamp-2 group-hover:text-accent transition-colors">
												{post.title}
											</h2>

											{/* Excerpt */}
											<p className="text-sm text-white/60 line-clamp-3">{post.excerpt}</p>
										</div>
									</motion.div>
								</Link>
							</motion.div>
						))}
					</motion.div>
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

// ... metadata export ...

import type { SeoData } from '@/lib/metadata'
import { constructMetadata } from '@/lib/metadata'

export async function generateMetadata() {
	const payload = await getPayload({ config: configPromise })
	const seoGlobal = await payload.findGlobal({
		slug: 'seo',
	})

	return constructMetadata({
		seo: seoGlobal.blog?.seo as SeoData,
		fallbackTitle: 'Blog | Nounou Sciez',
		fallbackDescription: 'Découvrez les actualités et moments de vie chez nounou à Sciez',
	})
}
