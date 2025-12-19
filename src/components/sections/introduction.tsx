import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { SectionTitle } from '@/components/ui/section-title'
import type { Media } from '@/payload-types'

interface IntroductionProps {
	title?: string | null
	content?: unknown
	image?: Media | number | null
}

export function Introduction({ title, content, image }: IntroductionProps) {
	const mediaUrl = typeof image === 'object' && image?.url ? image.url : null
	const mediaAlt = typeof image === 'object' && image?.alt ? image.alt : 'Photo Isabelle'

	return (
		<SectionWrapper id="introduction" variant="primary">
			<SectionTitle>{title || "Livret d'Accueil de Nounou"}</SectionTitle>

			<div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
				<div className="flex-1 text-center lg:text-left">
					{content ? (
						<div className="prose prose-invert prose-lg max-w-none">
							{/* Rich text would be rendered here - simplified for now */}
							<p className="text-lg leading-relaxed opacity-90">
								Après plusieurs années de bonheur avec les enfants et afin de donner au livret d'accueil un second
								souffle, mon fils m'a proposé de le convertir en site internet.
							</p>
							<p className="text-lg leading-relaxed opacity-90 mt-4">
								La relation nounou – Parents est basée sur un partenariat : Ensemble nous veillons sur le bien-être et
								l'éveil de l'enfant.
							</p>
						</div>
					) : (
						<div className="space-y-4">
							<p className="text-lg leading-relaxed opacity-90">
								Après plusieurs années de bonheur avec les enfants et afin de donner au livret d'accueil un second
								souffle, mon fils m'a proposé de le convertir en site internet.
							</p>
							<p className="text-lg leading-relaxed opacity-90">
								La relation nounou – Parents est basée sur un partenariat : Ensemble nous veillons sur le bien-être et
								l'éveil de l'enfant.
							</p>
						</div>
					)}
				</div>

				{mediaUrl && (
					<div className="flex-shrink-0">
						<div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
							<Image
								src={mediaUrl}
								alt={mediaAlt}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 256px, 320px"
							/>
						</div>
					</div>
				)}
			</div>
		</SectionWrapper>
	)
}
