import type { Transition, Variants } from 'framer-motion'

/**
 * Custom easing curves following Disney animation principles
 */
export const easings = {
	// Standard smooth ease-out (most common)
	smooth: [0.6, 0.01, 0.05, 0.95] as const,

	// Bounce effect (back easing)
	bounce: [0.68, -0.55, 0.265, 1.55] as const,

	// Elastic / spring-like
	elastic: [0.34, 1.56, 0.64, 1] as const,

	// Sharp ease-in-out
	sharp: [0.4, 0, 0.2, 1] as const,

	// Gentle ease
	gentle: [0.25, 0.1, 0.25, 1] as const,
}

/**
 * Standard spring configurations
 */
export const springs = {
	// Default responsive spring
	default: {
		type: 'spring' as const,
		damping: 20,
		stiffness: 300,
	},

	// Bouncy spring
	bouncy: {
		type: 'spring' as const,
		damping: 15,
		stiffness: 400,
	},

	// Slow/gentle spring
	gentle: {
		type: 'spring' as const,
		damping: 25,
		stiffness: 200,
	},

	// Snappy spring
	snappy: {
		type: 'spring' as const,
		damping: 30,
		stiffness: 500,
	},
}

/**
 * Standard duration values (ms)
 */
export const durations = {
	// Micro interactions (hover, focus)
	micro: 0.2,

	// Fast transitions
	fast: 0.3,

	// Standard transitions (most common)
	standard: 0.5,

	// Slow transitions
	slow: 0.8,

	// Very slow (page loads, major transitions)
	verySlow: 1.2,
}

/**
 * Stagger timing configurations
 */
export const stagger = {
	// Very fast stagger
	fast: 0.05,

	// Standard stagger
	standard: 0.1,

	// Slow stagger
	slow: 0.15,
}

/**
 * Common animation variants
 */
export const variants = {
	/**
	 * Fade in from opacity 0
	 */
	fadeIn: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	} as Variants,

	/**
	 * Fade in + slide up
	 */
	fadeInUp: {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 20 },
	} as Variants,

	/**
	 * Fade in + slide down
	 */
	fadeInDown: {
		initial: { opacity: 0, y: -20 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -20 },
	} as Variants,

	/**
	 * Fade in + slide from left
	 */
	fadeInLeft: {
		initial: { opacity: 0, x: -20 },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: -20 },
	} as Variants,

	/**
	 * Fade in + slide from right
	 */
	fadeInRight: {
		initial: { opacity: 0, x: 20 },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: 20 },
	} as Variants,

	/**
	 * Scale in (pop effect)
	 */
	scaleIn: {
		initial: { opacity: 0, scale: 0.8 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.8 },
	} as Variants,

	/**
	 * Scale in with bounce
	 */
	bounceIn: {
		initial: { opacity: 0, scale: 0.3 },
		animate: {
			opacity: 1,
			scale: 1,
			transition: springs.bouncy,
		},
		exit: { opacity: 0, scale: 0.3 },
	} as Variants,

	/**
	 * Rotate in
	 */
	rotateIn: {
		initial: { opacity: 0, rotate: -10, scale: 0.95 },
		animate: { opacity: 1, rotate: 0, scale: 1 },
		exit: { opacity: 0, rotate: 10, scale: 0.95 },
	} as Variants,

	/**
	 * Container for staggered children
	 */
	staggerContainer: {
		initial: {},
		animate: {
			transition: {
				staggerChildren: stagger.standard,
				delayChildren: 0.1,
			},
		},
		exit: {
			transition: {
				staggerChildren: stagger.fast,
				staggerDirection: -1,
			},
		},
	} as Variants,

	/**
	 * Fast stagger container
	 */
	fastStaggerContainer: {
		initial: {},
		animate: {
			transition: {
				staggerChildren: stagger.fast,
			},
		},
		exit: {},
	} as Variants,

	/**
	 * Slow stagger container
	 */
	slowStaggerContainer: {
		initial: {},
		animate: {
			transition: {
				staggerChildren: stagger.slow,
				delayChildren: 0.2,
			},
		},
		exit: {},
	} as Variants,
}

/**
 * Create a custom fade in variant with specific direction and distance
 */
export function createFadeIn(direction: 'up' | 'down' | 'left' | 'right' = 'up', distance = 20): Variants {
	const axis = direction === 'left' || direction === 'right' ? 'x' : 'y'
	const value = direction === 'down' || direction === 'right' ? distance : -distance

	return {
		initial: { opacity: 0, [axis]: value },
		animate: { opacity: 1, [axis]: 0 },
		exit: { opacity: 0, [axis]: value },
	}
}

/**
 * Create a custom stagger container with specific timing
 */
export function createStaggerContainer(staggerDelay = stagger.standard, childrenDelay = 0.1): Variants {
	return {
		initial: {},
		animate: {
			transition: {
				staggerChildren: staggerDelay,
				delayChildren: childrenDelay,
			},
		},
		exit: {
			transition: {
				staggerChildren: staggerDelay / 2,
				staggerDirection: -1,
			},
		},
	}
}

/**
 * Standard transition with smooth easing
 */
export const smoothTransition: Transition = {
	duration: durations.standard,
	ease: easings.smooth,
}

/**
 * Fast transition
 */
export const fastTransition: Transition = {
	duration: durations.fast,
	ease: easings.smooth,
}

/**
 * Micro transition (for hover states)
 */
export const microTransition: Transition = {
	duration: durations.micro,
	ease: easings.sharp,
}
