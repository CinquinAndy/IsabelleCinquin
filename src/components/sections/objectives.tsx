'use client'

import { motion } from 'framer-motion'
import { Target } from 'lucide-react'
import Image from 'next/image'
import {
	ResponsiveModal,
	ResponsiveModalContent,
	ResponsiveModalHeader,
	ResponsiveModalTitle,
	ResponsiveModalTrigger,
} from '@/components/ui/responsive-modal'
import { RichText } from '@/components/ui/rich-text'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { durations, easings } from '@/lib/animations'
import type { Landing } from '@/payload-types'

interface ObjectivesProps {
	objectivesSection?: Landing['objectivesSection'] | null
}

export function Objectives({ objectivesSection }: ObjectivesProps) {
	if (!objectivesSection?.title || !objectivesSection?.items) {
		throw new Error('Missing required data for Objectives section: title or items')
	}

	const title = objectivesSection.title
	const subtitle = objectivesSection.subtitle
	const objectives = objectivesSection.items

	const items = objectives.map((obj) => {
		const iconUrl = typeof obj.icon === 'object' && obj.icon?.url ? obj.icon.url : null

		if (!iconUrl) {
			throw new Error(`Missing icon for objective: ${obj.title}`)
		}

		return {
			...obj,
			iconUrl,
		}
	})

	return (
		<SectionWrapper id="objectifs" variant="primary" className="overflow-hidden">
			<div className="max-w-7xl mx-auto">
				{/* Title with enhanced animation */}
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: durations.slow, ease: easings.smooth }}
				>
					{/* Small badge with icon */}
					<motion.div
						className="inline-flex items-center gap-2 mb-4"
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: durations.standard, delay: 0.2, ease: easings.bounce }}
					>
						<motion.div 
							className="w-8 h-8 rounded-lg bg-accent/30 flex items-center justify-center"
							animate={{
								rotate: [0, -10, 10, 0],
							}}
							transition={{
								duration: 5,
								repeat: Number.POSITIVE_INFINITY,
								ease: 'easeInOut',
							}}
							whileHover={{ scale: 1.2, rotate: 20 }}
						>
							<Target className="w-4 h-4 text-white" />
						</motion.div>
					</motion.div>

					<motion.h2 
						className="text-3xl md:text-4xl font-bold tracking-tight text-white"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: durations.standard, delay: 0.1 }}
					>
						{title.split(' ').slice(0, -1).join(' ')}{' '}
						<motion.span 
							className="text-white/80 font-handwriting text-4xl md:text-5xl inline-block"
							initial={{ opacity: 0, rotate: -5 }}
							whileInView={{ opacity: 1, rotate: 0 }}
							viewport={{ once: true }}
							transition={{ duration: durations.standard, delay: 0.3, ease: easings.bounce }}
						>
							{title.split(' ').slice(-1)}
						</motion.span>
					</motion.h2>

					<motion.p 
						className="mt-4 text-lg text-white/70 max-w-2xl mx-auto"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: durations.standard, delay: 0.4 }}
					>
						{subtitle}
					</motion.p>
				</motion.div>

				{/* 5 columns grid with staggered entrance */}
				<div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
					{items.map((objective, index) => (
						<ResponsiveModal key={objective.id || index}>
							<ResponsiveModalTrigger asChild>
								<motion.button 
									type="button" 
									className="flex flex-col items-center text-center group cursor-pointer w-full"
									initial={{ opacity: 0, y: 40, scale: 0.8 }}
									whileInView={{ opacity: 1, y: 0, scale: 1 }}
									viewport={{ once: true, amount: 0.1 }}
									transition={{ 
										delay: index * 0.1,
										duration: 0.6,
										ease: easings.smooth,
									}}
									whileHover={{ scale: 1.05, y: -8 }}
									whileTap={{ scale: 0.95 }}
								>
									{/* Icon container with floating animation */}
									<motion.div 
										className="relative w-16 h-16 md:w-20 md:h-20 mb-4"
										animate={{
											y: [0, -8, 0],
											rotate: [0, 5, -5, 0],
										}}
										transition={{
											duration: 4 + index * 0.5,
											repeat: Number.POSITIVE_INFINITY,
											ease: 'easeInOut',
										}}
										whileHover={{ 
											scale: 1.2, 
											rotate: 15,
											transition: { duration: 0.3 } 
										}}
									>
										{/* Glow effect */}
										<motion.div 
											className="absolute inset-0 rounded-full bg-accent/20 blur-xl"
											animate={{
												scale: [1, 1.2, 1],
												opacity: [0.3, 0.6, 0.3],
											}}
											transition={{
												duration: 3,
												repeat: Number.POSITIVE_INFINITY,
												delay: index * 0.2,
											}}
										/>
										
										<Image
											src={objective.iconUrl}
											alt={objective.title}
											fill
											className="object-contain drop-shadow-lg relative z-10"
										/>
									</motion.div>

									{/* Title with slide up */}
									<motion.h3 
										className="font-bold text-base md:text-lg text-white mb-1"
										initial={{ opacity: 0, y: 10 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
									>
										{objective.title}
									</motion.h3>

									{/* Hint text with subtle animation */}
									<motion.p 
										className="text-xs text-white/50 mt-1"
										initial={{ opacity: 0 }}
										whileInView={{ opacity: 0.5 }}
										viewport={{ once: true }}
										transition={{ delay: index * 0.1 + 0.4 }}
										whileHover={{ opacity: 1 }}
									>
										Cliquer pour en savoir plus
									</motion.p>

									{/* Decorative circle on hover */}
									<motion.div
										className="absolute inset-0 border-2 border-accent/0 rounded-2xl -z-10"
										whileHover={{
											borderColor: 'rgba(174, 129, 255, 0.3)',
											scale: 1.1,
										}}
										transition={{ duration: 0.3 }}
									/>
								</motion.button>
							</ResponsiveModalTrigger>

							<ResponsiveModalContent className="bg-gradient-to-br from-primary via-secondary to-primary border-accent/20">
								<ResponsiveModalHeader>
									<motion.div 
										className="flex items-center gap-4 mb-4"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.5, ease: easings.smooth }}
									>
										<motion.div 
											className="relative w-12 h-12 shrink-0"
											initial={{ scale: 0, rotate: -180 }}
											animate={{ scale: 1, rotate: 0 }}
											transition={{ 
												type: 'spring',
												stiffness: 200,
												damping: 15,
												delay: 0.1,
											}}
										>
											<Image
												src={objective.iconUrl}
												alt={objective.title}
												fill
												className="object-contain drop-shadow-lg"
											/>
										</motion.div>
										<ResponsiveModalTitle className="text-2xl font-bold text-white font-display">
											{objective.title}
										</ResponsiveModalTitle>
									</motion.div>

									<motion.div 
										className="prose prose-invert prose-lg max-w-none text-white/90"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: 0.2 }}
									>
										<RichText content={objective.description} variant="dark" />
									</motion.div>
								</ResponsiveModalHeader>
							</ResponsiveModalContent>
						</ResponsiveModal>
					))}
				</div>
			</div>
		</SectionWrapper>
	)
}
