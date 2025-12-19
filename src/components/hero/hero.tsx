'use client'

import { useRef } from 'react'
import { useCloudShader } from './use-cloud-shader'

interface HeroProps {
	children?: React.ReactNode
}

export function Hero({ children }: HeroProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	useCloudShader(canvasRef)

	return (
		<section className="relative h-screen w-full overflow-hidden bg-primary">
			{/* Decorative Ticks - Above everything */}
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src="/mask_deco.svg"
				alt=""
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 top-0 z-100 h-auto w-full scale-100"
			/>

			{/* WebGL Canvas Background with SVG Blob Mask */}
			<div
				className="absolute inset-0"
				style={{
					maskImage: 'url(/mask.svg)',
					WebkitMaskImage: 'url(/mask.svg)',
					maskSize: 'cover',
					WebkitMaskSize: 'cover',
					maskPosition: 'center',
					WebkitMaskPosition: 'center',
					maskRepeat: 'no-repeat',
					WebkitMaskRepeat: 'no-repeat',
				}}
			>
				<canvas ref={canvasRef} className="h-full w-full" tabIndex={-1} />
			</div>

			{/* Overlay Content */}
			<div className="relative z-10 flex h-full w-full flex-col items-center justify-center">{children}</div>
		</section>
	)
}
