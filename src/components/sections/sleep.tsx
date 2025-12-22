'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Moon } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { SectionTitle } from '@/components/ui/section-title'

interface SleepProps {
	content?: unknown
}

export function Sleep(_props: SleepProps) {
	return (
		<SectionWrapper id="sommeil" variant="primary">
			<SectionTitle>Le sommeil</SectionTitle>

			<div className="max-w-4xl mx-auto">
				<motion.div
					className="relative overflow-hidden rounded-3xl bg-sidebar/60 backdrop-blur-xl border border-white/10 shadow-2xl"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<div className="relative flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
						{/* Left: Icon/Illustration */}
						<div className="relative shrink-0">
							{/* Circle background */}
							<div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full bg-secondary/50 flex items-center justify-center">
								{/* SVG Illustration */}
								<Image
									src="/icons/scribbbles/7/SVG/Fichier 2.svg"
									alt="Illustration lit enfant"
									width={150}
									height={150}
									className="relative z-10 drop-shadow-lg"
								/>
							</div>
						</div>

						{/* Right: Content */}
						<div className="flex-1 text-center md:text-left">
							{/* Small icon badge */}
							<div className="inline-flex items-center gap-3 mb-5">
								<div className="w-10 h-10 rounded-xl bg-accent/30 flex items-center justify-center">
									<Moon className="w-5 h-5 text-white" />
								</div>
								<span className="text-sm font-semibold text-white/60 uppercase tracking-widest">
									Les siestes
								</span>
							</div>

							<p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
								Chez nounou, les enfants dorment dans un{' '}
								<span className="text-accent font-bold">lit à barreaux</span>, chacun dans une{' '}
								<span className="text-accent font-bold">chambre séparée</span> pour plus de confort et de
								sérénité.
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</SectionWrapper>
	)
}
