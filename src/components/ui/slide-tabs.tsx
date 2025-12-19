'use client'

import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

interface NavItem {
	label: string
	href: string
}

interface SlideTabsProps {
	items: NavItem[]
	className?: string
}

export function SlideTabs({ items, className = '' }: SlideTabsProps) {
	const [position, setPosition] = useState({
		left: 0,
		width: 0,
		opacity: 0,
	})
	const [selected, setSelected] = useState(0)
	const [hovered, setHovered] = useState<number | null>(null)
	const tabsRef = useRef<(HTMLLIElement | null)[]>([])

	useEffect(() => {
		const selectedTab = tabsRef.current[selected]
		if (selectedTab) {
			const { width } = selectedTab.getBoundingClientRect()
			setPosition({
				left: selectedTab.offsetLeft,
				width,
				opacity: 1,
			})
		}
	}, [selected])

	// The active tab is the one being hovered, or the selected one if nothing is hovered
	const activeIndex = hovered !== null ? hovered : selected

	return (
		<ul
			onMouseLeave={() => {
				setHovered(null)
				const selectedTab = tabsRef.current[selected]
				if (selectedTab) {
					const { width } = selectedTab.getBoundingClientRect()
					setPosition({
						left: selectedTab.offsetLeft,
						width,
						opacity: 1,
					})
				}
			}}
			className={`relative mx-auto flex w-fit rounded-full border-2 border-white/30 bg-white/10 p-1 backdrop-blur-md ${className}`}
		>
			{items.map((item, i) => (
				<Tab
					key={item.href}
					ref={(el) => {
						tabsRef.current[i] = el
					}}
					href={item.href}
					isActive={i === activeIndex}
					setPosition={setPosition}
					onClick={() => setSelected(i)}
					onHover={() => setHovered(i)}
				>
					{item.label}
				</Tab>
			))}
			<Cursor position={position} />
		</ul>
	)
}

interface TabProps {
	children: React.ReactNode
	href: string
	isActive: boolean
	setPosition: React.Dispatch<
		React.SetStateAction<{
			left: number
			width: number
			opacity: number
		}>
	>
	onClick: () => void
	onHover: () => void
}

const Tab = React.forwardRef<HTMLLIElement, TabProps>(
	({ children, href, isActive, setPosition, onClick, onHover }, ref) => {
		return (
			<li
				ref={ref}
				onClick={onClick}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						onClick()
					}
				}}
				onMouseEnter={() => {
					onHover()
					if (!ref || typeof ref === 'function' || !ref.current) return

					const { width } = ref.current.getBoundingClientRect()

					setPosition({
						left: ref.current.offsetLeft,
						width,
						opacity: 1,
					})
				}}
				className="relative z-10 block cursor-pointer"
			>
				<a
					href={href}
					className={`block px-4 py-2 text-sm font-medium transition-colors duration-200 md:px-5 md:py-2.5 md:text-base ${
						isActive ? 'text-secondary' : 'text-white'
					}`}
				>
					{children}
				</a>
			</li>
		)
	}
)

Tab.displayName = 'Tab'

interface CursorProps {
	position: {
		left: number
		width: number
		opacity: number
	}
}

function Cursor({ position }: CursorProps) {
	return (
		<motion.li
			animate={{
				...position,
			}}
			transition={{
				type: 'spring',
				stiffness: 500,
				damping: 30,
			}}
			className="absolute z-0 h-9 rounded-full bg-white md:h-11"
		/>
	)
}

