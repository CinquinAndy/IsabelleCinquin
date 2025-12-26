'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { durations, easings, springs } from '@/lib/animations'
import type { LandingHero } from '@/types/landing'
import { useCloudShader } from './use-cloud-shader'

// Hook to detect if we're on desktop/tablet (md: 768px+)
function useIsDesktop() {
	const [isDesktop, setIsDesktop] = useState(false)

	useEffect(() => {
		const checkSize = () => setIsDesktop(window.innerWidth >= 768)
		checkSize()
		window.addEventListener('resize', checkSize)
		return () => window.removeEventListener('resize', checkSize)
	}, [])

	return isDesktop
}

interface HeroProps {
	hero?: LandingHero | null
}


// Magnetic button component
function MagneticButton({
	children,
	href,
	isPrimary,
}: {
	children: React.ReactNode
	href: string
	isPrimary: boolean
}) {
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const buttonRef = useRef<HTMLAnchorElement>(null)

	const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (!buttonRef.current) return
		const rect = buttonRef.current.getBoundingClientRect()
		const x = e.clientX - rect.left - rect.width / 2
		const y = e.clientY - rect.top - rect.height / 2
		setPosition({ x: x * 0.3, y: y * 0.3 })
	}

	const handleMouseLeave = () => {
		setPosition({ x: 0, y: 0 })
	}

	return (
		<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={springs.snappy}>
			<Link
				ref={buttonRef}
				href={href}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				className={`inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold transition-all ${isPrimary
					? 'bg-white text-primary shadow-lg hover:shadow-xl'
					: 'border-2 border-white/50 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20'
					}`}
				style={{
					transform: `translate(${position.x}px, ${position.y}px)`,
					transition: 'transform 0.2s ease-out',
				}}
			>
				{children}
			</Link>
		</motion.div>
	)
}

export function Hero({ hero }: HeroProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const isDesktop = useIsDesktop()
	useCloudShader(canvasRef)

	if (!hero) {
		throw new Error('Missing required data for Hero section')
	}

	// Conditional mask class (desktop only)
	const maskClass = isDesktop ? 'hero-mask' : ''

	return (
		<section className="relative h-screen w-full overflow-hidden bg-primary">
			{/* z-15 | Bear - above shader, below decoration */}
			<motion.div
				className={`pointer-events-none absolute inset-0 z-[15] ${maskClass}`}
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ ...springs.gentle, delay: 0.2 }}
			>
				<Image
					src="/bear.png"
					alt="Bear"
					width={1200}
					height={1200}
					className="absolute bottom-0 right-0 w-[100vw] sm:w-[45vw] md:w-[35vw] lg:w-[65vw] xl:w-[60vw] 
					lg:translate-y-[20%] xl:translate-y-[25%] scale-250 lg:scale-100 translate-x-[35%] lg:translate-x-[10%]"
				/>
			</motion.div>

			{/* z-10 | Masked shader - window that reveals the bear */}
			<div className={`absolute inset-0 z-10 ${maskClass}`}>
				<canvas ref={canvasRef} className="h-full w-full" tabIndex={-1} />
			</div>

			{/* z-20 | Mask decoration (border/ornaments) */}
			{isDesktop && (
				<div className="pointer-events-none absolute inset-0 z-20">
					<Image src="/mask_deco.svg" alt="" aria-hidden="true" className="hero-svg-overlay" width={100} height={100} />
				</div>
			)}

			{/* z-50 | Text content - above everything */}
			<div className="absolute inset-0 z-50 flex h-full w-full flex-col items-center justify-center">
				<div className="text-center px-4 sm:px-8 w-full max-w-4xl mx-auto flex flex-col items-center justify-center relative">
					<motion.h1
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: durations.slow, ease: easings.smooth, delay: 0.3 }}
						className="mb-2 sm:mb-4 text-3xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-lg"
					>
						<span className="bg-linear-to-r from-white via-white/90 to-white bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
							{hero.title}
						</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: durations.standard, ease: easings.smooth, delay: 0.5 }}
						className="text-base sm:text-xl md:text-2xl text-white/90 drop-shadow-md max-w-xs sm:max-w-xl md:max-w-2xl mx-auto px-2"
					>
						{hero.subtitle}
					</motion.p>

					{hero.buttons && hero.buttons.length > 0 && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: durations.standard, ease: easings.smooth, delay: 0.7 }}
							className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
						>
							{hero.buttons.map(btn => (
								<MagneticButton key={btn.url} href={btn.url} isPrimary={btn.variant === 'primary'}>
									{btn.text}
								</MagneticButton>
							))}
						</motion.div>
					)}
				</div>
			</div>
		</section>
	)
}
