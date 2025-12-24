import { RichText } from '@/components/ui/rich-text'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import type { LandingIntroduction } from '@/types/landing'

interface IntroductionProps {
	introduction?: LandingIntroduction | null
}

export function Introduction({ introduction }: IntroductionProps) {
	if (!introduction) {
		throw new Error('Missing required data for Introduction section')
	}

	const title = introduction.title

	return (
		<SectionWrapper id="introduction" variant="primary">
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h2>
			</div>

			<div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
				<div className="flex-1 text-center lg:text-left">
					<RichText content={introduction.content} variant="dark" className="prose-lg" />
				</div>
			</div>
		</SectionWrapper>
	)
}
