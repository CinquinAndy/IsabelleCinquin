import { getPayload } from 'payload'
import config from '@payload-config'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Footer } from '@/components/footer'
import { AvailabilityBanner } from '@/components/availability-banner'
import {
	Introduction,
	Presentation,
	Family,
	Trainings,
	Sleep,
	LivingPlace,
	Equipment,
	Objectives,
	Adaptation,
	Organization,
	DailySchedule,
	Activities,
	Charter,
	ContactPreview,
} from '@/components/sections'
import type { Media } from '@/payload-types'

// Temporary types until payload generate:types is run
interface LandingData {
	introduction?: { title?: string | null; content?: unknown; image?: Media | number | null }
	presentation?: { content?: unknown; agreementInfo?: string | null }
	familyMembers?: {
		id?: string
		image?: Media | number | null
		firstName: string
		lastName?: string | null
		description: string
		link?: string | null
	}[]
	trainings?: { id?: string; title: string; period?: string | null; description?: string | null }[]
	sleep?: { content?: unknown }
	livingPlace?: { content?: unknown; images?: { id?: string; image?: Media | number | null }[] }
	equipment?: { id?: string; name: string; quantity?: number | null }[]
	objectives?: { id?: string; title: string; icon?: string | null; content?: unknown }[]
	adaptation?: { content?: unknown }
	organization?: {
		bagItems?: { id?: string; item: string }[]
		bagImage?: Media | number | null
		nounouItems?: { id?: string; item: string }[]
		nounouImage?: Media | number | null
	}
	dailySchedule?: { id?: string; time?: string | null; activity: string }[]
	charter?: { id?: string; ruleNumber: number; title?: string | null; content?: unknown }[]
	settings?: {
		isAvailable?: boolean | null
		unavailableMessage?: string | null
		returnDate?: string | null
		email?: string | null
		phone?: string | null
		landline?: string | null
		address?: string | null
		nounouTopLink?: string | null
		openingHours?: string | null
		mapLat?: number | null
		mapLng?: number | null
	}
}

interface Post {
	id: number
	title: string
	slug: string
	excerpt: string
	featuredImage?: Media | number | null
	publishedAt?: string | null
}

async function getLandingData(): Promise<LandingData | null> {
	try {
		const payload = await getPayload({ config })
		// @ts-expect-error - landing global not in generated types yet
		const landing = await payload.findGlobal({ slug: 'landing' })
		return landing as LandingData
	} catch {
		return null
	}
}

async function getImportantPosts(): Promise<Post[]> {
	try {
		const payload = await getPayload({ config })
		const posts = await payload.find({
			// @ts-expect-error - posts collection not in generated types yet
			collection: 'posts',
			where: {
				isImportant: { equals: true },
				status: { equals: 'published' },
			},
			limit: 6,
			sort: '-publishedAt',
		})
		return posts.docs as unknown as Post[]
	} catch {
		return []
	}
}

export default async function HomePage() {
	const [landing, importantPosts] = await Promise.all([getLandingData(), getImportantPosts()])

	const settings = landing?.settings

	return (
		<>
			{settings && (
				<AvailabilityBanner
					isAvailable={settings.isAvailable ?? true}
					message={settings.unavailableMessage}
					returnDate={settings.returnDate}
				/>
			)}

			<Header />

			<Hero>
				<div className="text-center px-4">
					<h1 className="mb-4 text-5xl md:text-7xl font-bold text-white drop-shadow-lg">Nounou Sciez</h1>
					<p className="text-xl md:text-2xl text-white/90 drop-shadow-md max-w-2xl mx-auto">
						Isabelle Cinquin - Assistante Maternelle
					</p>
					<p className="mt-4 text-lg text-white/80 drop-shadow-md">
						Un accueil chaleureux pour vos enfants au bord du Lac Léman
					</p>
					<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
						<a
							href="#contact"
							className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-primary shadow-lg transition-all hover:bg-white/90 hover:scale-105"
						>
							Me contacter
						</a>
						<a
							href="#introduction"
							className="inline-flex items-center justify-center rounded-full border-2 border-white/50 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
						>
							En savoir plus
						</a>
					</div>
				</div>
			</Hero>

			<Introduction
				title={landing?.introduction?.title}
				content={landing?.introduction?.content}
				image={landing?.introduction?.image}
			/>

			<Presentation content={landing?.presentation?.content} agreementInfo={landing?.presentation?.agreementInfo} />

			<Family members={landing?.familyMembers} />

			<Trainings trainings={landing?.trainings} />

			<Sleep content={landing?.sleep?.content} />

			<LivingPlace content={landing?.livingPlace?.content} images={landing?.livingPlace?.images} />

			<Equipment equipment={landing?.equipment} />

			<Objectives objectives={landing?.objectives} />

			<Adaptation content={landing?.adaptation?.content} />

			<Organization
				bagItems={landing?.organization?.bagItems}
				bagImage={landing?.organization?.bagImage}
				nounouItems={landing?.organization?.nounouItems}
				nounouImage={landing?.organization?.nounouImage}
			/>

			<DailySchedule schedule={landing?.dailySchedule} />

			<Activities posts={importantPosts} />

			<Charter rules={landing?.charter} />

			<ContactPreview
				email={settings?.email}
				phone={settings?.phone}
				landline={settings?.landline}
				address={settings?.address}
			/>

			<Footer settings={settings} />
		</>
	)
}
