import configPromise from '@payload-config'
import Link from 'next/link'
import { getPayload } from 'payload'
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
		console.log('Using default posts')
	}

	// Use defaults if no CMS posts
	const displayPosts = posts.length > 0 ? posts : defaultPosts

	return (
		<main className="min-h-screen">
			<SectionWrapper variant="primary" className="pt-32 pb-16">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="space-y-4 px-4 mb-12">
						<h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
							Le <span className="font-handwriting text-white/80">Blog</span>
						</h1>
						<p className="text-lg text-white/70 max-w-2xl">
							Découvrez nos activités, nos sorties et tous les moments de bonheur partagés avec les enfants.
						</p>
					</div>

					{/* Decorative line */}
					<div className="border-b border-dashed border-white/20 mx-4 mb-8" />

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
		</main>
	)
}

export const metadata = {
	title: 'Blog | Nounou Sciez',
	description: 'Découvrez les activités et moments de vie chez nounou à Sciez',
}
