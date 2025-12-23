import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import { AboutSection } from '@/components/about-section'
import { Footer } from '@/components/footer'
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

import type { Landing, Post } from '@/payload-types'

async function getLandingData(): Promise<Landing | null> {
	try {
		const payload = await getPayload({ config })
		const landing = await payload.findGlobal({ slug: 'landing' })
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
							href="/contact"
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
									image: { url: '/isabelle.jpg', alt: 'Photo Isabelle' },
								},
								// Frederic (mari)
								{
									id: '6',
									firstName: 'Frederic',
									description: 'Mari de nounou depuis 27 ans',
									image: { url: '/frederic.jpg', alt: 'Photo Frederic' },
								},
								// Andy (ingénieur)
								{
									id: '3',
									firstName: 'Andy',
									description: 'Le plus grand, et ingénieur en Informatique',
									image: { url: '/andy.jpg', alt: 'Photo Andy' },
									link: 'https://andy-cinquin.fr/',
								},
								// Orlane (Maitresse des écoles)
								{
									id: '8',
									firstName: 'Orlane',
									description: 'Maîtresse des écoles',
									image: { url: '/orlane.jpg', alt: 'Photo Orlane' },
								},
								// Maeva (maquilleuse)
								{
									id: '2',
									firstName: 'Maeva',
									description: 'Maquilleuse professionnelle',
									image: { url: '/maeva.jpg', alt: 'Photo Maeva' },
									link: 'https://cinquin-maeva.com/',
								},
								// Kylian (petit dernier)
								{
									id: '7',
									firstName: 'Kylian',
									description: 'Le petit dernier de notre tribu',
									image: { url: '/kylian.jpg', alt: 'Photo Kylian' },
								},
								// tagada (chat)
								{
									id: '4',
									firstName: 'Tagada',
									description: 'Un potit chat',
									image: { url: '/tagada.jpg', alt: 'Photo Tagada' },
								},
								// sia (chat)
								{
									id: '5',
									firstName: 'Sia',
									description: 'Un potit chat',
									image: { url: '/sia.jpg', alt: 'Photo Sia' },
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
