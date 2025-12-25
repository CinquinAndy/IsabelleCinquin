'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { GripVertical } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SparklesCore } from '@/components/ui/sparkles'
import { cn } from '@/lib/utils'

interface CompareProps {
	firstImage?: string
	secondImage?: string
	className?: string
	firstImageClassName?: string
	secondImageClassname?: string
	initialSliderPercentage?: number
	slideMode?: 'hover' | 'drag'
	showHandlebar?: boolean
	autoplay?: boolean
	autoplayDuration?: number
	// Custom color for the slider line (violet theme)
	sliderColor?: string
}

export const Compare = ({
	firstImage = '',
	secondImage = '',
	className,
	firstImageClassName,
	secondImageClassname,
	initialSliderPercentage = 50,
	slideMode = 'hover',
	showHandlebar = true,
	autoplay = false,
	autoplayDuration = 5000,
	sliderColor = 'hsl(285, 60%, 50%)',
}: CompareProps) => {
	const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage)
	const [isDragging, setIsDragging] = useState(false)
	const sliderRef = useRef<HTMLDivElement>(null)
	const [_isMouseOver, setIsMouseOver] = useState(false)
	const autoplayRef = useRef<NodeJS.Timeout | null>(null)

	const startAutoplay = useCallback(() => {
		if (!autoplay) return

		const startTime = Date.now()
		const animate = () => {
			const elapsedTime = Date.now() - startTime
			const progress = (elapsedTime % (autoplayDuration * 2)) / autoplayDuration
			const percentage = progress <= 1 ? progress * 100 : (2 - progress) * 100

			setSliderXPercent(percentage)
			autoplayRef.current = setTimeout(animate, 16)
		}

		animate()
	}, [autoplay, autoplayDuration])

	const stopAutoplay = useCallback(() => {
		if (autoplayRef.current) {
			clearTimeout(autoplayRef.current)
			autoplayRef.current = null
		}
	}, [])

	useEffect(() => {
		startAutoplay()
		return () => stopAutoplay()
	}, [startAutoplay, stopAutoplay])

	function mouseEnterHandler() {
		setIsMouseOver(true)
		stopAutoplay()
	}

	function mouseLeaveHandler() {
		setIsMouseOver(false)
		if (slideMode === 'hover') {
			setSliderXPercent(initialSliderPercentage)
		}
		if (slideMode === 'drag') {
			setIsDragging(false)
		}
		startAutoplay()
	}

	const handleStart = useCallback(
		(_clientX: number) => {
			if (slideMode === 'drag') {
				setIsDragging(true)
			}
		},
		[slideMode]
	)

	const handleEnd = useCallback(() => {
		if (slideMode === 'drag') {
			setIsDragging(false)
		}
	}, [slideMode])

	const handleMove = useCallback(
		(clientX: number) => {
			if (!sliderRef.current) return
			if (slideMode === 'hover' || (slideMode === 'drag' && isDragging)) {
				const rect = sliderRef.current.getBoundingClientRect()
				const x = clientX - rect.left
				const percent = (x / rect.width) * 100
				requestAnimationFrame(() => {
					setSliderXPercent(Math.max(0, Math.min(100, percent)))
				})
			}
		},
		[slideMode, isDragging]
	)

	const handleMouseDown = useCallback((e: React.MouseEvent) => handleStart(e.clientX), [handleStart])
	const handleMouseUp = useCallback(() => handleEnd(), [handleEnd])
	const handleMouseMove = useCallback((e: React.MouseEvent) => handleMove(e.clientX), [handleMove])

	const handleTouchStart = useCallback(
		(e: React.TouchEvent) => {
			if (!autoplay) {
				handleStart(e.touches[0].clientX)
			}
		},
		[handleStart, autoplay]
	)

	const handleTouchEnd = useCallback(() => {
		if (!autoplay) {
			handleEnd()
		}
	}, [handleEnd, autoplay])

	const handleTouchMove = useCallback(
		(e: React.TouchEvent) => {
			if (!autoplay) {
				handleMove(e.touches[0].clientX)
			}
		},
		[handleMove, autoplay]
	)

	return (
		<div
			ref={sliderRef}
			className={cn('w-[400px] h-[400px] overflow-hidden', className)}
			style={{
				position: 'relative',
				cursor: slideMode === 'drag' ? 'grab' : 'col-resize',
			}}
			onMouseMove={handleMouseMove}
			onMouseLeave={mouseLeaveHandler}
			onMouseEnter={mouseEnterHandler}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
			onTouchMove={handleTouchMove}
		>
			<AnimatePresence initial={false}>
				<motion.div
					className="h-full w-px absolute top-0 m-auto z-30"
					style={{
						left: `${sliderXPercent}%`,
						top: '0',
						zIndex: 40,
						background: `linear-gradient(to bottom, transparent 5%, ${sliderColor} 50%, transparent 95%)`,
					}}
					transition={{ duration: 0 }}
				>
					<div
						className="w-36 h-full absolute top-1/2 -translate-y-1/2 left-0 z-20 opacity-50"
						style={{
							maskImage: 'radial-gradient(100px at left, white, transparent)',
							background: `linear-gradient(to right, ${sliderColor}, transparent)`,
						}}
					/>
					<div
						className="w-10 h-1/2 absolute top-1/2 -translate-y-1/2 left-0 z-10 opacity-100"
						style={{
							maskImage: 'radial-gradient(50px at left, white, transparent)',
							background: 'linear-gradient(to right, hsl(180, 80%, 60%), transparent)',
						}}
					/>
					<div className="w-10 h-3/4 top-1/2 -translate-y-1/2 absolute -right-10 [mask-image:radial-gradient(100px_at_left,white,transparent)]">
						<MemoizedSparklesCore
							background="transparent"
							minSize={0.4}
							maxSize={1}
							particleDensity={1200}
							className="w-full h-full"
							particleColor="#FFFFFF"
						/>
					</div>
					{showHandlebar && (
						<div className="h-6 w-6 rounded-lg top-1/2 -translate-y-1/2 bg-white z-30 -right-3 absolute flex items-center justify-center shadow-lg border border-gray-200">
							<GripVertical className="h-4 w-4 text-gray-600" />
						</div>
					)}
				</motion.div>
			</AnimatePresence>
			<div className="overflow-hidden w-full h-full relative z-20 pointer-events-none">
				<AnimatePresence initial={false}>
					{firstImage ? (
						<motion.div
							className={cn(
								'absolute inset-0 z-20 rounded-2xl flex-shrink-0 w-full h-full select-none overflow-hidden',
								firstImageClassName
							)}
							style={{
								clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
							}}
							transition={{ duration: 0 }}
						>
							<img
								alt="first image"
								src={firstImage}
								className={cn(
									'absolute inset-0 z-20 rounded-2xl flex-shrink-0 w-full h-full select-none object-cover',
									firstImageClassName
								)}
								draggable={false}
							/>
						</motion.div>
					) : null}
				</AnimatePresence>
			</div>

			<AnimatePresence initial={false}>
				{secondImage ? (
					<motion.img
						className={cn(
							'absolute top-0 left-0 z-[19] rounded-2xl w-full h-full select-none object-cover',
							secondImageClassname
						)}
						alt="second image"
						src={secondImage}
						draggable={false}
					/>
				) : null}
			</AnimatePresence>
		</div>
	)
}

const MemoizedSparklesCore = React.memo(SparklesCore)
