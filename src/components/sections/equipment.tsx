'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { easings } from '@/lib/animations'
import type { Landing } from '@/payload-types'

interface EquipmentProps {
	equipmentSection?: Landing['equipmentSection'] | null
}

// Animated icon with orbital floating + rotation
function FloatingIcon({ src, alt, delay = 0 }: { src: string; alt: string; delay?: number }) {
	return (
		<motion.div
			animate={{
				y: [0, -12, 0],
				x: [0, 5, -5, 0],
				rotate: [0, 8, -8, 0],
			}}
			transition={{
				duration: 7,
				repeat: Number.POSITIVE_INFINITY,
				ease: easings.gentle,
				delay,
			}}
			whileHover={{ scale: 1.15, rotate: 15, y: -5 }}
			className="relative filter drop-shadow-lg"
			style={{ width: 80, height: 80 }}
		>
			<Image 
				src={src} 
				alt={alt} 
				width={80} 
				height={80} 
				className="object-contain w-full h-full" 
			/>
		</motion.div>
	)
}

// Animated quantity badge with pulse
function QuantityBadge({ quantity, isVisible }: { quantity: number; isVisible: boolean }) {
	return (
		<motion.div
			initial={{ scale: 0, opacity: 0, rotate: -20 }}
			animate={{
				scale: isVisible ? [1, 1.05, 1] : 0,
				opacity: isVisible ? 1 : 0,
				rotate: isVisible ? 0 : -20,
			}}
			transition={{
				scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 0.4 },
				opacity: { duration: 0.4, type: 'spring' },
				rotate: { duration: 0.5, type: 'spring', stiffness: 200 },
			}}
			whileHover={{ scale: 1.2, rotate: 5 }}
			className="inline-flex items-center justify-center bg-accent/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 shadow-lg"
		>
			×{quantity}
		</motion.div>
	)
}

export function Equipment({ equipmentSection }: EquipmentProps) {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		console.log('Equipment section:', equipmentSection)
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

	const items = equipment.map((item, index: number) => {
		// Icon can be a populated object or just an ID
		const icon = item.icon
		let iconUrl: string | null = null
		
		if (typeof icon === 'object' && icon !== null && 'url' in icon && icon.url) {
			// Convert absolute URL to relative path for local images
			// http://localhost:3000/api/media/file/x.png -> /api/media/file/x.png
			const url = icon.url
			try {
				const urlObj = new URL(url)
				iconUrl = urlObj.pathname // Get only the path part
			} catch {
				// If URL parsing fails, use as-is
				iconUrl = url
			}
		} else if (typeof icon === 'number') {
			// If it's just an ID, the image is not populated
			console.warn(`Icon for "${item.name}" is not populated (id: ${icon}). Check depth in findGlobal.`)
		}

		if (!iconUrl) {
			// Don't crash, use placeholder
			console.warn(`Missing icon URL for equipment item: ${item.name || 'Unknown'}`)
			iconUrl = '/placeholder.png'
		}

		return {
			...item,
			iconUrl,
			gridSpan: gridSpans[index % gridSpans.length] as 'single' | 'double' | 'tall',
		}
	}).filter(item => item.iconUrl !== null)

	return (
		<SectionWrapper id="equipements" variant="secondary">
			<div className="absolute bottom-0 right-0 flex justify-center translate-y-6 md:translate-y-8 xl:translate-y-10 z-20 pointer-events-none">
				<Image src="/fox.png" alt="fox" width={800} height={800} className="w-[300px] lg:w-[400px] xl:w-[500px] h-auto" />
			</div>
			<div className="text-center mb-12">
				<motion.h2
					className="text-3xl md:text-4xl font-bold text-white tracking-tight"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.7, delay: 0.1, ease: easings.smooth }}
					data-payload-field="equipmentSection.title"
				>
					{title.split(' ').slice(0, -1).join(' ')}{' '}
					<motion.span
						className="font-handwriting text-accent drop-shadow-md inline-block"
						initial={{ opacity: 0, rotate: -5 }}
						whileInView={{ opacity: 1, rotate: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.3, ease: easings.bounce }}
					>
						{title.split(' ').slice(-1)}
					</motion.span>
				</motion.h2>

				<motion.p
					className="mt-4 text-lg text-white/70 max-w-2xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2 }}
					data-payload-field="equipmentSection.subtitle"
				>
					{subtitle}
				</motion.p>
			</div>

			{/* Bento Grid */}
			<div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px]">
				{items.map((item, index) => {
					const isDouble = item.gridSpan === 'double'
					const isTall = item.gridSpan === 'tall'
					const gridClass = isDouble ? 'md:col-span-2' : isTall ? 'md:col-span-2 md:row-span-2' : 'md:col-span-2'

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
								<FloatingIcon src={item.iconUrl} alt={item.name} delay={index * 0.2} />
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
