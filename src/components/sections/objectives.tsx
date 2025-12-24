import Image from 'next/image'
import {
	ResponsiveModal,
	ResponsiveModalContent,
	ResponsiveModalHeader,
	ResponsiveModalTitle,
	ResponsiveModalTrigger,
} from '@/components/ui/responsive-modal'
import { RichText } from '@/components/ui/rich-text'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import type { LandingObjective, LandingObjectivesSection } from '@/types/landing'

interface ObjectivesProps {
	objectivesSection?: LandingObjectivesSection | null
}

export function Objectives({ objectivesSection }: ObjectivesProps) {
	if (!objectivesSection?.title || !objectivesSection?.items) {
		throw new Error('Missing required data for Objectives section: title or items')
	}

	const title = objectivesSection.title
	const subtitle = objectivesSection.subtitle
	const objectives = objectivesSection.items

	const items = objectives.map((obj: LandingObjective) => {
		const iconUrl = typeof obj.icon === 'object' && obj.icon?.url ? obj.icon.url : null

		if (!iconUrl) {
			throw new Error(`Missing icon for objective: ${obj.title}`)
		}

		return {
			...obj,
			iconUrl,
		}
	})

	return (
		<SectionWrapper id="objectifs" variant="primary" className="overflow-hidden">
			<div className="max-w-7xl mx-auto">
				{/* Title with accent */}
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
						{title.split(' ').slice(0, -1).join(' ')}{' '}
						<span className="text-white/80 font-handwriting text-4xl md:text-5xl">{title.split(' ').slice(-1)}</span>
					</h2>
					<p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">{subtitle}</p>
				</div>

				{/* 5 columns on same line */}
				<div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
					{items.map((objective, index) => (
						<ResponsiveModal key={objective.id || index}>
							<ResponsiveModalTrigger asChild>
								<button type="button" className="flex flex-col items-center text-center group cursor-pointer w-full transition-all hover:scale-105">
									{/* Scribble Icon */}
									<div className="relative w-16 h-16 md:w-20 md:h-20 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
										<Image
											src={objective.iconUrl}
											alt={objective.title}
											fill
											className="object-contain drop-shadow-sm"
										/>
									</div>

									{/* Title */}
									<h3 className="font-bold text-base md:text-lg text-white mb-1">{objective.title}</h3>

									{/* Hint text */}
									<p className="text-xs text-white/50 mt-1">Cliquer pour en savoir plus</p>
								</button>
							</ResponsiveModalTrigger>

							<ResponsiveModalContent className="bg-gradient-to-br from-primary via-secondary to-primary border-accent/20">
								<ResponsiveModalHeader>
									<div className="flex items-center gap-4  mb-4">
										<div className="relative w-12 h-12 shrink-0">
											<Image
												src={objective.iconUrl}
												alt={objective.title}
												fill
												className="object-contain drop-shadow-lg"
											/>
										</div>
										<ResponsiveModalTitle className="text-2xl font-bold text-white font-display">
											{objective.title}
										</ResponsiveModalTitle>
									</div>

									<div className="prose prose-invert prose-lg max-w-none text-white/90">
										<RichText content={objective.description} variant="dark" />
									</div>

								</ResponsiveModalHeader>
							</ResponsiveModalContent>
						</ResponsiveModal>
					))}
				</div>
			</div>
		</SectionWrapper>
	)
}
