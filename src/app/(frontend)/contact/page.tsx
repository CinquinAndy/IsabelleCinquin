import config from '@payload-config'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import { AvailabilityBanner } from '@/components/availability-banner'
import { Footer } from '@/components/footer'

import { ContactPageClient } from '../../../components/contact-page-client'

export const metadata: Metadata = {
	title: 'Contact | Isabelle Cinquin - Nounou Sciez (74)',
	description:
		'Contactez Isabelle, nounou agréée à Sciez. Disponibilités, tarifs, visite de la maison. Réponse rapide par téléphone ou email.',
	keywords: [
		'contact nounou sciez',
		'contacter assistante maternelle',
		'rendez-vous nounou',
		'disponibilités garde enfants sciez',
		'contact nounou 74',
	],
	openGraph: {
		title: 'Contact - Isabelle Cinquin',
		description: 'Contactez-moi pour accueillir vos enfants à Sciez',
		type: 'website',
		url: 'https://isabelle-cinquin.fr/contact',
	},
	alternates: {
		canonical: 'https://isabelle-cinquin.fr/contact',
	},
}

interface Settings {
	isAvailable?: boolean | null
	unavailableMessage?: SerializedEditorState | null
	email?: string | null
	phone?: string | null
	landline?: string | null
	address?: string | null
	nounouTopLink?: string | null
	openingHours?: string | null
	mapLat?: number | null
	mapLng?: number | null
}

async function getLandingSettings(): Promise<Settings | null> {
	try {
		const payload = await getPayload({ config })
		const landing = await payload.findGlobal({ slug: 'landing' })
		return (landing as { settings?: Settings })?.settings ?? null
	} catch {
		return null
	}
}

export default async function ContactPage() {
	const settings = await getLandingSettings()

	return (
		<>
			{settings && (
				<AvailabilityBanner isAvailable={settings.isAvailable ?? true} message={settings.unavailableMessage} />
			)}



			<ContactPageClient settings={settings} />

			<Footer settings={settings} />
		</>
	)
}
