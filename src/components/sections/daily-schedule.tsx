'use client'

import { motion } from 'framer-motion'
import { Baby, Clock, Moon, School, Sun, Utensils, Waves } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/section-wrapper'

import type { Landing } from '@/payload-types'

interface DailyScheduleProps {
	dailyScheduleSection?: Landing['dailyScheduleSection'] | null
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

export function DailySchedule({ dailyScheduleSection }: DailyScheduleProps) {
	if (!dailyScheduleSection?.title || !dailyScheduleSection?.items) {
		throw new Error('Missing required data for Daily Schedule section: title or items')
	}

	const title = dailyScheduleSection.title
	const subtitle = dailyScheduleSection.subtitle
	const items = dailyScheduleSection.items

	return (
		<SectionWrapper id="journee" variant="primary" className="overflow-hidden">
			<div className="max-w-7xl mx-auto">
				{/* Title */}
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
						{title.split(' ').slice(0, -1).join(' ')}{' '}
						<span className="font-handwriting text-white/80">{title.split(' ').slice(-1)}</span>
					</h2>
					<p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">{subtitle}</p>
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
