// Seed script for Blog content (Categories and Posts)
// Run with: bun run src/scripts/seed-blog.ts

import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import config from '../payload.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function uploadMedia(payload: ReturnType<typeof getPayload> extends Promise<infer T> ? T : never, fileName: string, alt: string) {
	const filePath = path.resolve(__dirname, '../../public', fileName)
	if (!fs.existsSync(filePath)) {
		console.warn(`⚠️ File not found: ${filePath}`)
		return null
	}

	const fileBuffer = fs.readFileSync(filePath)

	// Check if media already exists
	const existingMedia = await payload.find({
		collection: 'media',
		where: {
			filename: { equals: fileName },
		},
		limit: 1,
	})

	if (existingMedia.docs.length > 0) {
		return existingMedia.docs[0]
	}

	const media = await payload.create({
		collection: 'media',
		data: {
			alt,
		},
		file: {
			data: fileBuffer,
			name: fileName,
			mimetype: fileName.endsWith('.png') ? 'image/png' : 'image/jpeg',
			size: fileBuffer.length,
		},
	})
	return media
}

// Categories to seed
const categoriesToSeed = [
	{ name: 'Créativité', slug: 'creativite' },
	{ name: 'Extérieur', slug: 'exterieur' },
	{ name: 'Éveil', slug: 'eveil' },
	{ name: 'Actualités', slug: 'actualites' },
	{ name: 'Conseils', slug: 'conseils' },
]

// Posts to seed (using placeholder images from Unsplash)
const postsToSeed = [
	{
		title: 'Activités manuelles créatives',
		slug: 'activites-manuelles',
		excerpt: 'Peinture, dessin, pâte à modeler, sable magique... Des activités pour développer la créativité des enfants !',
		categorySlug: 'creativite',
		content: [
			"Chez nounou, nous accordons une grande importance aux activités manuelles. Elles permettent aux enfants de développer leur créativité tout en s'amusant !",
			"Peinture, dessin, pâte à modeler, sable magique... Les possibilités sont infinies ! Chaque activité est adaptée à l'âge et aux capacités de l'enfant, pour qu'il puisse s'épanouir à son rythme.",
			"Ces moments créatifs sont aussi l'occasion de travailler la motricité fine, d'apprendre les couleurs, les formes, et de développer la patience et la concentration.",
			"Les enfants adorent ramener leurs créations à la maison pour les montrer à Papa et Maman. C'est toujours un moment de fierté pour eux !",
		],
		isImportant: true,
		publishedAt: '2024-01-15T10:00:00.000Z',
	},
	{
		title: 'Promenades au lac Léman',
		slug: 'promenades-lac',
		excerpt: "Découverte de la nature, observation des canards, jeux au bord de l'eau dans un cadre magnifique.",
		categorySlug: 'exterieur',
		content: [
			'La maison est située au bord du magnifique lac Léman, ce qui offre un cadre exceptionnel pour les promenades avec les enfants.',
			"Nous partons régulièrement à la découverte de la nature : observation des canards, des cygnes, des poissons... Les enfants apprennent à respecter l'environnement tout en s'émerveillant.",
			"Ces sorties sont l'occasion de faire de l'exercice, de respirer l'air frais et de profiter des différentes saisons. Chaque période de l'année offre ses propres merveilles !",
			"Les plus grands peuvent même jouer au bord de l'eau (sous surveillance bien sûr), ramasser des cailloux ou simplement profiter du paysage.",
		],
		isImportant: true,
		publishedAt: '2024-01-10T14:00:00.000Z',
	},
	{
		title: 'Jeux et éveil musical',
		slug: 'jeux-eveil',
		excerpt: 'Comptines, instruments de musique, danse... Pour éveiller les sens et passer de bons moments.',
		categorySlug: 'eveil',
		content: [
			'La musique occupe une place importante dans notre quotidien ! Les comptines, les instruments et la danse rythment nos journées.',
			"Les enfants adorent chanter les comptines traditionnelles, mais aussi découvrir de nouvelles chansons. C'est un excellent moyen de développer le langage et la mémoire.",
			"Nous avons également à disposition différents instruments adaptés aux tout-petits : maracas, tambourin, xylophone, clochettes... De quoi éveiller l'oreille musicale !",
			'Ces moments musicaux sont aussi très appréciés pour le rituel du calme avant la sieste ou pour accompagner certaines activités.',
		],
		isImportant: true,
		publishedAt: '2024-01-05T09:00:00.000Z',
	},
	{
		title: 'La lecture avec les petits',
		slug: 'lecture-petits',
		excerpt: 'Histoires du soir, livres imagés, contes... Des moments de calme et de partage autour des livres.',
		categorySlug: 'eveil',
		content: [
			"La lecture est un moment privilégié chez nounou. Nous avons une belle collection de livres adaptés à tous les âges.",
			"Les histoires permettent de développer le vocabulaire, l'imagination et de créer des moments de calme appréciés.",
			"Les enfants adorent choisir leurs livres préférés et demander la même histoire encore et encore !",
			"C'est aussi l'occasion de parler des émotions, des couleurs, des animaux et de plein d'autres sujets.",
		],
		isImportant: false,
		publishedAt: '2024-01-02T11:00:00.000Z',
	},
	{
		title: 'Jeux en plein air',
		slug: 'jeux-plein-air',
		excerpt: 'Toboggan, balançoire, bac à sable... Le jardin est un terrain de jeu idéal pour les enfants.',
		categorySlug: 'exterieur',
		content: [
			"Le jardin de la maison est un véritable paradis pour les enfants ! Toboggan, balançoire, bac à sable...",
			"Dès que le temps le permet, nous sortons profiter de l'extérieur. Les enfants peuvent courir, grimper, et explorer en toute sécurité.",
			"En été, la pataugeoire fait le bonheur des petits ! Un moment de fraîcheur très apprécié.",
			"Les jeux en plein air sont essentiels pour le développement moteur et le bien-être des enfants.",
		],
		isImportant: false,
		publishedAt: '2023-12-28T10:00:00.000Z',
	},
	{
		title: 'Cuisine avec les enfants',
		slug: 'cuisine-enfants',
		excerpt: "Gâteaux, biscuits, pizzas maison... Apprendre en s'amusant et déguster ensemble.",
		categorySlug: 'creativite',
		content: [
			"La cuisine est une activité très appréciée ! Les enfants adorent mettre la main à la pâte.",
			"Nous préparons ensemble des gâteaux, des biscuits, des pizzas... C'est l'occasion d'apprendre les quantités, les textures, et de développer la motricité.",
			"Le meilleur moment ? La dégustation bien sûr ! Les enfants sont toujours très fiers de goûter ce qu'ils ont préparé.",
			"C'est aussi l'occasion de parler de l'alimentation, de la provenance des aliments et de l'importance de bien manger.",
		],
		isImportant: false,
		publishedAt: '2023-12-20T15:00:00.000Z',
	},
]

// Helper to create rich text structure
function createRichTextContent(paragraphs: string[]) {
	return {
		root: {
			type: 'root',
			children: paragraphs.map(text => ({
				type: 'paragraph',
				version: 1,
				children: [
					{
						type: 'text',
						text,
						version: 1,
					},
				],
			})),
			direction: 'ltr',
			format: '',
			indent: 0,
			version: 1,
		},
	}
}

async function seedBlog() {
	console.log('🌱 Starting Blog seed...')

	const payload = await getPayload({ config })

	// Use a placeholder image (isabelle.jpg) for posts
	console.log('📸 Preparing featured image...')
	const featuredImage = await uploadMedia(payload, 'isabelle.jpg', 'Image article de blog')

	// Seed categories
	console.log('📁 Seeding categories...')
	const categoryMap: Record<string, string> = {}

	for (const cat of categoriesToSeed) {
		// Check if category exists
		const existing = await payload.find({
			collection: 'categories',
			where: { slug: { equals: cat.slug } },
			limit: 1,
		})

		if (existing.docs.length > 0) {
			categoryMap[cat.slug] = existing.docs[0].id
			console.log(`  ✓ Category "${cat.name}" already exists`)
		} else {
			const created = await payload.create({
				collection: 'categories',
				data: cat,
			})
			categoryMap[cat.slug] = created.id
			console.log(`  + Created category "${cat.name}"`)
		}
	}

	// Seed posts
	console.log('📝 Seeding posts...')
	for (const post of postsToSeed) {
		// Check if post exists
		const existing = await payload.find({
			collection: 'posts',
			where: { slug: { equals: post.slug } },
			limit: 1,
		})

		if (existing.docs.length > 0) {
			console.log(`  ✓ Post "${post.title}" already exists`)
			continue
		}

		const categoryId = categoryMap[post.categorySlug]
		if (!categoryId) {
			console.warn(`  ⚠️ Category not found for post "${post.title}"`)
			continue
		}

		await payload.create({
			collection: 'posts',
			data: {
				title: post.title,
				slug: post.slug,
				excerpt: post.excerpt,
				content: createRichTextContent(post.content),
				featuredImage: featuredImage?.id,
				categories: [categoryId],
				isImportant: post.isImportant,
				status: 'published',
				publishedAt: post.publishedAt,
			},
		})
		console.log(`  + Created post "${post.title}"`)
	}

	console.log('✅ Blog seed completed!')
	process.exit(0)
}

seedBlog().catch(error => {
	console.error('❌ Seed failed:', error)
	process.exit(1)
})
