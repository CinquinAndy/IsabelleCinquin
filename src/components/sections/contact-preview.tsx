import { ArrowRight, Heart, Mail, MapPin, Phone, Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
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
		<SectionWrapper id="contact" variant="primary" className="overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 md:px-6">
				{/* CTA Box with decorative elements */}
				<div className="relative mx-auto flex w-full max-w-4xl flex-col justify-between gap-y-8 border border-white/20 bg-white/5 backdrop-blur-sm rounded-3xl px-6 py-12 md:px-12 md:py-16">
					{/* Corner decorations */}
					<Plus className="absolute top-4 left-4 size-5 text-white/30" strokeWidth={1.5} />
					<Plus className="absolute top-4 right-4 size-5 text-white/30" strokeWidth={1.5} />
					<Plus className="absolute bottom-4 left-4 size-5 text-white/30" strokeWidth={1.5} />
					<Plus className="absolute bottom-4 right-4 size-5 text-white/30" strokeWidth={1.5} />

					{/* Center dashed line decoration */}
					<div className="absolute top-8 bottom-8 left-1/2 w-px border-l border-dashed border-white/10" />

					{/* Main content */}
					<div className="space-y-4 text-center relative z-10">
						<div className="inline-flex items-center justify-center gap-2 text-pink-300 mb-2">
							<Heart className="size-5 fill-current" />
						</div>
						<h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
							Envie de me <span className="font-handwriting text-white/80">rencontrer</span> ?
						</h2>
						<p className="text-white/70 text-lg max-w-xl mx-auto">
							N'hésitez pas à me contacter pour discuter de l'accueil de votre enfant
						</p>
					</div>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
						{phone && (
							<Button
								variant="outline"
								size="lg"
								asChild
								className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
							>
								<Link href={`tel:${phone.replace(/\s/g, '')}`}>
									<Phone className="size-4" />
									Appelez moi
								</Link>
							</Button>
						)}
						<Button size="lg" asChild className="rounded-full bg-white text-primary hover:bg-white/90 shadow-lg">
							<Link href="/contact">
								Contactez moi
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</SectionWrapper>
	)
}
