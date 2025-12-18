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
		<section className="relative h-screen w-full overflow-hidden">
			{/* WebGL Canvas Background */}
			<canvas
				ref={canvasRef}
				className="absolute inset-0 h-full w-full"
				aria-hidden="true"
			/>

			{/* Overlay Content */}
			<div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
				{children}
			</div>
		</section>
	)
}
