import { Home } from 'lucide-react'
import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { formatMediaUrl } from '@/lib/utils'
import type { LandingLivingPlace } from '@/types/landing'

interface LivingPlaceProps {
	livingPlace?: LandingLivingPlace | null
}

export function LivingPlace({ livingPlace }: LivingPlaceProps) {
	if (!livingPlace?.title || !livingPlace?.description || !livingPlace?.images) {
		throw new Error('Missing required data for Living Place section')
	}

	const title = livingPlace.title
	const description = livingPlace.description
	const images = livingPlace.images

	return (
		<SectionWrapper id="lieu-de-vie" variant="primary">
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
					{title.split(' ').slice(0, -1).join(' ')}{' '}
					<span className="font-handwriting text-white/80">{title.split(' ').slice(-1)}</span>
				</h2>
			</div>

			<div className="max-w-3xl mx-auto">
				<div className="text-center space-y-4 mb-10">
					<p className="text-lg leading-relaxed opacity-90">{description}</p>
				</div>

				{/* Placeholder for future interactive element */}
				{images && images.length > 0 ? (
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						{images.map((item, index) => {
							const mediaUrl = formatMediaUrl(typeof item.image === 'object' && item.image?.url ? item.image.url : null)
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
