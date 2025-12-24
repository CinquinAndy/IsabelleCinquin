import config from '@payload-config'
import { getPayload } from 'payload'
import { Footer } from '@/components/footer'
import { constructMetadata } from '@/lib/metadata'

export async function generateMetadata() {
	const payload = await getPayload({ config })
	const landing = await payload.findGlobal({
		slug: 'landing',
		depth: 1,
	})

	return constructMetadata({
		seo: landing.seo as any,
	})
}

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

	return (
		<>
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
