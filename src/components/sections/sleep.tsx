'use client'

import { motion } from 'framer-motion'
import { Moon } from 'lucide-react'
import Image from 'next/image'
import { RichTextParser } from '@/components/rich-text-parser'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import type { LandingSleep } from '@/types/landing'

interface SleepProps {
	sleepSection?: LandingSleep | null
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
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
					{title.split(' ').slice(0, -1).join(' ')}{' '}
					<span className="font-handwriting text-white/80">{title.split(' ').slice(-1)}</span>
				</h2>
			</div>

			<div className="max-w-4xl mx-auto">
				<motion.div
					className="relative overflow-hidden rounded-3xl bg-sidebar/60 backdrop-blur-xl border border-white/10 shadow-2xl"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<div className="relative flex flex-col md:flex-row items-center gap-24 p-8 md:p-12">
						{/* Left: Icon/Illustration */}
						<div className="relative shrink-0">
							{/* Circle background */}
							<div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full bg-secondary/50 flex items-center justify-center">
								{/* SVG Illustration */}
								<Image
									src="/icons/scribbbles/7/SVG/Fichier 2.svg"
									alt="Illustration lit enfant"
									width={130}
									height={130}
									className="relative z-10 drop-shadow-lg"
								/>
							</div>

							{/* Floating tags - dynamically rendered from Payload */}
							{tags.map((tag, index) => {
								const positions = [
									{ className: 'absolute -top-2 right-0', delay: 0.3 },
									{ className: 'absolute bottom-4 -left-4', delay: 0.4 },
									{ className: 'absolute top-1/2 -right-6', delay: 0.5, accent: true },
								]
								const position = positions[index % positions.length]

								return (
									<motion.div
										key={tag.id || index}
										className={`${position.className} ${position.accent ? 'bg-accent/80' : 'bg-white/15 backdrop-blur-md border border-white/20'} rounded-full px-3 py-1.5`}
										initial={{ opacity: 0, scale: 0.8 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{ once: true }}
										transition={{ delay: position.delay }}
									>
										<span className={`text-xs ${position.accent ? 'font-bold' : 'font-medium'} text-white`}>
											{tag.text}
										</span>
									</motion.div>
								)
							})}
						</div>

						{/* Right: Content */}
						<div className="flex-1 text-center md:text-left">
							{/* Small icon badge */}
							<div className="inline-flex items-center gap-3 mb-4">
								<div className="w-9 h-9 rounded-xl bg-accent/30 flex items-center justify-center">
									<Moon className="w-4 h-4 text-white" />
								</div>
								<span className="text-xs font-semibold text-white/60 uppercase tracking-widest">{subtitle}</span>
							</div>

							<div className="text-lg md:text-xl text-white leading-relaxed">
								{sleepSection.content && <RichTextParser content={sleepSection.content} />}
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</SectionWrapper>
	)
}
