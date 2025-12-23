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
				<div className="aspect-video relative rounded-xl overflow-hidden">
					<Image
						src={"/Home_sweet_home.jpg"}
						alt="Plan de la maison"
						fill
						className="object-cover"
						sizes="(max-width: 768px) 50vw, 33vw"
					/>
				</div>
			</div>
		</SectionWrapper>
	)
}
