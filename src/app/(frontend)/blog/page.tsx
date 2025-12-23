import configPromise from '@payload-config'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import { ContactPreview } from '@/components/sections/contact-preview'
import { LazyImage } from '@/components/ui/lazy-image'
import { SectionWrapper } from '@/components/ui/section-wrapper'

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

	try {
		const payload = await getPayload({ config: configPromise })
		const result = await payload.find({
			collection: 'posts' as any,
			limit: 20,
			sort: '-publishedAt',
		})

		if (result.docs && result.docs.length > 0) {
			posts = result.docs.map((post: any) => ({
				id: post.id,
				title: post.title || 'Sans titre',
				slug: post.slug || '',
				excerpt: post.excerpt || '',
				image: post.featuredImage?.url || null,
				category: post.category || null,
				publishedAt: post.publishedAt || null,
				readTime: post.readTime || '3 min',
			}))
		}
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
							{/* Title */}
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
								Le <span className="font-handwriting text-pink-200">Blog</span> de{' '}
								<span className="font-handwriting text-pink-200">Nounou</span>
							</h1>

							{/* Description */}
							<p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
								Ici, on partage les <strong className="text-white">actualités</strong>, les{' '}
								<strong className="text-white">activités avec les enfants</strong>, et la{' '}
								<strong className="text-white">vie au jour le jour</strong>. Des idées, des exemples et de l'inspiration
								pour les parents et les assistantes maternelles !
							</p>

							{/* CTA button */}
							<Link
								href="#articles"
								className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-full font-semibold hover:bg-white/90 transition-all hover:scale-105 shadow-lg group"
							>
								Découvrir les articles
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</Link>
						</div>

						{/* Right: Images stacked diagonally */}
						<div className="relative h-96 md:h-[500px] lg:h-[550px] hidden md:block">
							{/* Image 1 - Rotated left */}
							<div className="absolute top-0 right-16 w-72 lg:w-96 aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 -rotate-6">
								<Image
									src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=600&auto=format&fit=crop"
									alt="Enfants jouant ensemble"
									fill
									className="object-cover"
									sizes="400px"
								/>
							</div>

							{/* Image 2 - Rotated right */}
							<div className="absolute bottom-0 right-0 w-72 lg:w-96 aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 rotate-6">
								<Image
									src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&auto=format&fit=crop"
									alt="Activité créative avec les enfants"
									fill
									className="object-cover"
									sizes="400px"
								/>
							</div>
						</div>
					</div>
				</div>

					{/* Diagonal wave separator */}
				<div className="absolute bottom-0 left-0 right-0">
					<svg
						viewBox="0 0 1440 200"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="w-full h-auto"
						preserveAspectRatio="none"
					>
						{/* Diagonal slant with subtle wave */}
						<path
							d="M0,160 C150,145 300,100 500,85 C700,70 900,55 1100,45 C1250,38 1350,35 1440,30 L1440,200 L0,200 Z"
							className="fill-secondary"
						/>
						{/* Decorative dashed line aligned with the diagonal edge */}
						<path
							d="M0,160 C150,145 300,100 500,85 C700,70 900,55 1100,45 C1250,38 1350,35 1440,30"
							stroke="white"
							strokeWidth="2"
							strokeDasharray="12 8"
							fill="none"
							opacity="0.4"
						/>
					</svg>
				</div>
			</section>

			{/* Articles Section */}
			<SectionWrapper id="articles" variant="secondary" className="pt-8 pb-16">
				<div className="max-w-7xl mx-auto">
					{/* Section header */}
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
							Tous les <span className="font-handwriting text-white/80">articles</span>
						</h2>
						<p className="mt-4 text-lg text-white/70">Parcourez nos publications et découvrez notre quotidien</p>
					</div>

					{/* Blog grid */}
					<div className="grid gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
						{displayPosts.map(post => (
							<Link
								href={`/blog/${post.slug}`}
								key={post.id}
								className="group flex flex-col gap-3 rounded-2xl p-3 hover:bg-white/10 transition-colors duration-200"
							>
								<LazyImage
									src={post.image}
									fallback="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&auto=format&fit=crop"
									inView={true}
									alt={post.title}
									ratio={16 / 9}
									className="transition-transform duration-500 group-hover:scale-105"
								/>
								<div className="space-y-2 px-1 pb-2">
									{/* Meta info */}
									<div className="flex items-center gap-2 text-xs text-white/50">
										{post.category && (
											<>
												<span className="text-pink-300 font-medium">{post.category}</span>
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
									<h2 className="text-lg font-semibold text-white leading-snug line-clamp-2 group-hover:text-white/90 transition-colors">
										{post.title}
									</h2>

									{/* Excerpt */}
									<p className="text-sm text-white/60 line-clamp-3">{post.excerpt}</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</SectionWrapper>

			{/* CTA Section */}
			<ContactPreview />
		</main>
	)
}

export const metadata = {
	title: 'Blog | Nounou Sciez',
	description: 'Découvrez les activités et moments de vie chez nounou à Sciez',
}
