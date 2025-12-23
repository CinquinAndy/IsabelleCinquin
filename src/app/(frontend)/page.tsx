import config from '@payload-config'
import { getPayload } from 'payload'
import { Footer } from '@/components/footer'
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
			<Hero hero={landing?.hero} />

			<AboutSection about={landing?.about} />

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
