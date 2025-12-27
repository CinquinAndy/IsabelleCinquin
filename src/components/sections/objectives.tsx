'use client'

import { motion } from 'framer-motion'
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

	const items = objectives.map(obj => {
		// Icon can be a populated object or just an ID
		const icon = obj.icon
		let iconUrl: string | null = null
		
		if (typeof icon === 'object' && icon !== null && 'url' in icon && icon.url) {
			// Convert absolute URL to relative path for local images
			// http://localhost:3000/api/media/file/x.png -> /api/media/file/x.png
			const url = icon.url
			try {
				const urlObj = new URL(url)
				iconUrl = urlObj.pathname
			} catch {
				// If URL parsing fails, use as-is
				iconUrl = url
			}
		} else if (typeof icon === 'number') {
			console.warn(`Icon for "${obj.title}" is not populated (id: ${icon}). Check depth in findGlobal.`)
		}

		if (!iconUrl) {
			console.warn(`Missing icon URL for objective: ${obj.title}`)
			iconUrl = '/placeholder.png'
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
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
				>
					<motion.h2
						className="text-3xl md:text-4xl font-bold tracking-tight text-white"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: durations.standard, delay: 0.1 }}
						data-payload-field="objectivesSection.title"
					>
						{title.split(' ').slice(0, -1).join(' ')}{' '}
						<motion.span
							className="text-accent font-handwriting text-4xl md:text-5xl drop-shadow-md inline-block"
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
						whileInView={{ opacity: 0.7 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.3 }}
						data-payload-field="objectivesSection.subtitle"
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
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.1 }}
									transition={{
										delay: index * 0.06,
										duration: 0.7,
										ease: [0.25, 0.1, 0.25, 1],
									}}
									whileHover={{ scale: 1.03, y: -4 }}
									whileTap={{ scale: 0.98 }}
								>
									{/* Icon container - static */}
									<div className="relative w-16 h-16 md:w-20 md:h-20 mb-4">
										{/* Glow effect */}
										<motion.div
											className="absolute inset-0 rounded-full bg-accent/20 blur-xl"
											animate={{
												opacity: [0.2, 0.4, 0.2],
											}}
											transition={{
												duration: 4,
												repeat: Number.POSITIVE_INFINITY,
												delay: index * 0.3,
												ease: 'easeInOut',
											}}
										/>

										<Image
											src={objective.iconUrl}
											alt={objective.title}
											fill
											className="object-contain drop-shadow-lg relative z-10"
										/>
									</div>

									{/* Title with slide up */}
									<motion.h3
										className="font-bold text-base md:text-lg text-white mb-1"
										initial={{ opacity: 0 }}
										whileInView={{ opacity: 1 }}
										viewport={{ once: true }}
										transition={{ delay: index * 0.06 + 0.2, duration: 0.5 }}
									>
										{objective.title}
									</motion.h3>

									{/* Hint text with subtle animation */}
									<motion.p
										className="text-xs text-white/50 mt-1"
										initial={{ opacity: 0 }}
										whileInView={{ opacity: 0.5 }}
										viewport={{ once: true }}
										transition={{ delay: index * 0.06 + 0.3, duration: 0.5 }}
										whileHover={{ opacity: 0.8, transition: { duration: 0.3 } }}
									>
										Cliquer pour en savoir plus
									</motion.p>
								</motion.button>
							</ResponsiveModalTrigger>

							<ResponsiveModalContent className="bg-linear-to-br from-primary via-secondary to-primary border-accent/20">
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
