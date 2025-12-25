'use client'

import NumberFlow from '@number-flow/react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { RichText } from '@/components/ui/rich-text'
import { durations, easings, stagger } from '@/lib/animations'
import { formatMediaUrl } from '@/lib/utils'
import type { LandingAbout } from '@/types/landing'

interface AboutSectionProps {
	about?: LandingAbout | null
}

export function AboutSection({ about }: AboutSectionProps) {
	const [isStatsVisible, setIsStatsVisible] = useState(false)

	if (!about) {
		throw new Error('Missing required data for About section')
	}

	const mediaUrl = formatMediaUrl(typeof about.image === 'object' && about.image?.url ? about.image.url : null)
	const mediaAlt = typeof about.image === 'object' && about.image?.alt ? about.image.alt : 'Photo Isabelle'

	return (
		<section id="presentation" className="relative w-full py-20 md:py-28 px-4 md:px-8 bg-secondary">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
					{/* Image - 40% */}
					<motion.div
						className="w-full lg:w-[40%] flex items-center justify-center relative"
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: durations.slow, ease: easings.smooth }}
					>
						<div className="relative z-20 w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl">
							{mediaUrl ? (
								<Image
									src={mediaUrl}
									alt={mediaAlt}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 256px, 320px"
								/>
							) : (
								<div className="w-full h-full bg-white/20" />
							)}
						</div>
						<motion.div
							animate={{
								scale: [1, 1.03, 0.98, 1],
								y: [0, -10, 5, 0],
								x: [0, 3, -3, 0],
								rotate: [0, 2, -2, 0],
							}}
							transition={{
								duration: 16,
								repeat: Number.POSITIVE_INFINITY,
								ease: [0.45, 0.05, 0.55, 0.95],
							}}
							className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary/75 w-64 h-64 md:w-96 md:h-96 
                            rounded-full m-6 z-10"
						/>
						<motion.div
							animate={{
								y: [0, -12, 8, 0],
								x: [0, 4, -2, 0],
								rotate: [0, 8, -5, 0],
							}}
							transition={{
								duration: 18,
								repeat: Number.POSITIVE_INFINITY,
								ease: [0.42, 0, 0.58, 1],
							}}
							className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30"
						>
							<Image
								src="/icons/scribbbles/1/SVG/Fichier 46.svg"
								alt="Scribble"
								width={100}
								height={100}
								className="-translate-x-24 translate-y-12"
							/>
						</motion.div>
						<motion.div
							animate={{
								y: [0, 10, -6, 0],
								x: [0, -5, 3, 0],
								rotate: [0, -6, 4, 0],
							}}
							transition={{
								duration: 20,
								repeat: Number.POSITIVE_INFINITY,
								ease: [0.37, 0, 0.63, 1],
								delay: 1,
							}}
							className="absolute top-0 right-1/2 -translate-x-1/2 z-30"
						>
							<Image
								src="/icons/scribbbles/1/SVG/Fichier 48.svg"
								alt="Scribble"
								width={150}
								height={150}
								className="translate-x-84 translate-y-20"
							/>
						</motion.div>
						<motion.div
							animate={{
								y: [0, -8, 6, 0],
								x: [0, 6, -4, 0],
								rotate: [0, 10, -8, 0],
							}}
							transition={{
								duration: 17,
								repeat: Number.POSITIVE_INFINITY,
								ease: [0.4, 0, 0.6, 1],
								delay: 0.5,
							}}
							className="absolute top-0 left-0 z-30"
						>
							<Image
								src="/icons/scribbbles/1/SVG/Fichier 12.svg"
								alt="Scribble"
								width={75}
								height={75}
								className="translate-x-40 -translate-y-10"
							/>
						</motion.div>
					</motion.div>

					{/* Content - 60% */}
					<motion.div
						className="w-full lg:w-[60%] text-center lg:text-left"
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: durations.slow, ease: easings.smooth, delay: 0.2 }}
					>
						{about.badge && (
							<motion.span
								className="inline-block bg-white text-secondary font-bold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-6"
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: durations.standard, ease: easings.smooth, delay: 0.3 }}
							>
								{about.badge}
							</motion.span>
						)}

						<motion.h2
							className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: durations.standard, ease: easings.smooth, delay: 0.4 }}
						>
							{about.title}
							<br />
							<span className="text-accent">{about.titleAccent}</span>
						</motion.h2>

						<motion.div
							className="space-y-5 text-white text-lg leading-relaxed"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: durations.standard, ease: easings.smooth, delay: 0.5 }}
						>
							<RichText content={about.content} variant="dark" />

							{/* Stats Cards - Style like screenshot */}
							{about.stats && about.stats.length > 0 && (
								<motion.div
									className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10"
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true }}
									onViewportEnter={() => {
										// Trigger NumberFlow animation with delay
										setTimeout(() => setIsStatsVisible(true), 300)
									}}
									variants={{
										hidden: {},
										visible: {
											transition: {
												staggerChildren: stagger.standard,
												delayChildren: 0.6,
											},
										},
									}}
								>
									{about.stats.map(stat => (
										<motion.div
											key={stat.label}
											className="bg-sidebar border border-white/10 rounded-2xl p-6 text-center"
											variants={{
												hidden: { opacity: 0, y: 30, scale: 0.9 },
												visible: {
													opacity: 1,
													y: 0,
													scale: 1,
													transition: {
														duration: durations.standard,
														ease: easings.smooth,
													},
												},
											}}
										>
											<div className="text-3xl md:text-5xl font-handwriting text-accent">
												<NumberFlow value={isStatsVisible ? stat.value : 0} suffix={stat.suffix || ''} />
											</div>
											<h3 className="text-base font-light text-white/70 mt-4 uppercase tracking-wider">{stat.label}</h3>
										</motion.div>
									))}
								</motion.div>
							)}
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
