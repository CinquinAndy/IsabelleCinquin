'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { useCloudShader } from './use-cloud-shader'

interface HeroProps {
	children?: React.ReactNode
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

export function Hero({ children }: HeroProps) {
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

	return (
		<section className="relative h-screen w-full overflow-hidden z-20 bg-primary">
			{/* Layer 1 (z-0): WebGL Canvas - clouds masked to center window */}
			<div className="absolute inset-0 z-0" style={maskStyle}>
				<canvas ref={canvasRef} className="h-full w-full" tabIndex={-1} />
			</div>

			{/* Layer 2 (z-10): Content masked - title + image visible only in center */}
			<div className="absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center" style={maskStyle}>
				{children}
			</div>

			{/* Layer 3 (z-20): Decorative elements */}
			<div className="pointer-events-none absolute inset-0 z-20">
				<Image src="/mask_deco.svg" alt="" aria-hidden="true" style={svgOverlayStyle} width={100} height={100} />
			</div>
		</section>
	)
}
