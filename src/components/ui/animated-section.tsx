'use client'

import type { HTMLMotionProps } from 'framer-motion'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { smoothTransition, variants } from '@/lib/animations'
import { useAnimationConfig, useInView } from '@/lib/use-animation'

interface AnimatedSectionProps extends Omit<HTMLMotionProps<'section'>, 'children'> {
	children: ReactNode
	/**
	 * Animation variant to use
	 * @default 'fadeInUp'
	 */
	variant?: keyof typeof variants
	/**
	 * Delay before animation starts (seconds)
	 * @default 0
	 */
	delay?: number
	/**
	 * Custom className
	 */
	className?: string
	/**
	 * Viewport trigger amount (0-1)
	 * @default 0.1
	 */
	amount?: number
	/**
	 * HTML tag to render
	 * @default 'section'
	 */
	as?: 'div' | 'section' | 'article' | 'aside'
}

/**
 * Wrapper component that animates children when entering viewport
 * Automatically handles reduced motion preferences
 */
export function AnimatedSection({
	children,
	variant = 'fadeInUp',
	delay = 0,
	className,
	amount = 0.1,
	as = 'section',
	...props
}: AnimatedSectionProps) {
	const ref = useRef<HTMLElement>(null)
	const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount })
	const { shouldAnimate } = useAnimationConfig()

	const Component = motion[as]
	const selectedVariant = variants[variant]

	return (
		{/* @ts-expect-error - Dynamic component selection causes type mismatch between HTMLElement and specific element types */}
		<Component
			ref={ref}
			initial={shouldAnimate ? 'initial' : false}
			animate={isInView && shouldAnimate ? 'animate' : 'initial'}
			variants={selectedVariant}
			transition={{
				...smoothTransition,
				delay,
			}}
			className={className}
			{...props}
		>
			{children}
		</Component>
	)
}

interface AnimatedDivProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
	children: ReactNode
	variant?: keyof typeof variants
	delay?: number
	className?: string
	amount?: number
}

/**
 * Div version of AnimatedSection for more flexibility
 */
export function AnimatedDiv(props: AnimatedDivProps) {
	return <AnimatedSection {...props} as="div" />
}
