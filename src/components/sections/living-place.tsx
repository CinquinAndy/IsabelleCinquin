import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { formatMediaUrl } from '@/lib/utils'
import type { LandingLivingPlace } from '@/types/landing'

interface LivingPlaceProps {
	livingPlace?: LandingLivingPlace | null
}

export function LivingPlace({ livingPlace }: LivingPlaceProps) {
	if (!livingPlace?.title || !livingPlace?.description) {
		throw new Error('Missing required data for Living Place section')
	}

	const title = livingPlace.title
	const description = livingPlace.description

	// Extract image URL from Payload media object
	const imageUrl = formatMediaUrl(
		typeof livingPlace.image === 'object' && livingPlace.image?.url ? livingPlace.image.url : null
	)
	const imageAlt =
		typeof livingPlace.image === 'object' && livingPlace.image?.alt ? livingPlace.image.alt : 'Lieu de vie'

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

				{/* Only display image if URL is available */}
				{imageUrl && (
					<div className="aspect-video relative rounded-xl overflow-hidden shadow-2xl">
						<Image src={imageUrl} alt={imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
					</div>
				)}
			</div>
		</SectionWrapper>
	)
}
