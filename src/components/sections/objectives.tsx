import { Baby, HandHelping, Utensils, HeartPulse, ShieldCheck, Star, Sun, Home, BookOpen, Palette } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { SectionTitle } from '@/components/ui/section-title'

const iconMap = {
	baby: Baby,
	'hand-helping': HandHelping,
	utensils: Utensils,
	'heart-pulse': HeartPulse,
	'shield-check': ShieldCheck,
	star: Star,
	sun: Sun,
	home: Home,
	'book-open': BookOpen,
	palette: Palette,
} as const

type IconName = keyof typeof iconMap

interface Objective {
	id?: string
	title: string
	icon?: IconName | string | null
	content?: unknown
}

interface ObjectivesProps {
	objectives?: Objective[] | null
}

const defaultObjectives: Objective[] = [
	{
		id: '1',
		title: "L'éveil",
		icon: 'baby',
	},
	{
		id: '2',
		title: 'Le respect',
		icon: 'hand-helping',
	},
	{
		id: '3',
		title: "L'alimentation",
		icon: 'utensils',
	},
	{
		id: '4',
		title: 'Soins',
		icon: 'heart-pulse',
	},
	{
		id: '5',
		title: 'Sécurité',
		icon: 'shield-check',
	},
]

export function Objectives({ objectives }: ObjectivesProps) {
	const items = objectives && objectives.length > 0 ? objectives : defaultObjectives

	return (
		<SectionWrapper id="objectifs" variant="primary">
			<SectionTitle subtitle="Ce qui est important pour moi">Mes objectifs</SectionTitle>

			<div className="text-center mb-10">
				<p className="text-lg opacity-90 max-w-2xl mx-auto">
					L'éveil, le respect, le bien être, la socialisation, l'hygiène, l'autonomie, la sécurité et le confort de
					l'enfant.
				</p>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
				{items.map((objective, index) => {
					const IconComponent =
						objective.icon && objective.icon in iconMap ? iconMap[objective.icon as IconName] : iconMap.star

					return (
						<div
							key={objective.id || index}
							className="flex flex-col items-center text-center p-6 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
						>
							<div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
								<IconComponent className="w-8 h-8" />
							</div>
							<h3 className="font-bold text-lg">{objective.title}</h3>
						</div>
					)
				})}
			</div>
		</SectionWrapper>
	)
}
