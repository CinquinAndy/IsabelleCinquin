'use client'

import { useInView as useFramerInView } from 'framer-motion'
import type { RefObject } from 'react'
import { useEffect, useState } from 'react'

interface UseInViewOptions {
	/**
	 * Trigger once and never again
	 * @default true
	 */
	once?: boolean

	/**
	 * Margin around the viewport to trigger earlier/later
	 * @default "0px"
	 */
	margin?: string

	/**
	 * Amount of the element that needs to be visible (0-1)
	 * @default 0.1
	 */
	amount?: number | 'some' | 'all'
}

/**
 * Hook to detect when an element enters the viewport
 * Wrapper around framer-motion's useInView with better defaults
 */
export function useInView(
	ref: RefObject<Element>,
	{ once = true, margin = '0px', amount = 0.1 }: UseInViewOptions = {}
) {
	const isInView = useFramerInView(ref, {
		once,
		margin,
		amount,
	})

	return isInView
}

/**
 * Hook to detect when element is in view with callback
 */
export function useInViewCallback(
	ref: RefObject<Element>,
	callback: (isInView: boolean) => void,
	options: UseInViewOptions = {}
) {
	const isInView = useInView(ref, options)

	useEffect(() => {
		callback(isInView)
	}, [isInView, callback])
}

/**
 * Hook that respects prefers-reduced-motion
 * Returns true if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
		setPrefersReducedMotion(mediaQuery.matches)

		const handleChange = () => {
			setPrefersReducedMotion(mediaQuery.matches)
		}

		mediaQuery.addEventListener('change', handleChange)
		return () => mediaQuery.removeEventListener('change', handleChange)
	}, [])

	return prefersReducedMotion
}

/**
 * Hook to get animation config based on user motion preferences
 * Returns simplified animations if user prefers reduced motion
 */
export function useAnimationConfig() {
	const prefersReduced = usePrefersReducedMotion()

	return {
		shouldAnimate: !prefersReduced,
		duration: prefersReduced ? 0.01 : undefined,
		transition: prefersReduced ? { duration: 0.01 } : undefined,
	}
}
