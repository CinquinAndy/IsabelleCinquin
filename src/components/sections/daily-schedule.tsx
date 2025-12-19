import { Clock } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { SectionTitle } from '@/components/ui/section-title'

interface ScheduleItem {
	id?: string
	time?: string | null
	activity: string
}

interface DailyScheduleProps {
	schedule?: ScheduleItem[] | null
}

const defaultSchedule: ScheduleItem[] = [
	{
		id: '1',
		time: 'Matin',
		activity: 'Arrivée en douceur, transmission avec les parents, petit déjeuner et petit câlin',
	},
	{
		id: '2',
		time: '9h',
		activity: "Accompagnement du fils de nounou à l'école",
	},
	{
		id: '3',
		time: 'Matinée',
		activity: 'Sieste pour les plus petits, jeux et activités (dessins, peinture, sable magique) pour les plus grands',
	},
	{
		id: '4',
		time: '11h30',
		activity: 'Promenade vers le lac ou visite au relais de nounou pour mettre en appétit',
	},
	{
		id: '5',
		time: '12h',
		activity: 'Repas pour tous',
	},
	{
		id: '6',
		time: '13h30',
		activity: 'Changements de couches puis sieste',
	},
	{
		id: '7',
		time: '15h30',
		activity: "Réveil en douceur, départ pour chercher le fils de nounou à l'école",
	},
	{
		id: '8',
		time: '16h',
		activity: 'Goûter puis jeux ou petite baignade dans la pataugeoire en été',
	},
]

export function DailySchedule({ schedule }: DailyScheduleProps) {
	const items = schedule && schedule.length > 0 ? schedule : defaultSchedule

	return (
		<SectionWrapper id="journee" variant="secondary">
			<SectionTitle subtitle="Comment se déroule une journée type chez nounou">Organisation d'une journée</SectionTitle>

			<div className="max-w-2xl mx-auto">
				<div className="relative">
					{/* Timeline line */}
					<div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/30" />

					<div className="space-y-6">
						{items.map((item, index) => (
							<div key={item.id || index} className="relative flex gap-4 pl-16">
								{/* Timeline dot */}
								<div className="absolute left-4 w-5 h-5 rounded-full bg-white/30 border-2 border-white flex items-center justify-center">
									<div className="w-2 h-2 rounded-full bg-white" />
								</div>

								<div className="flex-1 bg-white/10 rounded-xl p-4">
									{item.time && (
										<div className="flex items-center gap-2 text-sm font-semibold opacity-80 mb-1">
											<Clock className="w-4 h-4" />
											{item.time}
										</div>
									)}
									<p className="opacity-90">{item.activity}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</SectionWrapper>
	)
}
