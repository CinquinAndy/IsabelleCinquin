'use client'

import { useInView } from 'framer-motion'
import Image from 'next/image'
import * as React from 'react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn } from '@/lib/utils'

interface LazyImageProps {
	alt: string
	src: string
	className?: string
	AspectRatioClassName?: string
	/** URL of the fallback image. default: undefined */
	fallback?: string
	/** The ratio of the image. */
	ratio: number
	/** Whether the image should only load when it is in view. default: false */
	inView?: boolean
}

export function LazyImage({
	alt,
	src,
	ratio,
	fallback,
	inView = false,
	className,
	AspectRatioClassName,
}: LazyImageProps) {
	const ref = React.useRef<HTMLDivElement | null>(null)
	const isInView = useInView(ref, { once: true })

	const [imgSrc, setImgSrc] = React.useState<string | undefined>(inView ? undefined : src)
	const [isLoading, setIsLoading] = React.useState(true)
	const [hasError, setHasError] = React.useState(false)

	const handleError = () => {
		if (fallback) {
			setImgSrc(fallback)
			setHasError(false)
		} else {
			setHasError(true)
		}
		setIsLoading(false)
	}

	const handleLoad = () => {
		setIsLoading(false)
		setHasError(false)
	}

	// Load image only when inView
	React.useEffect(() => {
		if (inView && isInView && !imgSrc) {
			setImgSrc(src)
		}
	}, [inView, isInView, src, imgSrc])

	return (
		<AspectRatio
			ref={ref}
			ratio={ratio}
			className={cn('relative size-full overflow-hidden rounded-xl border border-white/10', AspectRatioClassName)}
		>
			{/* Skeleton / fallback */}
			<div
				className={cn(
					'bg-white/10 absolute inset-0 animate-pulse rounded-xl transition-opacity will-change-[opacity]',
					{ 'opacity-0': !isLoading && !hasError }
				)}
			/>

			{imgSrc && !hasError && (
				<Image
					src={imgSrc}
					alt={alt}
					fill
					className={cn(
						'rounded-xl object-cover opacity-0 transition-opacity duration-500 will-change-[opacity]',
						{
							'opacity-100': !isLoading,
						},
						className
					)}
					onLoad={handleLoad}
					onError={handleError}
					loading={inView ? 'lazy' : 'eager'}
					quality={85}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			)}
		</AspectRatio>
	)
}
