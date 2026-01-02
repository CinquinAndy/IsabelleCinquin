import type { Metadata } from 'next'
import type React from 'react'
import '@/app/(frontend)/global.css'
import { Gluten, Nunito_Sans, Rock_Salt } from 'next/font/google'
import Script from 'next/script'
import { Header } from '@/components/header/header'
import { RefreshRouteOnSave } from '@/components/payload/refresh-route-on-save'
import { Toaster } from '@/components/ui/sonner'

const gluten = Gluten({
	subsets: ['latin'],
	variable: '--font-display',
	display: 'swap',
})

const nunitoSans = Nunito_Sans({
	subsets: ['latin'],
	variable: '--font-sans',
	display: 'swap',
})

const rockSalt = Rock_Salt({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-handwriting',
	display: 'swap',
})

export const metadata: Metadata = {
	metadataBase: new URL('https://isabelle-cinquin.fr'),
	title: {
		default: 'Nounou Sciez | Isabelle Cinquin',
		template: '%s | Isabelle Cinquin',
	},
	description:
		'Assistante maternelle à Sciez (74), proche de Thonon-les-Bains, Douvaine, Margencel. Accueil personnalisé et chaleureux pour vos enfants au bord du Lac Léman.',
	appleWebApp: {
		title: 'Isabelle Cinquin',
	},
}

export default async function RootLayout(props: { children: React.ReactNode }) {
	const { children } = props

	return (
		<html lang="fr" className={`${gluten.variable} ${nunitoSans.variable} ${rockSalt.variable}`}>
			<body>
				<RefreshRouteOnSave />
				<Header />
				<main>{children}</main>
				<Toaster />
				<Script
					defer
					src="https://umami.wadefade.fr/script.js"
					data-website-id="eedcc4f2-48f5-4372-8890-e1a69b7e8561"
					strategy="afterInteractive"
				/>
			</body>
		</html>
	)
}
