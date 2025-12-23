import Image from 'next/image'
import { RichTextParser } from '@/components/rich-text-parser'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { formatMediaUrl } from '@/lib/utils'
import type { LandingIntroduction } from '@/types/landing'

interface IntroductionProps {
	introduction?: LandingIntroduction | null
}

export function Introduction({ introduction }: IntroductionProps) {
	if (!introduction) return null

	const mediaUrl = formatMediaUrl(typeof introduction.image === 'object' && introduction.image?.url ? introduction.image.url : null)
	const mediaAlt =
		typeof introduction.image === 'object' && introduction.image?.alt ? introduction.image.alt : 'Photo Isabelle'

	return (
		<SectionWrapper id="introduction" variant="primary">
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
					{introduction.title || "Livret d'Accueil de Nounou"}
				</h2>
			</div>

			<div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
				<div className="flex-1 text-center lg:text-left">
					{introduction.content && (
						<div className="prose prose-invert prose-lg max-w-none">
							<RichTextParser content={introduction.content} />
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
