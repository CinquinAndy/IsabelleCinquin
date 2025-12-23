'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import type { LandingHero } from '@/types/landing'
import { useCloudShader } from './use-cloud-shader'

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

export function Hero({ hero }: HeroProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	useCloudShader(canvasRef)

	// Mask styles for window effect
	const maskStyle = {
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
	} as React.CSSProperties

	if (!hero) {
		throw new Error('Missing required data for Hero section')
	}

	return (
		<section className="relative h-screen w-full overflow-hidden z-20 bg-primary">
			{/* Layer 1 (z-0): WebGL Canvas - clouds masked to center window */}
			<div className="absolute inset-0 z-0" style={maskStyle}>
				<canvas ref={canvasRef} className="h-full w-full" tabIndex={-1} />
			</div>

			{/* Layer 2 (z-10): Content masked - title + image visible only in center */}
			<div className="absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center" style={maskStyle}>
				<div className="text-center px-4 w-full h-full flex flex-col items-center justify-center relative">
					<Image
						src="/bear.png"
						alt="Mask Deco"
						width={1600}
						height={1600}
						className="absolute bottom-0 left-1/2 -translate-x-100 -z-10 translate-y-100"
					/>
					<h1 className="mb-4 text-5xl md:text-7xl font-bold text-white drop-shadow-lg z-10">{hero.title}</h1>
					<p className="text-xl md:text-2xl text-white/90 drop-shadow-md max-w-2xl mx-auto z-10">{hero.subtitle}</p>

					{hero.buttons && hero.buttons.length > 0 && (
						<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center z-10">
							{hero.buttons.map((btn, i) => (
								<Link
									key={i}
									href={btn.url}
									className={`inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold transition-all hover:scale-105 ${
										btn.variant === 'primary'
											? 'bg-white text-primary shadow-lg hover:bg-white/90'
											: 'border-2 border-white/50 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20'
									}`}
								>
									{btn.text}
								</Link>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Layer 3 (z-20): Decorative elements */}
			<div className="pointer-events-none absolute inset-0 z-20">
				<Image src="/mask_deco.svg" alt="" aria-hidden="true" style={svgOverlayStyle} width={100} height={100} />
			</div>
		</section>
	)
}
