import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export const metadata: Metadata = {
	title: 'Mentions légales',
	description: 'Mentions légales du site isabelle-cinquin.fr',
}

export default function MentionsLegalesPage() {
	return (
		<>
			<Header />

			<main className="min-h-screen">
				{/* Hero section */}
				<section className="section-primary pt-32 pb-16 px-4">
					<div className="max-w-3xl mx-auto">
						<Link
							href="/"
							className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
						>
							<ArrowLeft className="w-4 h-4" />
							Retour à l'accueil
						</Link>

						<h1 className="text-4xl md:text-5xl font-bold">Mentions légales</h1>
					</div>
				</section>

				{/* Content */}
				<section className="section-secondary py-16 px-4">
					<div className="max-w-3xl mx-auto prose prose-invert prose-lg">
						<h2>Droit d'auteur</h2>
						<p>
							L'ensemble de ce site est soumis à une protection de droits d'auteur selon les Articles L335-2 et suivants
							du Code de la propriété intellectuelle.
						</p>
						<p>
							Toute reproduction ou représentation totale ou partielle de son contenu, images, textes, sons, par quelque
							procédé utilisé, sans l'autorisation préalable de la société 'Cinquin Andy', est interdite. Toute
							violation constituera une sanction et fera l'objet de poursuite.
						</p>

						<h2>Site internet</h2>
						<div className="bg-white/10 rounded-xl p-6 not-prose">
							<p className="font-bold text-lg mb-4">Développeur</p>
							<p>Cinquin Andy</p>
							<p>SIRET : 880 505 276 00019</p>
							<p>72 avenue Camus</p>
							<p>44000 Nantes</p>
							<p>Tél : 06 21 58 26 84</p>
							<p className="mt-2">
								<a
									href="https://andy-cinquin.fr"
									target="_blank"
									rel="noopener noreferrer"
									className="text-accent hover:underline"
								>
									https://andy-cinquin.fr
								</a>
							</p>
						</div>

						<h2>Nounou</h2>
						<div className="bg-white/10 rounded-xl p-6 not-prose">
							<p className="font-bold text-lg mb-4">Assistante maternelle</p>
							<p>Cinquin Isabelle</p>
							<p>1250 chemin de la Renouillère</p>
							<p>74140 Sciez</p>
							<p>Tél : 06 03 28 69 06</p>
						</div>

						<h2>Hébergement</h2>
						<p>Ce site est hébergé par Vercel Inc., situé 340 S Lemon Ave #4133, Walnut, CA 91789, USA.</p>

						<h2>Collecte de données personnelles</h2>
						<p>
							Les informations collectées via le formulaire de contact (nom, email, téléphone, message) sont uniquement
							utilisées pour répondre à vos demandes. Elles ne sont ni vendues ni transmises à des tiers.
						</p>
						<p>
							Conformément à la loi « Informatique et Libertés » et au RGPD, vous disposez d'un droit d'accès, de
							rectification et de suppression de vos données. Pour exercer ce droit, contactez-nous à l'adresse email
							indiquée sur le site.
						</p>

						<h2>Cookies</h2>
						<p>
							Ce site utilise des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie de tracking
							publicitaire n'est utilisé.
						</p>
					</div>
				</section>
			</main>

			<Footer />
		</>
	)
}
