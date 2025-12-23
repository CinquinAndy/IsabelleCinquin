import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import type { LandingObjective, LandingObjectivesSection } from '@/types/landing'

interface ObjectiveWithUI {
	id?: string | null
	title: string
	description: string
	icon: string
	accentColor?: string
}

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

	const iconMap: Record<string, string> = {
		'star': '/icons/scribbbles/7/SVG/Fichier 10.svg',
		'heart-pulse': '/icons/scribbbles/7/SVG/Fichier 3.svg',
		'utensils': '/icons/scribbbles/7/SVG/Fichier 18.svg',
		'hand-helping': '/icons/scribbbles/7/SVG/Fichier 5.svg',
		'shield-check': '/icons/scribbbles/7/SVG/Fichier 26.svg',
		'baby': '/icons/scribbbles/7/SVG/Fichier 1.svg', // Fallback/Other
		'home': '/icons/scribbbles/7/SVG/Fichier 20.svg',
		'sun': '/icons/scribbbles/7/SVG/Fichier 48.svg',
		'book-open': '/icons/scribbbles/7/SVG/Fichier 12.svg',
		'palette': '/icons/scribbbles/7/SVG/Fichier 46.svg',
	}

	const items: ObjectiveWithUI[] = objectives.map((obj: LandingObjective) => {
		if (!obj.icon) throw new Error(`Missing icon for objective: ${obj.title}`)
		
		const iconPath = iconMap[obj.icon]
		if (!iconPath) throw new Error(`Unknown icon type: ${obj.icon} for objective: ${obj.title}`)

		return {
			id: obj.id,
			title: obj.title,
			description: obj.description || '',
			icon: iconPath,
			accentColor: 'text-purple-400',
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
						<div key={objective.id || index} className="flex flex-col items-center text-center group">
							{/* Scribble Icon */}
							<div className="relative w-16 h-16 md:w-20 md:h-20 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
								<Image src={objective.icon} alt={objective.title} fill className="object-contain drop-shadow-sm" />
							</div>

							{/* Title */}
							<h3 className="font-bold text-base md:text-lg text-white mb-1">{objective.title}</h3>

							{/* Description */}
							<p className="text-sm text-white/70 leading-snug">{objective.description}</p>
						</div>
					))}
				</div>
			</div>
		</SectionWrapper>
	)
}
