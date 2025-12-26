import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Blog Petite Enfance | Conseils Nounou - Isabelle Cinquin',
	description: 'Découvrez nos articles : activités manuelles, recettes pour enfants, jeux d\'éveil, conseils éducatifs. Par Isabelle Cinquin, nounou à Sciez depuis 20+ ans.',
	keywords: [
		'blog petite enfance',
		'activités enfants',
		'recettes enfants',
		'conseils nounou',
		'éveil bébé',
		'jeux éducatifs',
		'idées activités manuelles',
		'blog assistante maternelle'
	],
	openGraph: {
		title: 'Blog Petite Enfance - Nounou Sciez',
		description: 'Articles et conseils sur la garde d\'enfants par une assistante maternelle expérimentée',
		type: 'website',
		url: 'https://isabelle-cinquin.fr/blog',
	},
	alternates: {
		canonical: 'https://isabelle-cinquin.fr/blog',
	},
}

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

	return <BlogPageClient posts={displayPosts} landing={landing} />
}
