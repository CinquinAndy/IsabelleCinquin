import type { Metadata } from 'next'
import type React from 'react'
import '@/app/(frontend)/global.css'
import { Gluten, Nunito_Sans, Rock_Salt } from 'next/font/google'
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
				<main>{children}</main>
				<Toaster />
			</body>
		</html>
	)
}
