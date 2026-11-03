'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { durations, easings } from '@/lib/animations'
import { formatMediaUrl } from '@/lib/utils'
import type { Landing } from '@/payload-types'

interface LivingPlaceProps {
	livingPlace?: Landing['livingPlace'] | null
}

export function LivingPlace({ livingPlace }: LivingPlaceProps) {
	if (!livingPlace?.title || !livingPlace?.description) {
		throw new Error('Missing required data for Living Place section')
	}

	const title = livingPlace.title
	const description = livingPlace.description

	// Extract image URL from Payload media object
	const imageUrl = formatMediaUrl(
		typeof livingPlace.image === 'object' && livingPlace.image?.url ? livingPlace.image.url : null
	)
	const imageAlt =
		typeof livingPlace.image === 'object' && livingPlace.image?.alt ? livingPlace.image.alt : 'Lieu de vie'

	return (
		<SectionWrapper id="lieu-de-vie" variant="primary">
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

			<div className="max-w-3xl mx-auto">
				{/* Description with icon badge */}
				<motion.div
					className="text-center space-y-6 mb-10"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: durations.standard, delay: 0.2, ease: easings.smooth }}
				>
					<motion.p
						className="text-lg md:text-xl leading-relaxed text-white/90"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: durations.standard, delay: 0.4 }}
					>
						{description}
					</motion.p>
				</motion.div>

				{/* Image with parallax and hover effect */}
				{imageUrl && (
					<motion.div
						className="relative group"
						initial={{ opacity: 0, y: 40, scale: 0.95 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: durations.verySlow, delay: 0.3, ease: easings.smooth }}
						whileHover={{ scale: 1.02 }}
					>
						{/* Glowing border effect */}
						<div className="absolute -inset-1 bg-linear-to-r from-accent/30 via-purple-400/30 to-accent/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

						<div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10">
							{/* Image overlay gradient */}
							<div className="absolute inset-0 bg-linear-to-t from-secondary/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

							<motion.div
								className="relative w-full h-full"
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.6, ease: easings.smooth }}
							>
								<Image
									src={imageUrl}
									alt={imageAlt}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 768px"
								/>
							</motion.div>

							{/* Corner accent */}
							<div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-accent/40 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							<div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-accent/40 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						</div>
					</motion.div>
				)}
			</div>
		</SectionWrapper>
	)
}
