'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
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

	return (
		<ul className={`relative mx-auto flex w-fit rounded-full border-2 border-white/20 bg-secondary/60 p-1 backdrop-blur-md ${className}`}>
			{items.map((item, i) => (
				<Tab
					key={item.href}
					ref={el => {
						tabsRef.current[i] = el
					}}
					href={item.href}
					isSelected={i === selected}
					onClick={() => setSelected(i)}
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
	isSelected: boolean
	onClick: () => void
}

const Tab = React.forwardRef<HTMLLIElement, TabProps>(({ children, href, isSelected, onClick }, ref) => {
	return (
		<li
			ref={ref}
			onClick={onClick}
			onKeyDown={e => {
				if (e.key === 'Enter' || e.key === ' ') {
					onClick()
				}
			}}
			className="relative z-10 block cursor-pointer"
		>
			<Link
				href={href}
				className={`block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 md:px-5 md:py-2.5 md:text-base ${
					isSelected
						? 'text-secondary' // Dark text on white cursor
						: 'text-white/80 hover:text-white' // Light text, brighter on hover
				}`}
			>
				{children}
			</Link>
		</li>
	)
})

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
