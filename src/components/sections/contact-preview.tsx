import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { SectionTitle } from '@/components/ui/section-title'
import { SectionWrapper } from '@/components/ui/section-wrapper'

interface ContactPreviewProps {
	email?: string | null
	phone?: string | null
	landline?: string | null
	address?: string | null
}

export function ContactPreview({
	email = 'andorma@gmail.com',
	phone = '06 03 28 69 06',
	landline = '04 50 72 81 92',
	address = '1250 Chemin de la Renouillère, 74140 Sciez',
}: ContactPreviewProps) {
	return (
		<SectionWrapper id="contact" variant="secondary">
			<SectionTitle subtitle="N'hésitez pas à me contacter pour toute question">Contact</SectionTitle>

			<div className="max-w-2xl mx-auto">
				<div className="grid gap-4 mb-8">
					{email && (
						<a
							href={`mailto:${email}`}
							className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
						>
							<div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
								<Mail className="w-5 h-5" />
							</div>
							<span>{email}</span>
						</a>
					)}

					{phone && (
						<a
							href={`tel:${phone.replace(/\s/g, '')}`}
							className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
						>
							<div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
								<Phone className="w-5 h-5" />
							</div>
							<span>{phone}</span>
						</a>
					)}

					{landline && (
						<a
							href={`tel:${landline.replace(/\s/g, '')}`}
							className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
						>
							<div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
								<Phone className="w-5 h-5" />
							</div>
							<span>{landline}</span>
						</a>
					)}

					{address && (
						<div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
							<div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
								<MapPin className="w-5 h-5" />
							</div>
							<span>{address}</span>
						</div>
					)}
				</div>

				<div className="text-center">
					<Link
						href="/contact"
						className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-full hover:bg-white/90 transition-colors font-semibold shadow-lg"
					>
						Accéder au formulaire de contact
						<ArrowRight className="w-4 h-4" />
					</Link>
				</div>
			</div>
		</SectionWrapper>
	)
}
