import config from '@payload-config'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { getPayload } from 'payload'
import { AvailabilityBanner } from '@/components/availability-banner'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import type { SeoData } from '@/lib/metadata'
import { constructMetadata } from '@/lib/metadata'
import { ContactPageClient } from '../../../components/contact-page-client'

export async function generateMetadata() {
	const payload = await getPayload({ config })
	const seoGlobal = await payload.findGlobal({
		slug: 'seo',
	})

	return constructMetadata({
		seo: seoGlobal.contact?.seo as SeoData,
		fallbackTitle: 'Contact | Nounou Sciez',
		fallbackDescription:
			'Contactez Isabelle Cinquin, assistante maternelle à Sciez. Formulaire de contact, téléphone, email et localisation.',
	})
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

			<Header />

			<ContactPageClient settings={settings} />

			<Footer settings={settings} />
		</>
	)
}
