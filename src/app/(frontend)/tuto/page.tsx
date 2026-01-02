import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { TutoPageClient } from './tuto-page-client'

export const metadata: Metadata = {
	title: "Guide d'Utilisation",
	description:
		"Apprenez à gérer le site avec Payload CMS : créer des articles, optimiser le SEO, gérer les médias et modifier la landing page.",
}

export default async function TutoPage() {
	const cookieStore = await cookies()
	const payloadToken = cookieStore.get('payload-token')

	if (!payloadToken || !payloadToken.value) {
		redirect('/admin')
	}

	return <TutoPageClient />
}
