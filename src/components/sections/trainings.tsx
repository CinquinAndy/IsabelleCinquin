'use client'

import { motion } from 'framer-motion'
import { Award, Calendar } from 'lucide-react'
import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { durations, easings, stagger } from '@/lib/animations'
import type { Landing } from '@/payload-types'

interface TrainingsProps {
	trainingsSection?: Landing['trainingsSection'] | null
}

export function Trainings({ trainingsSection }: TrainingsProps) {
	if (!trainingsSection?.title || !trainingsSection?.items) {
		throw new Error('Missing required data for Trainings section: title or items')
	}

	const title = trainingsSection.title
	const subtitle = trainingsSection.subtitle
	const trainings = trainingsSection.items

	return (
		<SectionWrapper id="formations" variant="secondary">
			{/* py-16 md:py-24 */}
			<div className="absolute bottom-0 left-0 flex justify-center -translate-x-20 lg:-translate-x-10 xl:translate-x-0
			translate-y-10 md:translate-y-10 lg:translate-y-12 xl:translate-y-16 z-0">
				<Image src="/stitch.png" width={500} height={1000} alt="Stitch" className='w-[300px] lg:w-[400px] xl:w-[500px]' />
			</div>
			{/* Title */}
			<motion.div
				className="text-center mb-12"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: durations.standard, ease: easings.smooth }}
			>
				<h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
					{title.split(' ').slice(0, -1).join(' ')}{' '}
					<span className="font-handwriting text-accent">{title.split(' ').slice(-1)}</span>
				</h2>
				{subtitle && <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">{subtitle}</p>}
			</motion.div>

			{/* Timeline */}
			<div className="max-w-4xl mx-auto relative">
				{/* Vertical line with draw animation */}
				<motion.div
					className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-linear-to-b from-accent via-accent/50 to-transparent"
					initial={{ scaleY: 0, opacity: 0 }}
					whileInView={{ scaleY: 1, opacity: 1 }}
					viewport={{ once: true, amount: 0.1 }}
					transition={{ duration: durations.verySlow, ease: easings.smooth, delay: 0.2 }}
					style={{ transformOrigin: 'top' }}
				/>

				{/* Trainings list with stagger */}
				<motion.div
					className="space-y-8"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
					variants={{
						hidden: {},
						visible: {
							transition: {
								staggerChildren: stagger.standard,
								delayChildren: 0.4,
							},
						},
					}}
				>
					{trainings.map((training, index) => (
						<motion.div
							key={training.id || index}
							className="relative flex gap-6 md:gap-8 group"
							variants={{
								hidden: { opacity: 0, x: -30 },
								visible: {
									opacity: 1,
									x: 0,
									transition: {
										duration: durations.standard,
										ease: easings.smooth,
									},
								},
							}}
						>
							{/* Timeline dot with pulse */}
							<motion.div className="relative shrink-0 w-16 md:w-24 flex justify-center" whileHover={{ scale: 1.2 }}>
								<motion.div
									className="w-4 h-4 rounded-full bg-accent border-4 border-secondary relative z-10"
									animate={{
										scale: [1, 1.2, 1],
										boxShadow: [
											'0 0 0 0 rgba(174, 129, 255, 0.4)',
											'0 0 0 8px rgba(174, 129, 255, 0)',
											'0 0 0 0 rgba(174, 129, 255, 0)',
										],
									}}
									transition={{
										duration: 2,
										repeat: Number.POSITIVE_INFINITY,
										ease: 'easeInOut',
										delay: index * 0.2,
									}}
								/>
							</motion.div>

							{/* Card */}
							<motion.div
								className="flex-1 bg-sidebar/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-accent/30 transition-all"
								whileHover={{
									y: -4,
									boxShadow: '0 10px 30px rgba(174, 129, 255, 0.2)',
								}}
								transition={{ duration: durations.fast }}
							>
								{/* Header */}
								<div className="flex flex-wrap items-start flex-col lg:flex-row justify-between gap-4 mb-4">
									<div className="flex-1">
										<h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
											<Award className="w-5 h-5 text-accent" />
											{training.title}
										</h3>
									</div>

									{/* Period badge with bounce */}
									{training.period && (
										<motion.div
											className="px-4 py-2 bg-accent/20 border border-accent/30 rounded-full"
											initial={{ scale: 0 }}
											whileInView={{ scale: 1 }}
											viewport={{ once: true }}
											transition={{
												duration: durations.standard,
												ease: easings.bounce,
												delay: 0.2 + index * 0.1,
											}}
											whileHover={{ scale: 1.1, rotate: 5 }}
										>
											<div className="flex items-center gap-2 text-white">
												<Calendar className="w-4 h-4" />
												<span className="text-sm font-semibold">{training.period}</span>
											</div>
										</motion.div>
									)}
								</div>

								{/* Description */}
								{training.description && <p className="text-white/70 leading-relaxed">{training.description}</p>}
							</motion.div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</SectionWrapper>
	)
}
