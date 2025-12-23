'use client'

import { motion } from 'framer-motion'
import { Award, GraduationCap } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import type { LandingTraining, LandingTrainingsSection } from '@/types/landing'

interface TrainingWithIcon extends LandingTraining {
	icon?: 'graduation' | 'award'
}

interface TrainingsProps {
	trainingsSection?: LandingTrainingsSection | null
}

function TrainingCard({ training, index }: { training: TrainingWithIcon; index: number }) {
	const Icon = training.icon === 'award' ? Award : GraduationCap
	const isEven = index % 2 === 0

	return (
		<motion.div
			className={`relative border w-full rounded-2xl overflow-hidden border-white/10 p-1 ${
				isEven ? 'bg-secondary/80' : 'bg-primary/80'
			}`}
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: index * 0.15 }}
		>
			{/* Pattern layer - positioned absolute so it shows through */}
			<div
				className="absolute inset-0 bg-repeat bg-size-[30px_30px] rounded-xl opacity-30"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Cg stroke-width='4' stroke='hsla(0, 0%25, 100%25, 1)' fill='none'%3E%3Cline x1='0' y1='0' x2='400' y2='400'%3E%3C/line%3E%3Cline x1='400' y1='0' x2='800' y2='400'%3E%3C/line%3E%3Cline x1='800' y1='0' x2='1200' y2='400'%3E%3C/line%3E%3Cline x1='0' y1='400' x2='400' y2='800'%3E%3C/line%3E%3Cline x1='400' y1='400' x2='800' y2='800'%3E%3C/line%3E%3Cline x1='800' y1='400' x2='1200' y2='800'%3E%3C/line%3E%3Cline x1='0' y1='800' x2='400' y2='1200'%3E%3C/line%3E%3Cline x1='400' y1='800' x2='800' y2='1200'%3E%3C/line%3E%3Cline x1='800' y1='800' x2='1200' y2='1200'%3E%3C/line%3E%3C/g%3E%3C/svg%3E")`,
				}}
			/>

			{/* Content */}
			<div className="relative z-10 flex items-start gap-4 md:gap-6 p-4 md:p-6">
				{/* Icon */}
				<div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0">
					<Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
				</div>

				{/* Text content */}
				<div className="flex-1 min-w-0">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-2">
						<h3 className="text-lg md:text-xl font-semibold text-white">{training.title}</h3>
						{training.period && (
							<span className="text-sm text-white/70 font-medium bg-white/10 px-3 py-1 rounded-full w-fit">
								{training.period}
							</span>
						)}
					</div>
					{training.description && <p className="text-sm md:text-base text-white/80">{training.description}</p>}
				</div>
			</div>
		</motion.div>
	)
}

export function Trainings({ trainingsSection }: TrainingsProps) {
	if (!trainingsSection?.title || !trainingsSection?.items) {
		throw new Error('Missing required data for Trainings section: title or items')
	}

	const title = trainingsSection.title
	const items = trainingsSection.items

	// Add default icons if not present
	const trainingsWithIcons: TrainingWithIcon[] = items.map((t, i) => ({
		...t,
		icon: i === 0 ? 'graduation' : 'award',
	}))

	if (trainingsWithIcons.length === 0) return null

	return (
		<SectionWrapper id="formations" variant="secondary">
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
					{title.split(' ').map((word, i) =>
						i === title.split(' ').length - 1 ? (
							<span key={i} className="font-handwriting text-white/80">
								{word}
							</span>
						) : (
							`${word} `
						)
					)}
				</h2>
			</div>

			<div className="max-w-3xl mx-auto space-y-6">
				{trainingsWithIcons.map((training, index) => (
					<TrainingCard key={training.id || index} training={training} index={index} />
				))}
			</div>
		</SectionWrapper>
	)
}
