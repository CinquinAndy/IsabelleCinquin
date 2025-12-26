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
					<div className="max-w-4xl mx-auto">
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
					<div className="max-w-4xl mx-auto prose prose-invert prose-lg">
						<h2>Assistante maternelle</h2>
						<div className="bg-white/10 rounded-xl p-6 not-prose mb-6">
							<p className="font-bold text-lg mb-4">Cinquin Isabelle</p>
							<p>Assistante maternelle agréée</p>
							<p className="mt-3">1250 chemin de la Renouillère</p>
							<p>74140 Sciez</p>
							<p>France</p>
							<p className="mt-3">
								<strong>Téléphone :</strong> 06 03 28 69 06
							</p>
							<p>
								<strong>Responsable de publication :</strong> Isabelle Cinquin
							</p>
						</div>

						<h2>Agrément d'assistante maternelle</h2>
						<p>
							Isabelle Cinquin est assistante maternelle agréée par le Conseil Départemental de la Haute-Savoie. Cet
							agrément l'autorise à accueillir des enfants à son domicile dans le cadre de la garde d'enfants.
						</p>

						<h2>Hébergement du site</h2>
						<p>Ce site est hébergé par :</p>
						<div className="bg-white/10 rounded-xl p-6 not-prose mb-6">
							<p className="font-bold">netcup GmbH</p>
							<p>Daimlerstraße 25</p>
							<p>76185 Karlsruhe</p>
							<p>Allemagne</p>
						</div>

						<h2>Création du site internet</h2>
						<p>
							<strong>Conception, développement et design :</strong>
						</p>
						<div className="bg-white/10 rounded-xl p-6 not-prose mb-6">
							<p className="font-bold">Cinquin Andy</p>
							<p>SIRET : 880 505 276 00019</p>
							<p className="mt-3">4 Impasse de la Marchaisière</p>
							<p>44115 Haute-Goulaine</p>
							<p className="mt-3">
								<strong>Téléphone :</strong> 06 21 58 26 84
							</p>
							<p className="mt-3">
								<strong>Site web :</strong>{' '}
								<a
									href="https://andy-cinquin.fr"
									target="_blank"
									rel="noopener noreferrer"
									className="text-accent hover:underline"
								>
									https://andy-cinquin.fr
								</a>
							</p>
							<p className="mt-4 text-sm opacity-80">
								Prestation "clé en main" incluant : création de thème personnalisé, image de marque, référencement,
								hébergement.
							</p>
						</div>

						<h2>Droit d'auteur et propriété intellectuelle</h2>
						<p>
							L'ensemble de ce site est soumis à une protection de droits d'auteur selon les Articles L335-2 et suivants
							du Code de la propriété intellectuelle.
						</p>
						<p>
							Toute reproduction ou représentation totale ou partielle de son contenu (textes, images, sons, éléments
							graphiques) par quelque procédé utilisé, sans l'autorisation préalable de Cinquin Andy, est strictement
							interdite et constituera une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la
							propriété intellectuelle.
						</p>
						<div className="bg-white/10 rounded-xl p-6 not-prose mb-6">
							<p className="font-bold mb-2">Titulaire des droits :</p>
							<p>Cinquin Andy</p>
							<p>SIRET : 880 505 276 00019</p>
							<p>4 Impasse de la Marchaisière</p>
							<p>44115 Haute-Goulaine</p>
							<p className="mt-3 text-sm opacity-80">Toute violation fera l'objet de poursuites.</p>
						</div>

						<h2>Crédits photographiques</h2>
						<p>Les photographies présentes sur ce site sont la propriété de :</p>
						<ul>
							<li>Cinquin Andy (création et design)</li>
							<li>Isabelle Cinquin (photos d'activités et du quotidien)</li>
							<li>Banques d'images libres de droits (Unsplash, avec attribution)</li>
						</ul>
						<p>Toute utilisation sans autorisation est interdite et pourra faire l'objet de poursuites.</p>

						<h2>Protection des données personnelles</h2>

						<h3>Responsable du traitement</h3>
						<div className="bg-white/10 rounded-xl p-6 not-prose mb-6">
							<p className="font-bold mb-3">Isabelle Cinquin</p>
							<p>1250 chemin de la Renouillère</p>
							<p>74140 Sciez</p>
							<p className="mt-3">
								<strong>Téléphone :</strong> 06 03 28 69 06
							</p>

							<p className="font-bold mb-3 mt-6">Et</p>

							<p className="font-bold">Cinquin Andy</p>
							<p>SIRET : 880 505 276 00019</p>
							<p>4 Impasse de la Marchaisière</p>
							<p>44115 Haute-Goulaine</p>
							<p className="mt-3">
								<strong>Email :</strong>{' '}
								<a href="mailto:contact@andy-cinquin.fr" className="text-accent hover:underline">
									contact@andy-cinquin.fr
								</a>
							</p>
						</div>

						<h3>Données collectées</h3>
						<p>Dans le cadre de la gestion des demandes de contact et de garde d'enfants, nous collectons :</p>
						<ul>
							<li>Identité : civilité, nom, prénom</li>
							<li>Coordonnées : adresse, email, téléphone</li>
							<li>Informations sur votre demande : âge de l'enfant, type de garde souhaité, disponibilités</li>
						</ul>

						<h3>Finalités</h3>
						<p>Ces données sont utilisées exclusivement pour :</p>
						<ul>
							<li>Traiter votre demande de contact</li>
							<li>Répondre à vos questions sur les disponibilités</li>
							<li>Organiser une rencontre de présentation</li>
							<li>Gérer notre relation avec les familles</li>
						</ul>

						<h3>Vos droits</h3>
						<p>
							Conformément au RGPD, vous disposez des droits suivants : droit d'accès, de rectification, d'effacement, de
							limitation du traitement, d'opposition et de portabilité.
						</p>
						<div className="bg-white/10 rounded-xl p-6 not-prose mb-6">
							<p className="font-bold mb-3">Pour exercer vos droits :</p>
							<p>
								<strong>Téléphone :</strong> 06 03 28 69 06
							</p>
							<p>
								<strong>Email :</strong>{' '}
								<a href="mailto:contact@andy-cinquin.fr" className="text-accent hover:underline">
									contact@andy-cinquin.fr
								</a>
							</p>
							<p className="mt-3">
								<strong>Courrier :</strong> Isabelle Cinquin, 1250 chemin de la Renouillère, 74140 Sciez
							</p>
							<p className="mt-4 text-sm opacity-80">Nous vous répondrons dans un délai d'un mois.</p>
						</div>

						<p>
							<strong>Réclamation :</strong> Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire
							une réclamation auprès de la CNIL :{' '}
							<a
								href="https://www.cnil.fr"
								target="_blank"
								rel="noopener noreferrer"
								className="text-accent hover:underline"
							>
								www.cnil.fr
							</a>
						</p>

						<h2>Cookies</h2>
						<p>
							Ce site utilise uniquement des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie de
							tracking publicitaire n'est utilisé.
						</p>

						<h2>Limitation de responsabilité</h2>
						<p>
							Isabelle Cinquin s'efforce d'assurer l'exactitude des informations diffusées sur ce site. Toutefois, nous ne
							pouvons garantir l'exhaustivité ou l'absence d'erreur.
						</p>

						<h2>Droit applicable</h2>
						<p>
							Le présent site et les présentes mentions légales sont régis par le droit français. En cas de litige, une
							solution amiable sera recherchée avant toute action judiciaire.
						</p>
					</div>
				</section>
			</main>

			<Footer />
		</>
	)
}
