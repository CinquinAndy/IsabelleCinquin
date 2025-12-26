'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { durations, easings } from '@/lib/animations'
import { formatMediaUrl } from '@/lib/utils'
import type { Landing } from '@/payload-types'

interface AdaptationProps {
	adaptation?: Landing['adaptation'] | null
}

const badgeColors: Record<string, string> = {
	pink: 'bg-linear-to-r from-pink-500 to-rose-500',
	violet: 'bg-linear-to-r from-violet-500 to-purple-500',
	amber: 'bg-linear-to-r from-amber-500 to-orange-500',
	emerald: 'bg-linear-to-r from-emerald-500 to-teal-500',
}

export function Adaptation({ adaptation }: AdaptationProps) {
	if (!adaptation?.title || !adaptation?.badges || !adaptation?.image) {
		throw new Error('Missing required data for Adaptation section')
	}

	const title = adaptation.title
	const subtitle = adaptation.subtitle
	const keyMessage = adaptation.keyMessage
	const badges = adaptation.badges

	const mediaUrl = formatMediaUrl(
		typeof adaptation.image === 'object' && adaptation.image?.url ? adaptation.image.url : null
	)

	if (!mediaUrl) throw new Error('Missing image for Adaptation section')

	const mediaAlt =
		typeof adaptation.image === 'object' && adaptation.image?.alt ? adaptation.image.alt : "Période d'adaptation"

	// Extract icon URLs from media objects
	const displayBadges = badges.map(badge => {
		// Icon can be a populated object or just an ID
		const icon = badge.icon
		let iconUrl: string | null = null
		
		if (typeof icon === 'object' && icon !== null && 'url' in icon && icon.url) {
			iconUrl = formatMediaUrl(icon.url)
		} else if (typeof icon === 'number') {
			console.warn(`Icon for badge "${badge.text}" is not populated (id: ${icon}). Check depth in findGlobal.`)
		}

		if (!iconUrl) {
			console.warn(`Missing icon URL for badge: ${badge.text}`)
			iconUrl = '/placeholder.png'
		}

		return { ...badge, iconUrl }
	})

	return (
		<SectionWrapper id="adaptation" variant="primary" className="overflow-hidden">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Left - Image with Ken Burns effect */}
					<motion.div
						className="relative"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: durations.slow, ease: easings.smooth }}
					>
						{/* Decorative wavy border */}
						<motion.div
							className="absolute -inset-4 bg-white/10 rounded-4xl -rotate-2"
							initial={{ scale: 0.9, opacity: 0 }}
							whileInView={{ scale: 1, opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: durations.standard, ease: easings.smooth, delay: 0.2 }}
						/>
						<motion.div
							className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl -rotate-2"
							whileHover={{ scale: 1.02, rotate: 0 }}
							transition={{ duration: durations.fast }}
						>
							<motion.div
								className="w-full h-full"
								initial={{ scale: 1.2 }}
								whileInView={{ scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: durations.verySlow, ease: easings.smooth }}
							>
								<Image src={mediaUrl} alt={mediaAlt} fill className="object-cover" />
							</motion.div>
						</motion.div>
					</motion.div>

					{/* Right - Content */}
					<div className="space-y-8">
						{/* Title */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: durations.standard, ease: easings.smooth, delay: 0.3 }}
						>
							<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
								{title.split(' ').slice(0, -1).join(' ')}{' '}
								<span className="font-handwriting text-white/80">{title.split(' ').slice(-1)}</span>
							</h2>
							<p className="mt-4 text-lg text-white/70 leading-relaxed max-w-lg">{subtitle}</p>
						</motion.div>

						{/* Colorful Badges with stagger and bounce */}
						<motion.div
							className="flex flex-wrap gap-4"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							variants={{
								hidden: {},
								visible: {
									transition: {
										staggerChildren: 0.1,
										delayChildren: 0.5,
									},
								},
							}}
						>
							{displayBadges.map((badge, index) => (
								<motion.div
									key={badge.text || `badge-${index}`}
									className={`
										inline-flex items-center gap-3 px-5 py-2.5 rounded-full
										${badgeColors[badge.color || 'pink']} text-white font-semibold text-sm
										shadow-lg shadow-black/20
									`}
									style={{
										transform: `rotate(${index % 2 === 0 ? '-2deg' : '2deg'})`,
									}}
									variants={{
										hidden: { opacity: 0, y: 20, scale: 0.8 },
										visible: { opacity: 1, y: 0, scale: 1 },
									}}
									transition={{
										duration: durations.standard,
										ease: easings.bounce,
									}}
									whileHover={{
										scale: 1.1,
										rotate: 0,
										y: -5,
									}}
								>
									<div className="relative w-8 h-8 -ml-1">
										<Image src={badge.iconUrl} alt={badge.text} fill className="object-contain" />
									</div>
									{badge.text}
								</motion.div>
							))}
						</motion.div>

						{/* Key message */}
						<motion.div
							className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: durations.standard, ease: easings.smooth, delay: 0.7 }}
						>
							<p className="text-white/90 font-medium">{keyMessage}</p>
						</motion.div>
					</div>
				</div>
			</div>
		</SectionWrapper>
	)
}
