'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import type { LandingEquipment, LandingEquipmentSection } from '@/types/landing'

interface EquipmentItem extends LandingEquipment {
	icon: string
	gridSpan?: 'single' | 'double' | 'tall'
}

interface EquipmentProps {
	equipmentSection?: LandingEquipmentSection | null
}

// Animated icon component with floating effect
function FloatingIcon({ src, alt, delay = 0 }: { src: string; alt: string; delay?: number }) {
	return (
		<motion.div
			animate={{ y: [0, -8, 0] }}
			transition={{
				duration: 4,
				repeat: Number.POSITIVE_INFINITY,
				ease: 'easeInOut',
				delay,
			}}
			className="relative w-16 h-16 md:w-20 md:h-20 filter drop-shadow-lg"
		>
			<Image src={src} alt={alt} fill className="object-contain" />
		</motion.div>
	)
}

// Animated quantity badge
function QuantityBadge({ quantity, isVisible }: { quantity: number; isVisible: boolean }) {
	return (
		<motion.div
			initial={{ scale: 0, opacity: 0 }}
			animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }}
			transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
			className="inline-flex items-center justify-center bg-accent/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20"
		>
			×{quantity}
		</motion.div>
	)
}

export function Equipment({ equipmentSection }: EquipmentProps) {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 200)
		return () => clearTimeout(timer)
	}, [])

	if (!equipmentSection?.title || !equipmentSection?.items) {
		throw new Error('Missing required data for Equipment section: title or items')
	}

	const title = equipmentSection.title
	const subtitle = equipmentSection.subtitle
	const equipment = equipmentSection.items

	// Assign dynamic grid spans for bento layout variety
	const gridSpans: Array<'single' | 'double' | 'tall'> = ['double', 'single', 'tall', 'single', 'single', 'double']

	const items: EquipmentItem[] = equipment.map((item: LandingEquipment, index: number) => {
		if (!item.icon) {
			throw new Error(`Missing icon for equipment item: ${item.name || 'Unknown'}`)
		}

		return {
			...item,
			icon: item.icon,
			gridSpan: gridSpans[index % gridSpans.length],
		}
	})

	return (
		<SectionWrapper id="equipements" variant="secondary">
			<div className="text-center mb-12">
				<motion.h2
					className="text-3xl md:text-4xl font-bold text-white tracking-tight"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.1 }}
				>
					{title.split(' ').slice(0, -1).join(' ')}{' '}
					<span className="font-handwriting text-accent">{title.split(' ').slice(-1)}</span>
				</motion.h2>

				<motion.p
					className="mt-4 text-lg text-white/70 max-w-2xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2 }}
				>
					{subtitle}
				</motion.p>
			</div>

			{/* Bento Grid */}
			<div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px]">
				{items.map((item, index) => {
					const isDouble = item.gridSpan === 'double'
					const isTall = item.gridSpan === 'tall'
					const gridClass = isDouble
						? 'md:col-span-2'
						: isTall
							? 'md:col-span-2 md:row-span-2'
							: 'md:col-span-2'

					return (
						<motion.div
							key={item.id || index}
							className={`relative bg-sidebar/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col hover:border-white/20 transition-all cursor-pointer overflow-hidden ${gridClass}`}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							whileHover={{
								scale: 0.98,
								backgroundColor: 'rgba(62, 43, 102, 0.6)',
							}}
						>
							{/* Gradient overlay */}
							<div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

							{/* Top highlight */}
							<div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />

							{/* Content */}
							<div className="flex-1 flex items-center justify-center">
								<FloatingIcon src={item.icon} alt={item.name} delay={index * 0.2} />
							</div>

							{/* Text content */}
							<div className="mt-auto relative z-20">
								<h3 className="font-display text-xl text-white font-medium">{item.name}</h3>
							</div>

							{/* Quantity badge - absolute bottom-right */}
							{item.quantity && item.quantity > 1 && (
								<div className="absolute bottom-4 right-4 z-20">
									<QuantityBadge quantity={item.quantity} isVisible={isVisible} />
								</div>
							)}
						</motion.div>
					)
				})}
			</div>
		</SectionWrapper>
	)
}
