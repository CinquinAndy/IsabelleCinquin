import config from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
	// Title: 50-60 caractères pour Google
	title: 'Nounou Sciez | Isabelle Cinquin',

	// Description: 150-160 caractères optimisés
	description:
		"Nounou agréée à Sciez au bord du Lac Léman. Accueil chaleureux, activités d'éveil, repas maison. Maison avec jardin. Livret d'accueil disponible.",

	// Keywords pour contexte sémantique
	keywords: [
		'nounou sciez',
		'assistante maternelle sciez',
		'garde enfants 74',
		'nounou thonon',
		'assistante maternelle lac léman',
		'garde enfants haute savoie',
		'nounou agréée sciez',
		'assistante maternelle douvaine',
		'garde enfant anthy sur léman',
	],

	// Authors & Creator
	authors: [{ name: 'Isabelle Cinquin' }],
	creator: 'Isabelle Cinquin',
	publisher: 'Isabelle Cinquin',

	// Robots
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},

	// Open Graph (Facebook, LinkedIn, WhatsApp)
	openGraph: {
		type: 'website',
		locale: 'fr_FR',
		url: 'https://isabelle-cinquin.fr',
		siteName: 'Nounou Sciez - Isabelle Cinquin',
		title: 'Nounou Sciez | Isabelle Cinquin - Assistante Maternelle',
		description: "Accueil chaleureux au bord du Lac Léman. Maison avec jardin, activités d'éveil, repas maison.",
		images: [
			{
				url: 'https://isabelle-cinquin.fr/og-isa.webp',
				width: 1200,
				height: 630,
				alt: 'Isabelle Cinquin - Nounou à Sciez',
			},
		],
	},

	// Twitter Card
	twitter: {
		card: 'summary_large_image',
		title: 'Nounou Sciez | Isabelle Cinquin',
		description: 'Nounou agréée à Sciez - Accueil chaleureux au Lac Léman',
		images: ['https://isabelle-cinquin.fr/og-isa.webp'],
	},

	// Canonical URL
	alternates: {
		canonical: 'https://isabelle-cinquin.fr',
	},

	// Category
	category: 'childcare',
}

import { AvailabilityBanner } from '@/components/availability-banner'
import { Hero } from '@/components/hero'
import {
	AboutSection,
	Activities,
	Adaptation,
	Charter,
	ContactPreview,
	DailySchedule,
	Equipment,
	Family,
	Introduction,
	LivingPlace,
	Objectives,
	Organization,
	Sleep,
	Trainings,
} from '@/components/sections'

import type { Landing, Post } from '@/payload-types'

async function getLandingData(): Promise<Landing | null> {
	try {
		const payload = await getPayload({ config })
		const landing = await payload.findGlobal({ slug: 'landing', depth: 2 })
		return landing
	} catch {
		return null
	}
}

async function getImportantPosts(): Promise<Post[]> {
	try {
		const payload = await getPayload({ config })
		const posts = await payload.find({
			collection: 'posts',
			where: {
				isImportant: { equals: true },
				status: { equals: 'published' },
			},
			limit: 6,
			sort: '-publishedAt',
			depth: 2, // Populate featuredImage and categories relations
		})
		return posts.docs as unknown as Post[]
	} catch {
		return []
	}
}

export default async function HomePage() {
	const [landing, importantPosts] = await Promise.all([getLandingData(), getImportantPosts()])

	const settings = landing?.settings

	// Complete JSON-LD structured data for local business SEO
	const childCareSchema = {
		'@context': 'https://schema.org',
		'@type': 'ChildCare',
		'@id': 'https://isabelle-cinquin.fr/#childcare',
		name: 'Isabelle Cinquin - Nounou Sciez',
		alternateName: 'Nounou Sciez',
		description:
			"Assistante maternelle agréée offrant un accueil familial chaleureux à Sciez, au bord du Lac Léman. Maison avec jardin, activités d'éveil adaptées, repas faits maison.",

		// Images
		image: [
			'https://isabelle-cinquin.fr/og-isa.webp',
			'https://isabelle-cinquin.fr/images/jardin.jpg',
			'https://isabelle-cinquin.fr/images/activites.jpg',
		],
		logo: 'https://isabelle-cinquin.fr/logo.png',

		// Contact
		telephone: '+33603286906',
		email: 'andorma@gmail.com',
		url: 'https://isabelle-cinquin.fr',

		// Address (NAP crucial pour SEO local)
		address: {
			'@type': 'PostalAddress',
			streetAddress: '1250 Chemin de la Renouillère',
			addressLocality: 'Sciez',
			postalCode: '74140',
			addressRegion: 'Haute-Savoie',
			addressCountry: 'FR',
		},

		// Géolocalisation précise
		geo: {
			'@type': 'GeoCoordinates',
			latitude: 46.33333,
			longitude: 6.38333,
		},

		// Zones de service
		areaServed: [
			{
				'@type': 'City',
				name: 'Sciez',
			},
			{
				'@type': 'City',
				name: 'Thonon-les-Bains',
			},
			{
				'@type': 'City',
				name: 'Douvaine',
			},
			{
				'@type': 'City',
				name: 'Anthy-sur-Léman',
			},
			{
				'@type': 'City',
				name: 'Excenevex',
			},
		],

		// Horaires d'ouverture
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
				opens: '07:30',
				closes: '18:30',
			},
		],

		// Gamme de prix
		priceRange: '$$',

		// Liens externes
		sameAs: ['https://aide-au-top.fr/assistante-maternelle-sciez-74140-19'],

		// Services proposés
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Services de Garde',
			itemListElement: [
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: "Garde d'enfants à temps plein",
						description: 'Accueil de vos enfants du lundi au vendredi dans une maison avec jardin',
					},
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: "Activités d'éveil",
						description: 'Activités manuelles, jeux, éveil musical, sorties au lac',
					},
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Repas faits maison',
						description: 'Préparation de repas équilibrés avec produits frais',
					},
				},
			],
		},
	}

	// WebSite Schema pour sitelink search box
	const websiteSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': 'https://isabelle-cinquin.fr/#website',
		url: 'https://isabelle-cinquin.fr',
		name: 'Nounou Sciez - Isabelle Cinquin',
		description: "Site officiel d'Isabelle Cinquin, assistante maternelle agréée à Sciez",
		inLanguage: 'fr-FR',
	}

	// Person Schema
	const personSchema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': 'https://isabelle-cinquin.fr/#isabelle',
		name: 'Isabelle Cinquin',
		jobTitle: 'Assistante Maternelle Agréée',
		telephone: '+33603286906',
		email: 'andorma@gmail.com',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Sciez',
			postalCode: '74140',
			addressCountry: 'FR',
		},
	}

	return (
		<>
			{/* Multiple JSON-LD Schemas for comprehensive SEO */}
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(childCareSchema) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
			{landing?.settings && (
				<AvailabilityBanner
					isAvailable={landing.settings.isAvailable ?? true}
					message={landing.settings.unavailableMessage}
				/>
			)}

			<Hero hero={landing?.hero} />

			<Introduction introduction={landing?.introduction} />

			<AboutSection about={landing?.about} />

			<Family members={landing?.familyMembers} />

			<Trainings trainingsSection={landing?.trainingsSection} />

			<Sleep sleepSection={landing?.sleep} />

			<LivingPlace livingPlace={landing?.livingPlace} />

			<Equipment equipmentSection={landing?.equipmentSection} />

			<Objectives objectivesSection={landing?.objectivesSection} />

			<Adaptation adaptation={landing?.adaptation} />

			<Organization organization={landing?.organization} />

			<DailySchedule dailyScheduleSection={landing?.dailyScheduleSection} />

			<Activities posts={importantPosts} />

			<Charter charterSection={landing?.charterSection} />

			<ContactPreview
				phone={settings?.phone}
				title={landing?.contactSection?.title}
				content={landing?.contactSection?.content}
			/>

			<Footer settings={settings} />
		</>
	)
}
