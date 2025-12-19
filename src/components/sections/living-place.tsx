import Image from 'next/image'
import { Home } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { SectionTitle } from '@/components/ui/section-title'
import type { Media } from '@/payload-types'

interface LivingPlaceImage {
	id?: string
	image?: Media | number | null
}

interface LivingPlaceProps {
	content?: unknown
	images?: LivingPlaceImage[] | null
}

export function LivingPlace({ images }: LivingPlaceProps) {
	return (
		<SectionWrapper id="lieu-de-vie" variant="primary">
			<SectionTitle>Lieu de vie</SectionTitle>

			<div className="max-w-3xl mx-auto">
				<div className="text-center space-y-4 mb-10">
					<p className="text-lg leading-relaxed opacity-90">
						J'accueille vos enfants dans une maison clôturée avec jardin qui se situe au bord du Lac Léman.
					</p>
				</div>

				{/* Placeholder for future interactive element */}
				{images && images.length > 0 ? (
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						{images.map((item, index) => {
							const mediaUrl = typeof item.image === 'object' && item.image?.url ? item.image.url : null
							const mediaAlt =
								typeof item.image === 'object' && item.image?.alt ? item.image.alt : `Photo lieu de vie ${index + 1}`

							if (!mediaUrl) return null

							return (
								<div key={item.id || index} className="aspect-video relative rounded-xl overflow-hidden">
									<Image
										src={mediaUrl}
										alt={mediaAlt}
										fill
										className="object-cover"
										sizes="(max-width: 768px) 50vw, 33vw"
									/>
								</div>
							)
						})}
					</div>
				) : (
					<div className="aspect-video bg-white/10 rounded-2xl flex items-center justify-center">
						<div className="text-center">
							<Home className="w-16 h-16 mx-auto opacity-50 mb-4" />
							<p className="opacity-70">Visite virtuelle à venir</p>
						</div>
					</div>
				)}
			</div>
		</SectionWrapper>
	)
}


