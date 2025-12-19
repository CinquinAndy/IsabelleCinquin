import { GraduationCap } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { SectionTitle } from '@/components/ui/section-title'

interface Training {
	id?: string
	title: string
	period?: string | null
	description?: string | null
}

interface TrainingsProps {
	trainings?: Training[] | null
}

export function Trainings({ trainings }: TrainingsProps) {
	const defaultTrainings: Training[] = [
		{
			id: '1',
			title: 'Formation de nounou',
			period: '2018 - 2020',
			description: '120 heures effectuées - CAP Accompagnant(e) éducatif petite enfance (AEPE)',
		},
		{
			id: '2',
			title: 'Formation premiers secours',
			period: '',
			description: 'Formation SST',
		},
	]

	const items = trainings && trainings.length > 0 ? trainings : defaultTrainings

	return (
		<SectionWrapper id="formations" variant="secondary">
			<SectionTitle>Mes formations</SectionTitle>

			<div className="max-w-2xl mx-auto space-y-6">
				{items.map((training, index) => (
					<div key={training.id || index} className="flex gap-4 p-6 bg-white/10 rounded-xl">
						<div className="flex-shrink-0">
							<div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
								<GraduationCap className="w-6 h-6" />
							</div>
						</div>
						<div>
							<h3 className="font-bold text-lg">{training.title}</h3>
							{training.period && <p className="text-sm opacity-70 mt-1">{training.period}</p>}
							{training.description && <p className="text-base opacity-90 mt-2">{training.description}</p>}
						</div>
					</div>
				))}
			</div>
		</SectionWrapper>
	)
}
