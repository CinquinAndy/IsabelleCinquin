import { RichTextParser } from '@/components/rich-text-parser'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import type { LandingPresentation } from '@/types/landing'

interface PresentationProps {
	presentation?: LandingPresentation | null
}

export function Presentation({ presentation }: PresentationProps) {
	if (!presentation) return null

	return (
		<SectionWrapper id="presentation" variant="secondary">
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
					{presentation.title || 'Ma présentation'}
				</h2>
			</div>

			<div className="max-w-3xl mx-auto text-center space-y-6">
				{presentation.content && (
					<div className="text-lg leading-relaxed opacity-90">
						<RichTextParser content={presentation.content} className="space-y-4" />
					</div>
				)}

				{presentation.agreementInfo && (
					<div className="mt-8 p-6 bg-white/10 rounded-xl">
						<p className="text-base opacity-80">{presentation.agreementInfo}</p>
					</div>
				)}
			</div>
		</SectionWrapper>
	)
}
