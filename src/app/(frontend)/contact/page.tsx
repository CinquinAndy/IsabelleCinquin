import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin, Clock, ExternalLink } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AvailabilityBanner } from '@/components/availability-banner'
import { ContactForm, LocationMap } from '@/components/contact'

export const metadata: Metadata = {
	title: 'Contact',
	description:
		'Contactez Isabelle Cinquin, assistante maternelle à Sciez. Formulaire de contact, téléphone, email et localisation.',
}

interface Settings {
	isAvailable?: boolean | null
	unavailableMessage?: string | null
	returnDate?: string | null
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
		// @ts-expect-error - landing global not in generated types yet
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
				<AvailabilityBanner
					isAvailable={settings.isAvailable ?? true}
					message={settings.unavailableMessage}
					returnDate={settings.returnDate}
				/>
			)}

			<Header />

			<main className="min-h-screen">
				{/* Hero section */}
				<section className="section-primary pt-32 pb-16 px-4">
					<div className="max-w-5xl mx-auto">
						<Link
							href="/"
							className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
						>
							<ArrowLeft className="w-4 h-4" />
							Retour à l'accueil
						</Link>

						<h1 className="text-4xl md:text-5xl font-bold mb-4">Contact</h1>
						<p className="text-xl opacity-90 max-w-2xl">
							N'hésitez pas à me contacter pour toute question ou pour organiser une première rencontre.
						</p>
					</div>
				</section>

				{/* Contact info + Form */}
				<section className="section-secondary py-16 px-4">
					<div className="max-w-5xl mx-auto">
						<div className="grid lg:grid-cols-5 gap-12">
							{/* Contact info sidebar */}
							<div className="lg:col-span-2 space-y-6">
								<h2 className="text-2xl font-bold mb-6">Informations</h2>

								{settings?.email && (
									<a
										href={`mailto:${settings.email}`}
										className="flex items-start gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
									>
										<div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
											<Mail className="w-5 h-5" />
										</div>
										<div>
											<p className="font-medium">Email</p>
											<p className="text-sm opacity-80">{settings.email}</p>
										</div>
									</a>
								)}

								{settings?.phone && (
									<a
										href={`tel:${settings.phone.replace(/\s/g, '')}`}
										className="flex items-start gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
									>
										<div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
											<Phone className="w-5 h-5" />
										</div>
										<div>
											<p className="font-medium">Portable</p>
											<p className="text-sm opacity-80">{settings.phone}</p>
										</div>
									</a>
								)}

								{settings?.landline && (
									<a
										href={`tel:${settings.landline.replace(/\s/g, '')}`}
										className="flex items-start gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
									>
										<div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
											<Phone className="w-5 h-5" />
										</div>
										<div>
											<p className="font-medium">Fixe</p>
											<p className="text-sm opacity-80">{settings.landline}</p>
										</div>
									</a>
								)}

								{settings?.address && (
									<div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl">
										<div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
											<MapPin className="w-5 h-5" />
										</div>
										<div>
											<p className="font-medium">Adresse</p>
											<p className="text-sm opacity-80">{settings.address}</p>
										</div>
									</div>
								)}

								{settings?.openingHours && (
									<div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl">
										<div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
											<Clock className="w-5 h-5" />
										</div>
										<div>
											<p className="font-medium">Horaires</p>
											<p className="text-sm opacity-80">{settings.openingHours}</p>
										</div>
									</div>
								)}

								{settings?.nounouTopLink && (
									<a
										href={settings.nounouTopLink}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-start gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
									>
										<div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
											<ExternalLink className="w-5 h-5" />
										</div>
										<div>
											<p className="font-medium">Nounou Top</p>
											<p className="text-sm opacity-80">Voir mon profil</p>
										</div>
									</a>
								)}
							</div>

							{/* Contact form */}
							<div className="lg:col-span-3">
								<div className="bg-white/5 rounded-2xl p-6 md:p-8">
									<h2 className="text-2xl font-bold mb-6">Envoyez-moi un message</h2>
									<ContactForm />
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Map section */}
				<section className="section-primary py-16 px-4">
					<div className="max-w-5xl mx-auto">
						<h2 className="text-2xl font-bold mb-6 text-center">Localisation</h2>
						<p className="text-center opacity-90 mb-8 max-w-xl mx-auto">
							Située à Sciez, proche de Thonon-les-Bains, Douvaine, Margencel, Anthy-sur-Léman, au bord du Lac Léman.
						</p>
						<LocationMap
							lat={settings?.mapLat ?? 46.349104}
							lng={settings?.mapLng ?? 6.397748}
							className="aspect-video"
						/>
					</div>
				</section>
			</main>

			<Footer settings={settings} />
		</>
	)
}
