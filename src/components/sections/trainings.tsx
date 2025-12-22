'use client'

import { motion } from 'framer-motion'
import { Award, GraduationCap } from 'lucide-react'
import { SectionTitle } from '@/components/ui/section-title'
import { SectionWrapper } from '@/components/ui/section-wrapper'

interface Training {
	id?: string
	title: string
	period?: string | null
	description?: string | null
	icon?: 'graduation' | 'award'
}

interface TrainingsProps {
	trainings?: Training[] | null
}

function TrainingCard({ training, index }: { training: Training; index: number }) {
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
				className="absolute inset-0 bg-repeat bg-[length:30px_30px] rounded-xl opacity-30"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Cg stroke-width='4' stroke='hsla(0, 0%25, 100%25, 1)' fill='none'%3E%3Cline x1='0' y1='0' x2='400' y2='400'%3E%3C/line%3E%3Cline x1='400' y1='0' x2='800' y2='400'%3E%3C/line%3E%3Cline x1='800' y1='0' x2='1200' y2='400'%3E%3C/line%3E%3Cline x1='0' y1='400' x2='400' y2='800'%3E%3C/line%3E%3Cline x1='400' y1='400' x2='800' y2='800'%3E%3C/line%3E%3Cline x1='800' y1='400' x2='1200' y2='800'%3E%3C/line%3E%3Cline x1='0' y1='800' x2='400' y2='1200'%3E%3C/line%3E%3Cline x1='400' y1='800' x2='800' y2='1200'%3E%3C/line%3E%3Cline x1='800' y1='800' x2='1200' y2='1200'%3E%3C/line%3E%3C/g%3E%3C/svg%3E")`,
				}}
			/>
			{/* Content layer */}
			<div className="relative z-10 p-6 md:p-8 flex gap-5">
				{/* Icon */}
				<div className="flex-shrink-0">
					<div
						className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
							isEven ? 'bg-accent/40' : 'bg-white/20'
						}`}
					>
						<Icon className="w-7 h-7 text-white" />
					</div>
				</div>

				{/* Text */}
				<div className="flex-1">
					<h3 className="font-bold text-xl text-white mb-1">{training.title}</h3>
					{training.period && (
						<span className="inline-block text-xs font-medium text-white/80 bg-accent/20 px-3 py-1 rounded-full mb-3">
							{training.period}
						</span>
					)}
					{training.description && (
						<p className="text-base text-white/80 leading-relaxed">{training.description}</p>
					)}
				</div>
			</div>
		</motion.div>
	)
}

export function Trainings({ trainings }: TrainingsProps) {
	const defaultTrainings: Training[] = [
		{
			id: '1',
			title: 'CAP Petite Enfance (AEPE)',
			period: '2018 - 2020',
			description:
				"120 heures de formation - CAP Accompagnant(e) éducatif petite enfance. Formation complète pour l'accueil et l'accompagnement des tout-petits.",
			icon: 'graduation',
		},
		{
			id: '2',
			title: 'Sauveteur Secouriste du Travail',
			period: 'Formation continue',
			description: 'Formation SST - Premiers secours adaptés aux situations avec les enfants. Recyclage régulier.',
			icon: 'award',
		},
	]

	const items = trainings && trainings.length > 0 ? trainings : defaultTrainings

	return (
		<SectionWrapper id="formations" variant="secondary">
			<SectionTitle>Mes formations</SectionTitle>

			<div className="max-w-3xl mx-auto space-y-6">
				{items.map((training, index) => (
					<TrainingCard key={training.id || index} training={training} index={index} />
				))}
			</div>
		</SectionWrapper>
	)
}
