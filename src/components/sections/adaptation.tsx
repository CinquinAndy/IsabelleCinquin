import Image from 'next/image'
import { RichText } from '@/components/ui/rich-text'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { formatMediaUrl } from '@/lib/utils'
import type { LandingAdaptation } from '@/types/landing'

interface AdaptationProps {
	adaptation?: LandingAdaptation | null
}

const badgeColors: Record<string, string> = {
	pink: 'bg-gradient-to-r from-pink-500 to-rose-500',
	violet: 'bg-gradient-to-r from-violet-500 to-purple-500',
	amber: 'bg-gradient-to-r from-amber-500 to-orange-500',
	emerald: 'bg-gradient-to-r from-emerald-500 to-teal-500',
}

const badgeIcons = [
	'/icons/scribbbles/7/SVG/Fichier 10.svg',
	'/icons/scribbbles/7/SVG/Fichier 5.svg',
	'/icons/scribbbles/7/SVG/Fichier 18.svg',
	'/icons/scribbbles/7/SVG/Fichier 3.svg',
]

export function Adaptation({ adaptation }: AdaptationProps) {
	if (!adaptation?.title || !adaptation?.badges || !adaptation?.image) {
		throw new Error('Missing required data for Adaptation section')
	}

	const title = adaptation.title
	const subtitle = adaptation.subtitle
	const keyMessage = adaptation.keyMessage
	const badges = adaptation.badges

	const mediaUrl = formatMediaUrl(
		typeof adaptation.image === 'object' && adaptation.image?.url ? adaptation.image.url : null
	)

	if (!mediaUrl) throw new Error('Missing image for Adaptation section')

	const mediaAlt =
		typeof adaptation.image === 'object' && adaptation.image?.alt ? adaptation.image.alt : "Période d'adaptation"

	const displayBadges = badges

	return (
		<SectionWrapper id="adaptation" variant="primary" className="overflow-hidden">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Left - Image */}
					<div className="relative">
						{/* Decorative wavy border */}
						<div className="absolute -inset-4 bg-white/10 rounded-4xl -rotate-2" />
						<div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl -rotate-2">
							<Image src={mediaUrl} alt={mediaAlt} fill className="object-cover" />
						</div>
					</div>

					{/* Right - Content */}
					<div className="space-y-8">
						{/* Title */}
						<div>
							<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
								{title.split(' ').slice(0, -1).join(' ')}{' '}
								<span className="font-handwriting text-white/80">{title.split(' ').slice(-1)}</span>
							</h2>
							<p className="mt-4 text-lg text-white/70 leading-relaxed max-w-lg">{subtitle}</p>
						</div>

						{/* Colorful Badges */}
						<div className="flex flex-wrap gap-4">
							{displayBadges.map((badge, index) => (
								<div
									key={badge.text || index}
									className={`
										inline-flex items-center gap-3 px-5 py-2.5 rounded-full
										${badgeColors[badge.color || 'pink']} text-white font-semibold text-sm
										shadow-lg shadow-black/20
										transition-all duration-300
										hover:scale-105 hover:shadow-xl hover:shadow-black/30
									`}
									style={{
										transform: `rotate(${index % 2 === 0 ? '-2deg' : '2deg'})`,
									}}
								>
									<div className="relative w-8 h-8 -ml-1">
										<Image src={badgeIcons[index] || badgeIcons[0]} alt="" fill className="object-contain" />
									</div>
									{badge.text}
								</div>
							))}
						</div>

						{/* Key message */}
						<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
							<p className="text-white/90 font-medium">{keyMessage}</p>
						</div>
					</div>
				</div>
			</div>
		</SectionWrapper>
	)
}
