'use client'

import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { ContactForm, LocationMap } from './contact'

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

interface ContactPageClientProps {
	settings: Settings | null
}

export function ContactPageClient({ settings }: ContactPageClientProps) {
	return (
		<main className="min-h-screen">
			{/* Hero section */}
			<section className="section-primary pt-32 pb-16 px-4">
				<div className="max-w-5xl mx-auto">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
					>
						<Link
							href="/"
							className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 group"
						>
							<motion.div whileHover={{ x: -4 }} transition={{ duration: 0.3 }}>
								<ArrowLeft className="w-4 h-4" />
							</motion.div>
							Retour à l'accueil
						</Link>
					</motion.div>

					<motion.h1
						className="text-4xl md:text-5xl font-bold mb-4"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
					>
						Contact
					</motion.h1>

					<motion.p
						className="text-xl opacity-90 max-w-2xl"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 0.9, y: 0 }}
						transition={{ duration: 0.7, delay: 0.2 }}
					>
						N'hésitez pas à me contacter pour toute question ou pour organiser une première rencontre.
					</motion.p>
				</div>
			</section>

			{/* Contact info + Form */}
			<section className="section-secondary py-16 px-4">
				<div className="max-w-5xl mx-auto">
					<div className="grid lg:grid-cols-5 gap-12">
						{/* Contact info sidebar with stagger */}
						<motion.div
							className="lg:col-span-2 space-y-6"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.2 }}
							variants={{
								hidden: {},
								visible: {
									transition: {
										staggerChildren: 0.08,
										delayChildren: 0.2,
									},
								},
							}}
						>
							<motion.h2
								className="text-2xl font-bold mb-6"
								variants={{
									hidden: { opacity: 0, y: 20 },
									visible: { opacity: 1, y: 0 },
								}}
								transition={{ duration: 0.6 }}
							>
								Informations
							</motion.h2>

							{settings?.email && (
								<motion.div
									variants={{
										hidden: { opacity: 0, x: -20 },
										visible: { opacity: 1, x: 0 },
									}}
									transition={{ duration: 0.6 }}
								>
									<Link
										href={`mailto:${settings.email}`}
										className="flex items-start gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all group"
									>
										<motion.div
											className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0"
											whileHover={{ scale: 1.1, rotate: 10 }}
											transition={{ duration: 0.3 }}
										>
											<Mail className="w-5 h-5" />
										</motion.div>
										<div>
											<p className="font-medium">Email</p>
											<p className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">{settings.email}</p>
										</div>
									</Link>
								</motion.div>
							)}

							{settings?.phone && (
								<motion.div
									variants={{
										hidden: { opacity: 0, x: -20 },
										visible: { opacity: 1, x: 0 },
									}}
									transition={{ duration: 0.6 }}
								>
									<Link
										href={`tel:${settings.phone.replace(/\s/g, '')}`}
										className="flex items-start gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all group"
									>
										<motion.div
											className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0"
											whileHover={{ scale: 1.1, rotate: 10 }}
											transition={{ duration: 0.3 }}
										>
											<Phone className="w-5 h-5" />
										</motion.div>
										<div>
											<p className="font-medium">Portable</p>
											<p className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">{settings.phone}</p>
										</div>
									</Link>
								</motion.div>
							)}

							{settings?.landline && (
								<motion.div
									variants={{
										hidden: { opacity: 0, x: -20 },
										visible: { opacity: 1, x: 0 },
									}}
									transition={{ duration: 0.6 }}
								>
									<a
										href={`tel:${settings.landline.replace(/\s/g, '')}`}
										className="flex items-start gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all group"
									>
										<motion.div
											className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0"
											whileHover={{ scale: 1.1, rotate: -10 }}
											transition={{ duration: 0.3 }}
										>
											<Phone className="w-5 h-5" />
										</motion.div>
										<div>
											<p className="font-medium">Fixe</p>
											<p className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">
												{settings.landline}
											</p>
										</div>
									</a>
								</motion.div>
							)}

							{settings?.address && (
								<motion.div
									variants={{
										hidden: { opacity: 0, x: -20 },
										visible: { opacity: 1, x: 0 },
									}}
									transition={{ duration: 0.6 }}
								>
									<div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl">
										<div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
											<MapPin className="w-5 h-5" />
										</div>
										<div>
											<p className="font-medium">Adresse</p>
											<p className="text-sm opacity-80">{settings.address}</p>
										</div>
									</div>
								</motion.div>
							)}

							{settings?.openingHours && (
								<motion.div
									variants={{
										hidden: { opacity: 0, x: -20 },
										visible: { opacity: 1, x: 0 },
									}}
									transition={{ duration: 0.6 }}
								>
									<div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl">
										<div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
											<Clock className="w-5 h-5" />
										</div>
										<div>
											<p className="font-medium">Horaires</p>
											<p className="text-sm opacity-80">{settings.openingHours}</p>
										</div>
									</div>
								</motion.div>
							)}

							{settings?.nounouTopLink && (
								<motion.div
									variants={{
										hidden: { opacity: 0, x: -20 },
										visible: { opacity: 1, x: 0 },
									}}
									transition={{ duration: 0.6 }}
								>
									<Link
										href={settings.nounouTopLink}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-start gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all group"
									>
										<motion.div
											className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0"
											whileHover={{ scale: 1.1, rotate: 15 }}
											transition={{ duration: 0.3 }}
										>
											<ExternalLink className="w-5 h-5" />
										</motion.div>
										<div>
											<p className="font-medium">Nounou Top</p>
											<p className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">Voir mon profil</p>
										</div>
									</Link>
								</motion.div>
							)}
						</motion.div>

						{/* Contact form */}
						<motion.div
							className="lg:col-span-3"
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
						>
							<motion.div
								className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10"
								whileHover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
								transition={{ duration: 0.3 }}
							>
								<motion.h2
									className="text-2xl font-bold mb-6"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: 0.4 }}
								>
									Envoyez-moi un message
								</motion.h2>
								<ContactForm />
							</motion.div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Map section */}
			<section className="section-primary py-16 px-4">
				<div className="max-w-5xl mx-auto">
					<motion.h2
						className="text-2xl font-bold mb-6 text-center"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
					>
						Localisation
					</motion.h2>

					<motion.p
						className="text-center opacity-90 mb-8 max-w-xl mx-auto"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 0.9 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.1 }}
					>
						Située à Sciez, proche de Thonon-les-Bains, Douvaine, Margencel, Anthy-sur-Léman, au bord du Lac Léman.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 30, scale: 0.95 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
					>
						<LocationMap
							lat={settings?.mapLat ?? 46.349104}
							lng={settings?.mapLng ?? 6.397748}
							className="aspect-video rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl"
						/>
					</motion.div>
				</div>
			</section>
		</main>
	)
}
