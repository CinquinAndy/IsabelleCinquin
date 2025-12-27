'use client'

import { motion } from 'framer-motion'
import { Moon } from 'lucide-react'
import Image from 'next/image'
import { RichText } from '@/components/ui/rich-text'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { durations, easings } from '@/lib/animations'
import type { Landing } from '@/payload-types'

interface SleepProps {
	sleepSection?: Landing['sleep'] | null
}

export function Sleep({ sleepSection }: SleepProps) {
	if (!sleepSection?.title) {
		throw new Error('Missing required data for Sleep section')
	}

	const title = sleepSection.title
	const subtitle = sleepSection.subtitle || 'Les siestes'
	const tags = sleepSection.tags || []

	return (
		<SectionWrapper id="sommeil" variant="primary">
			{/* Title with enhanced animation */}
			<motion.div
				className="text-center mb-12"
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-100px' }}
				transition={{ duration: durations.slow, ease: easings.smooth }}
			>
				<motion.h2
					className="text-3xl md:text-4xl font-bold text-white tracking-tight"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: durations.standard, delay: 0.1 }}
					data-payload-field="sleep.title"
				>
					{title.split(' ').slice(0, -1).join(' ')}{' '}
					<motion.span
						className="font-handwriting text-accent drop-shadow-md inline-block"
						initial={{ opacity: 0, rotate: -5 }}
						whileInView={{ opacity: 1, rotate: 0 }}
						viewport={{ once: true }}
						transition={{ duration: durations.standard, delay: 0.3, ease: easings.bounce }}
					>
						{title.split(' ').slice(-1)}
					</motion.span>
				</motion.h2>
			</motion.div>

			<div className="max-w-4xl mx-auto">
				<motion.div
					className="relative overflow-hidden rounded-3xl bg-sidebar/60 backdrop-blur-xl border border-white/10 shadow-2xl"
					initial={{ opacity: 0, scale: 0.9, y: 40 }}
					whileInView={{ opacity: 1, scale: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: durations.verySlow, ease: easings.smooth, delay: 0.2 }}
					whileHover={{ scale: 1.02, borderColor: 'rgba(255, 255, 255, 0.2)' }}
				>
					<div className="relative flex flex-col md:flex-row items-center gap-24 p-8 md:p-12">
						{/* Left: Icon/Illustration */}
						<motion.div
							className="relative shrink-0"
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: durations.standard, ease: easings.smooth, delay: 0.4 }}
						>
							{/* Circle background with enhanced floating pulse */}
							<motion.div
								className="relative w-44 h-44 md:w-52 md:h-52 rounded-full bg-secondary/50 flex items-center justify-center shadow-lg"
								animate={{
									scale: [1, 1.08, 1],
									opacity: [0.5, 0.7, 0.5],
									y: [0, -8, 0],
									boxShadow: [
										'0 10px 30px rgba(174, 129, 255, 0.2)',
										'0 15px 40px rgba(174, 129, 255, 0.3)',
										'0 10px 30px rgba(174, 129, 255, 0.2)',
									],
								}}
								transition={{
									duration: 5,
									repeat: Number.POSITIVE_INFINITY,
									ease: 'easeInOut',
								}}
							>
								{/* SVG Illustration with gentle float and rotation */}
								<motion.div
									animate={{
										rotate: [0, 8, -8, 0],
										y: [0, -5, 0, 5, 0],
									}}
									transition={{
										duration: 8,
										repeat: Number.POSITIVE_INFINITY,
										ease: 'easeInOut',
									}}
									whileHover={{ scale: 1.1, rotate: 15 }}
								>
									<Image
										src="/icons/scribbbles/7/SVG/Fichier 2.svg"
										alt="Illustration lit enfant"
										width={130}
										height={130}
										className="relative z-10 drop-shadow-lg"
									/>
								</motion.div>
							</motion.div>

							{/* Floating tags - dynamically rendered from Payload */}
							{tags.map((tag, index) => {
								const positions = [
									{ className: 'absolute -top-2 right-0', delay: 0.6 },
									{ className: 'absolute bottom-4 -left-4', delay: 0.7 },
									{ className: 'absolute top-1/2 -right-6', delay: 0.8, accent: true },
								]
								const position = positions[index % positions.length]

								return (
									<motion.div
										key={tag.id || `tag-${index}`}
										className={`${position.className} ${position.accent ? 'bg-accent/80 shadow-lg shadow-accent/30' : 'bg-white/15 backdrop-blur-md border border-white/20'} rounded-full px-3 py-1.5`}
										initial={{ opacity: 0, scale: 0, rotate: -20 }}
										whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
										viewport={{ once: true }}
										transition={{
											type: 'spring',
											stiffness: 200,
											damping: 15,
											delay: position.delay,
										}}
										whileHover={{
											scale: 1.15,
											rotate: 8,
											y: -5,
										}}
									>
										<span className={`text-xs ${position.accent ? 'font-bold' : 'font-medium'} text-white`}>
											{tag.text}
										</span>
									</motion.div>
								)
							})}
						</motion.div>

						{/* Right: Content */}
						<motion.div
							className="flex-1 text-center md:text-left"
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: durations.standard, ease: easings.smooth, delay: 0.5 }}
						>
							{/* Small icon badge with enhanced animation */}
							<motion.div
								className="inline-flex items-center gap-3 mb-4"
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: durations.standard, delay: 0.6, ease: easings.smooth }}
							>
								<motion.div
									className="w-9 h-9 rounded-xl bg-accent/30 flex items-center justify-center"
									animate={{
										rotate: [0, -5, 5, 0],
									}}
									transition={{
										duration: 4,
										repeat: Number.POSITIVE_INFINITY,
										ease: 'easeInOut',
									}}
									whileHover={{ scale: 1.15, rotate: 15 }}
								>
									<Moon className="w-4 h-4 text-white" />
								</motion.div>
								<span className="text-xs font-semibold text-white/60 uppercase tracking-widest" data-payload-field="sleep.subtitle">{subtitle}</span>
							</motion.div>

							<motion.div
								className="text-lg md:text-xl text-white leading-relaxed"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: durations.standard, delay: 0.7 }}
								data-payload-field="sleep.content"
							>
								<RichText content={sleepSection.content} variant="dark" />
							</motion.div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</SectionWrapper>
	)
}
