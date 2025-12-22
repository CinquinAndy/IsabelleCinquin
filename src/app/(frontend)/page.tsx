import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import { AboutSection } from '@/components/about-section'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import {
	Activities,
	Adaptation,
	Charter,
	ContactPreview,
	DailySchedule,
	Equipment,
	Family,
	LivingPlace,
	Objectives,
	Organization,
	Sleep,
	Trainings,
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
			<Header />

			<Hero>
				<div className="text-center px-4 w-full h-full flex flex-col items-center justify-center relative">
					<Image
						src="/bear.png"
						alt="Mask Deco"
						width={1600}
						height={1600}
						className="absolute bottom-0 left-1/2 -translate-x-100 -z-10 translate-y-100"
					/>
					<h1 className="mb-4 text-5xl md:text-7xl font-bold text-white drop-shadow-lg z-10">Isabelle Cinquin</h1>
					<p className="text-xl md:text-2xl text-white/90 drop-shadow-md max-w-2xl mx-auto z-10">
						Assistante Maternelle au bord du Lac Léman
					</p>
					<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center z-10">
						<Link
							href="#contact"
							className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-primary shadow-lg transition-all hover:bg-white/90 hover:scale-105"
						>
							Me contacter
						</Link>
						<Link
							href="#presentation"
							className="inline-flex items-center justify-center rounded-full border-2 border-white/50 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
						>
							En savoir plus
						</Link>
					</div>
				</div>
			</Hero>

			<AboutSection />

			<Family
				members={
					landing?.familyMembers?.length
						? landing.familyMembers
						: [
								// Isabelle (moi, Maman, et nounou)
								{
									id: '1',
									firstName: 'Isabelle',
									description: '(moi, Maman, et nounou)',
									image: { url: '/isabelle.jpg', alt: 'Photo Isabelle' } as any,
								},
								// Frederic (mari)
								{
									id: '6',
									firstName: 'Frederic',
									description: 'Mari de nounou depuis 27 ans',
									image: { url: '/frederic.jpg', alt: 'Photo Frederic' } as any,
								},
								// Andy (ingénieur)
								{
									id: '3',
									firstName: 'Andy',
									description: 'Le plus grand, et ingénieur en Informatique',
									image: { url: '/andy.jpg', alt: 'Photo Andy' } as any,
									link: 'https://andy-cinquin.fr/',
								},
								// Orlane (Maitresse des écoles)
								{
									id: '8',
									firstName: 'Orlane',
									description: 'Maîtresse des écoles',
									image: { url: '/orlane.jpg', alt: 'Photo Orlane' } as any,
								},
								// Maeva (maquilleuse)
								{
									id: '2',
									firstName: 'Maeva',
									description: 'Maquilleuse professionnelle',
									image: { url: '/maeva.jpg', alt: 'Photo Maeva' } as any,
									link: 'https://cinquin-maeva.com/',
								},
								// Kylian (petit dernier)
								{
									id: '7',
									firstName: 'Kylian',
									description: 'Le petit dernier de notre tribu',
									image: { url: '/kylian.jpg', alt: 'Photo Kylian' } as any,
								},
								// tagada (chat)
								{
									id: '4',
									firstName: 'Tagada',
									description: 'Un potit chat',
									image: { url: '/tagada.jpg', alt: 'Photo Tagada' } as any,
								},
								// sia (chat) 
								{
									id: '5',
									firstName: 'Sia',
									description: 'Un potit chat',
									image: { url: '/sia.jpg', alt: 'Photo Sia' } as any,
								},																
							]
				}
			/>

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
