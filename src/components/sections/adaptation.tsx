import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/section-wrapper'
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
	const title = adaptation?.title || "Période d'adaptation"
	const subtitle = adaptation?.subtitle || "Une période importante pour permettre à l'enfant, aux parents, et à nounou de faire connaissance en douceur."
	const keyMessage = adaptation?.keyMessage || "La clé d'un accueil réussi : une confiance mutuelle et un dialogue permanent entre les parents et la nounou."
	const badges = adaptation?.badges || []

	// Default badges if none provided
	const defaultBadges = [
		{ text: 'Confiance mutuelle', color: 'pink' as const },
		{ text: 'Dialogue permanent', color: 'violet' as const },
		{ text: 'Écoute attentive', color: 'amber' as const },
		{ text: 'Patience et douceur', color: 'emerald' as const },
	]
	const displayBadges = badges.length > 0 ? badges : defaultBadges

	return (
		<SectionWrapper id="adaptation" variant="primary" className="overflow-hidden">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Left - Image */}
					<div className="relative">
						{/* Decorative wavy border */}
						<div className="absolute -inset-4 bg-white/10 rounded-[2rem] -rotate-2" />
						<div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
							<Image src="/isabelle.jpg" alt="Période d'adaptation avec nounou" fill className="object-cover" />
						</div>
						{/* Decorative dots */}
						<div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
							<span className="w-2 h-2 rounded-full bg-white/40" />
							<span className="w-2 h-2 rounded-full bg-white/60" />
							<span className="w-2 h-2 rounded-full bg-white/40" />
							<span className="w-2 h-2 rounded-full bg-white/20" />
						</div>
					</div>

					{/* Right - Content */}
					<div className="space-y-8">
						{/* Title */}
						<div>
							<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
								Période <span className="font-handwriting text-white/80">d'adaptation</span>
							</h2>
							<p className="mt-4 text-lg text-white/70 leading-relaxed max-w-lg">
								Une période importante pour permettre à l'enfant, aux parents, et à nounou de faire connaissance en
								douceur.
							</p>
						</div>

						{/* Colorful Badges */}
						<div className="flex flex-wrap gap-4">
							{adaptationBadges.map((badge, index) => (
								<div
									key={index}
									className={`
										inline-flex items-center gap-3 px-5 py-2.5 rounded-full
										${badge.color} text-white font-semibold text-sm
										shadow-lg shadow-black/20
										transition-all duration-300
										hover:scale-105 hover:shadow-xl hover:shadow-black/30
									`}
									style={{
										transform: `rotate(${index % 2 === 0 ? '-2deg' : '2deg'})`,
									}}
								>
									<div className="relative w-8 h-8 -ml-1">
										<Image src={badge.icon} alt="" fill className="object-contain" />
									</div>
									{badge.text}
								</div>
							))}
						</div>

						{/* Key message */}
						<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
							<p className="text-white/90 font-medium">
								🤝 La clé d'un accueil réussi : une <span className="text-white font-bold">confiance mutuelle</span> et
								un <span className="text-white font-bold">dialogue permanent</span> entre les parents et la nounou.
							</p>
						</div>
					</div>
				</div>
			</div>
		</SectionWrapper>
	)
}
