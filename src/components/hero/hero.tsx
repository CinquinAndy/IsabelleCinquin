'use client'

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

	return (
		<section className="relative h-screen w-full overflow-hidden bg-primary">
			{/* SVG Layers Container - Both SVGs share the same sizing/positioning */}
			<div className="pointer-events-none absolute inset-0">
				{/* WebGL Canvas with mask.svg as luminance mask (white = visible, grays = partial) */}
				<div
					className="absolute inset-0"
					style={
						{
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
					}
				>
					<canvas ref={canvasRef} className="h-full w-full" tabIndex={-1} />
				</div>

				{/* Decorative elements from mask_deco.svg - overlaid on top */}
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src="/mask_deco.svg" alt="" aria-hidden="true" className="z-10" style={svgOverlayStyle} />
			</div>

			{/* Overlay Content */}
			<div className="relative z-20 flex h-full w-full flex-col items-center justify-center">{children}</div>
		</section>
	)
}
