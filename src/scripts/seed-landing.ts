// Seed script for Landing page content
// Run with: bun run src/scripts/seed-landing.ts

import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import config from '../payload.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function uploadMedia(payload: any, fileName: string, alt: string) {
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

/**
 * Seed script to populate the Landing global with all default content
 */

async function seedLanding() {
	console.log('🌱 Starting Landing page seed...')

	const payload = await getPayload({ config })

	// Upload images
	console.log('📸 Uploading images...')
	const aboutImage = await uploadMedia(payload, 'isabelle.jpg', 'Isabelle Cinquin')
	const bagImage = await uploadMedia(payload, 'sac-langer.png', 'Sac à langer')
	const nounouImage = await uploadMedia(payload, 'chez-nounou.png', 'Chez Nounou')

	// Update the Landing global with all default content
	await payload.updateGlobal({
		slug: 'landing',
		data: {
			// ==================== SECTION À PROPOS ====================
			hero: {
				title: 'Isabelle Cinquin',
				subtitle: 'Assistante Maternelle au bord du Lac Léman',
				buttons: [
					{ text: 'Me contacter', url: '/contact', variant: 'primary' },
					{ text: 'En savoir plus', url: '#presentation', variant: 'secondary' },
				],
			},
			about: {
				badge: 'À propos',
				title: 'Nounou sur Sciez',
				titleAccent: 'depuis 2003',
				image: aboutImage ? aboutImage.id : undefined,
				// We need to construct the rich text structure properly
				content: {
					root: {
						type: 'root',
						children: [
							{
								type: 'paragraph',
								version: 1,
								children: [
									{
										type: 'text',
										text: "Je suis assistante maternelle agréée sur la commune de Sciez (74), au bord du magnifique Lac Léman. J'ai fait une pause de 10 ans (2008-2018) pour travailler avec mon mari, puis j'ai repris mon activité avec toujours autant de passion.",
										version: 1,
									},
								],
							},
							{
								type: 'paragraph',
								version: 1,
								children: [
									{
										type: 'text',
										text: "J'accueille vos enfants chez moi, dans une ambiance familiale et chaleureuse. Chaque petit bout reçoit un accueil personnalisé, adapté à son rythme et à ses besoins.",
										version: 1,
									},
								],
							},
						],
						direction: 'ltr',
						format: '',
						indent: 0,
						version: 1,
					},
				},
				stats: [
					{ label: 'enfants le jour', value: 3 },
					{ label: 'enfant la nuit', value: 1 },
					{ label: "années d'expérience", value: 20, suffix: '+' },
				],
			},

			// ==================== SECTION INTRODUCTION ====================
			introduction: {
				title: "Livret d'Accueil de Nounou",
				content: {
					root: {
						type: 'root',
						children: [
							{
								type: 'paragraph',
								version: 1,
								children: [
									{
										type: 'text',
										text: "Après plusieurs années de bonheur avec les enfants et afin de donner au livret d'accueil un second souffle, mon fils m'a proposé de le convertir en site internet.",
										version: 1,
									},
								],
							},
							{
								type: 'paragraph',
								version: 1,
								children: [
									{
										type: 'text',
										text: "La relation nounou – Parents est basée sur un partenariat : Ensemble nous veillons sur le bien-être et l'éveil de l'enfant.",
										version: 1,
									},
								],
							},
						],
						direction: 'ltr',
						format: '',
						indent: 0,
						version: 1,
					},
				},
			},

			// ==================== SECTION PRESENTATION ====================
			presentation: {
				title: 'Ma présentation',
				agreementInfo:
					"Mon agrément me permet d'accueillir 3 enfants le jour de 7h à 19h et un enfant la nuit de 18h à 7h.",
			},

			// ==================== SECTION FORMATIONS ====================
			trainingsSection: {
				title: 'Mes formations',
				items: [
					{
						title: 'CAP Petite Enfance (AEPE)',
						period: '2018 - 2020',
						description:
							"120 heures de formation - CAP Accompagnant(e) éducatif petite enfance. Formation complète pour l'accueil et l'accompagnement des tout-petits.",
					},
					{
						title: 'Sauveteur Secouriste du Travail',
						period: 'Formation continue',
						description:
							'Formation SST - Premiers secours adaptés aux situations avec les enfants. Recyclage régulier.',
					},
				],
			},

			// ==================== SECTION SOMMEIL ====================
			sleep: {
				title: 'Le sommeil',
				subtitle: 'Les siestes',
				tags: [{ text: 'Confort' }, { text: 'Sérénité' }, { text: 'Calme' }],
			},

			// ==================== SECTION LIEU DE VIE ====================
			livingPlace: {
				title: 'Lieu de vie',
				description: "J'accueille vos enfants dans une maison clôturée avec jardin qui se situe au bord du Lac Léman.",
			},

			// ==================== SECTION EQUIPEMENTS ====================
			equipmentSection: {
				title: 'Les équipements',
				subtitle: 'Tout le matériel nécessaire pour accueillir vos enfants',
				items: [
					{ name: 'Poussettes simples et doubles', quantity: 2 },
					{ name: 'Chaises haute', quantity: 4 },
					{ name: 'Transat', quantity: 1 },
					{ name: 'Table à langer', quantity: 1 },
					{ name: 'Lits en bois à barreau', quantity: 3 },
					{ name: 'Sièges auto isofix bébé confort', quantity: 2 },
				],
			},

			// ==================== SECTION OBJECTIFS ====================
			objectivesSection: {
				title: 'Mes objectifs',
				subtitle: "Ce qui est important pour moi dans l'accompagnement de vos enfants",
				items: [
					{ title: "L'éveil", description: 'Stimuler la curiosité et les sens', icon: 'star' },
					{ title: 'Le respect', description: 'Apprendre à vivre ensemble', icon: 'heart-pulse' },
					{ title: "L'alimentation", description: 'Repas équilibrés et variés', icon: 'utensils' },
					{ title: 'Les soins', description: 'Hygiène et bien-être', icon: 'hand-helping' },
					{ title: 'La sécurité', description: 'Environnement protégé', icon: 'shield-check' },
				],
			},

			// ==================== SECTION ADAPTATION ====================
			adaptation: {
				title: "Période d'adaptation",
				subtitle:
					"Une période importante pour permettre à l'enfant, aux parents, et à nounou de faire connaissance en douceur.",
				keyMessage:
					"La clé d'un accueil réussi : une confiance mutuelle et un dialogue permanent entre les parents et la nounou.",
				badges: [
					{ text: 'Confiance mutuelle', color: 'pink' },
					{ text: 'Dialogue permanent', color: 'violet' },
					{ text: 'Écoute attentive', color: 'amber' },
					{ text: 'Patience et douceur', color: 'emerald' },
				],
			},

			// ==================== SECTION ORGANISATION ====================
			organization: {
				title: 'Organisation des affaires',
				subtitle: "Glissez pour comparer ce qu'il faut apporter et ce qui est fourni",
				bagImage: bagImage ? bagImage.id : undefined,
				nounouImage: nounouImage ? nounouImage.id : undefined,
				bagItems: [
					{ item: 'Le carnet de santé' },
					{ item: 'Des vêtements de rechange' },
					{ item: 'Doudou' },
					{ item: 'Des tétines' },
					{ item: 'De la crème solaire' },
				],
				nounouItems: [
					{ item: 'Des couches' },
					{ item: 'Un biberon' },
					{ item: 'Du lait' },
					{ item: 'Une turbulette' },
					{ item: 'Des chaussons' },
				],
			},

			// ==================== SECTION JOURNÉE TYPE ====================
			dailyScheduleSection: {
				title: "Organisation d'une journée",
				subtitle: 'Comment se déroule une journée type chez nounou',
				items: [
					{
						time: 'Matin',
						activity: 'Arrivée en douceur, transmission avec les parents, petit déjeuner et petit câlin',
					},
					{ time: '9h', activity: "Accompagnement du fils de nounou à l'école" },
					{
						time: 'Matinée',
						activity:
							'Sieste pour les plus petits, jeux et activités (dessins, peinture, sable magique) pour les plus grands',
					},
					{ time: '11h30', activity: 'Promenade vers le lac ou visite au relais de nounou pour mettre en appétit' },
					{ time: '12h', activity: 'Repas pour tous' },
					{ time: '13h30', activity: 'Changements de couches puis sieste' },
					{ time: '15h30', activity: "Réveil en douceur, départ pour chercher le fils de nounou à l'école" },
					{ time: '16h', activity: 'Goûter puis jeux ou petite baignade dans la pataugeoire en été' },
					{ time: '17h', activity: "Jeux libres, lectures, comptines en attendant l'arrivée de Papa et Maman" },
				],
			},

			// ==================== SECTION CHARTE ====================
			charterSection: {
				title: 'Charte de vie',
				subtitle: 'Les règles de vie chez nounou, écrites du point de vue de votre enfant 💜',
				items: [
					{
						ruleNumber: 1,
						title: 'Ponctualité le matin',
						content:
							"Papa, Maman, il est important pour mon rythme et l'organisation de nounou d'arriver bien à l'heure chaque jour. En cas d'imprévu, merci de prévenir Nounou.",
					},
					{
						ruleNumber: 2,
						title: "Respect de l'espace",
						content:
							"Papa, Maman, pensez à bien rester à l'entrée. Car c'est moi qui vais crapahuter ici toute la journée.",
					},
					{
						ruleNumber: 3,
						title: 'Communication importante',
						content:
							"Papa, Maman, je suis trop jeune pour expliquer ma nuit, mon petit déj, le week-end... à nounou. Prenez 5 minutes pour tout raconter à nounou, cela va drôlement l'aider à s'occuper de moi toute cette nouvelle journée.",
					},
					{
						ruleNumber: 4,
						title: 'Arrivée préparée',
						content:
							"Papa, Maman, je me sens bien mieux quand j'arrive chez nounou habillé, débarbouillé, ma couche changée. Merci de respecter chaque jour ces petits gestes qui sont si agréables pour Nounou.",
					},
					{
						ruleNumber: 5,
						title: 'Questions bienvenues',
						content:
							"Papa, Maman, n'hésitez pas à poser à ma nounou des questions qui vous préoccupent concernant mon évolution, alimentation, sommeil, santé, ma vie ici chez nounou...",
					},
					{
						ruleNumber: 6,
						title: 'Santé et maladie',
						content:
							"Papa, Maman, si je suis malade avec de la fièvre, ne me mettez pas chez Nounou sans avoir pris le soin de m'emmener au préalable chez le docteur. Je reviendrais chez nounou avec le traitement adapté.",
					},
					{
						ruleNumber: 7,
						title: 'Lieu de vie privé',
						content:
							"Papa, Maman, n'oubliez pas, le lieu de travail de Nounou est aussi sa maison, c'est pour cela qu'il faut respecter son environnement et ne pas être trop envahissant.",
					},
					{
						ruleNumber: 8,
						title: 'Ponctualité le soir',
						content:
							"Papa et Maman, le soir, la ponctualité atténue mes angoisses. Pensez à prévenir Nounou d'un retard exceptionnel afin qu'elle puisse me rassurer et m'expliquer. En plus nounou n'est pas que nounou tout le temps, elle peut aussi avoir des rendez-vous persos !",
					},
					{
						ruleNumber: 9,
						title: 'Paiement régulier',
						content:
							"Tout travail mérite salaire, Papa, Maman, n'oubliez pas de payer Nounou, elle aussi, doit payer son loyer, ses charges...",
					},
				],
			},

			// ==================== SECTION CONTACT PREVIEW ====================
			contactSection: {
				title: 'Envie de me rencontrer ?',
				content: "N'hésitez pas à me contacter pour discuter de l'accueil de votre enfant",
			},

			// ==================== SETTINGS ====================
			settings: {
				isAvailable: true,
				email: 'andorma@gmail.com',
				phone: '06 03 28 69 06',
				landline: '04 50 72 81 92',
				address: '1250 Chemin de la Renouillère, 74140 Sciez',
				nounouTopLink: 'https://aide-au-top.fr/assistante-maternelle-sciez-74140-19',
				openingHours: '7h - 19h',
				mapLat: 46.349104,
				mapLng: 6.397748,
			},
		},
	})
	console.log('✅ Landing page seed completed!')
	process.exit(0)
}

seedLanding().catch(error => {
	console.error('❌ Seed failed:', error)
	process.exit(1)
})
