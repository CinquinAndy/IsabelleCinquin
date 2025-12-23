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

const defaultObjectives: ObjectiveWithUI[] = [
	{
		id: '1',
		title: "L'éveil",
		description: 'Stimuler la curiosité et les sens',
		icon: '/icons/scribbbles/7/SVG/Fichier 10.svg',
		accentColor: 'text-purple-400',
	},
	{
		id: '2',
		title: 'Le respect',
		description: 'Apprendre à vivre ensemble',
		icon: '/icons/scribbbles/7/SVG/Fichier 3.svg',
		accentColor: 'text-pink-400',
	},
	{
		id: '3',
		title: "L'alimentation",
		description: 'Repas équilibrés et variés',
		icon: '/icons/scribbbles/7/SVG/Fichier 18.svg',
		accentColor: 'text-amber-400',
	},
	{
		id: '4',
		title: 'Les soins',
		description: 'Hygiène et bien-être',
		icon: '/icons/scribbbles/7/SVG/Fichier 5.svg',
		accentColor: 'text-emerald-400',
	},
	{
		id: '5',
		title: 'La sécurité',
		description: 'Environnement protégé',
		icon: '/icons/scribbbles/7/SVG/Fichier 26.svg',
		accentColor: 'text-red-400',
	},
]

export function Objectives({ objectives }: ObjectivesProps) {
	// Use provided objectives data or fall back to defaults
	const items: ObjectiveWithUI[] =
		objectives && objectives.length > 0
			? objectives.map((obj, index) => ({
					...obj,
					description: defaultObjectives[index]?.description || '',
					icon: defaultObjectives[index]?.icon || '/icons/scribbbles/7/SVG/Fichier 1.svg',
					accentColor: defaultObjectives[index]?.accentColor || 'text-purple-400',
				}))
			: defaultObjectives

	return (
		<SectionWrapper id="objectifs" variant="primary" className="overflow-hidden">
			<div className="max-w-7xl mx-auto">
				{/* Title with accent */}
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
						Mes <span className="text-white/80 font-handwriting text-4xl md:text-5xl">objectifs</span>
					</h2>
					<p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
						Ce qui est important pour moi dans l'accompagnement de vos enfants
					</p>
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
