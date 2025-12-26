'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { durations, easings, springs } from '@/lib/animations'
import type { LandingHero } from '@/types/landing'
import { useCloudShader } from './use-cloud-shader'

// Hook pour détecter si on est sur desktop/tablette (md: 768px+)
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

// Shared SVG sizing styles for consistent overlay
const svgOverlayStyle: React.CSSProperties = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	objectPosition: 'center',
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

	// Mask styles - appliqué uniquement sur desktop/tablette
	const maskStyle = isDesktop ? {
		maskImage: 'url(/mask.svg)',
		WebkitMaskImage: 'url(/mask.svg)',
		maskMode: 'luminance',
		WebkitMaskMode: 'luminance',
		maskSize: 'cover',
		WebkitMaskSize: 'cover',
		maskPosition: 'center',
		WebkitMaskPosition: 'center',
		maskRepeat: 'no-repeat',
		WebkitMaskRepeat: 'no-repeat',
	} as React.CSSProperties : {}

	if (!hero) {
		throw new Error('Missing required data for Hero section')
	}

	return (
		<section className="relative h-screen w-full overflow-hidden z-20 bg-primary">
			{/* Layer 0 (z-0): WebGL Canvas - masqué sur desktop, plein écran sur mobile */}
			<div className="absolute inset-0 z-0" style={maskStyle}>
				<canvas ref={canvasRef} className="h-full w-full" tabIndex={-1} />
			</div>

			{/* Layer 1 (z-15): Bear - derrière le masque décoratif */}
			<motion.div
				className="pointer-events-none absolute inset-0 z-15"
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ ...springs.gentle, delay: 0.2 }}
			>
				<Image
					src="/bear.png"
					alt="Mask Deco"
					width={1200}
					height={1200}
					className="absolute bottom-0 left-1/2 -translate-x-40 translate-y-60 w-[1000px] -z-10"
				/>
			</motion.div>

			{/* Layer 2 (z-20): Content - texte centré */}
			<div className="absolute inset-0 z-20 flex h-full w-full flex-col items-center justify-center">
				<div className="text-center px-4 sm:px-8 w-full max-w-4xl mx-auto flex flex-col items-center justify-center relative">
					<motion.h1
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: durations.slow, ease: easings.smooth, delay: 0.3 }}
						className="mb-2 sm:mb-4 text-3xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-lg z-10 relative"
					>
						<span className="bg-linear-to-r from-white via-white/90 to-white bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
							{hero.title}
						</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: durations.standard, ease: easings.smooth, delay: 0.5 }}
						className="text-base sm:text-xl md:text-2xl text-white/90 drop-shadow-md max-w-xs sm:max-w-xl md:max-w-2xl mx-auto z-10 px-2"
					>
						{hero.subtitle}
					</motion.p>

					{hero.buttons && hero.buttons.length > 0 && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: durations.standard, ease: easings.smooth, delay: 0.7 }}
							className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center z-10"
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

			{/* Layer 3 (z-20): Decorative elements - visible uniquement sur desktop */}
			{isDesktop && (
				<div className="pointer-events-none absolute inset-0 z-30">
					<Image src="/mask_deco.svg" alt="" aria-hidden="true" style={svgOverlayStyle} width={100} height={100} />
				</div>
			)}
		</section>
	)
}
