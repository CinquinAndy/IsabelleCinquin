'use client'

import { motion } from 'framer-motion'
import { Baby, Clock, Coffee, Moon, School, Sun, Utensils, Waves } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/section-wrapper'

interface ScheduleItem {
	id?: string
	time?: string | null
	activity: string
}

interface DailyScheduleProps {
	schedule?: ScheduleItem[] | null
}

// Icons for different times of day
const getTimeIcon = (time: string | null | undefined) => {
	if (!time) return Clock
	const timeLower = time.toLowerCase()
	if (timeLower.includes('matin') || timeLower.includes('9h')) return Sun
	if (timeLower.includes('matinée')) return Baby
	if (timeLower.includes('11h') || timeLower.includes('12h')) return Utensils
	if (timeLower.includes('13h')) return Moon
	if (timeLower.includes('15h')) return School
	if (timeLower.includes('16h')) return Waves
	return Clock
}

// Colors for timeline dots
const dotColors = [
	'bg-pink-400',
	'bg-violet-400',
	'bg-amber-400',
	'bg-emerald-400',
	'bg-cyan-400',
	'bg-rose-400',
	'bg-purple-400',
	'bg-orange-400',
]

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
		<SectionWrapper id="journee" variant="primary" className="overflow-hidden">
			<div className="max-w-7xl mx-auto">
				{/* Title */}
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
						Organisation d'une <span className="font-handwriting text-white/80">journée</span>
					</h2>
					<p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
						Comment se déroule une journée type chez nounou
					</p>
				</div>

				{/* Timeline */}
				<div className="relative max-w-3xl mx-auto">
					{/* Vertical line */}
					<div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-white/20" />

					<div className="space-y-8">
						{items.map((item, index) => {
							const IconComponent = getTimeIcon(item.time)
							const dotColor = dotColors[index % dotColors.length]

							return (
								<motion.div
									key={item.id || index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									className="relative pl-16 md:pl-20"
								>
									{/* Timeline dot with color */}
									<div
										className={`absolute left-4 md:left-6 top-4 h-4 w-4 rounded-full ${dotColor} ring-4 ring-white/10 shadow-lg`}
									/>

									{/* Content card */}
									<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-colors">
										{/* Time badge */}
										{item.time && (
											<div className="flex items-center gap-2 mb-2">
												<div className={`p-1.5 rounded-lg bg-white/10`}>
													<IconComponent className="w-4 h-4 text-white/80" />
												</div>
												<span className="text-sm font-bold text-white/90">{item.time}</span>
											</div>
										)}

										{/* Activity */}
										<p className="text-white/80 leading-relaxed">{item.activity}</p>
									</div>
								</motion.div>
							)
						})}
					</div>
				</div>
			</div>
		</SectionWrapper>
	)
}
