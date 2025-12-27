'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { SlideTabs } from '@/components/ui/slide-tabs'

const navItems = [
	{ label: 'Accueil', href: '/' },
	{ label: 'Activités', href: '/blog' },
	{ label: 'Contact', href: '/contact' },
]

export function Header() {
	const pathname = usePathname()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	// Determine active item based on current pathname
	const getActiveIndex = () => {
		if (pathname === '/') return 0
		if (pathname.startsWith('/blog')) return 1
		if (pathname.startsWith('/contact')) return 2
		return -1 // No active item
	}

	const activeIndex = getActiveIndex()

	return (
		<header className="fixed top-0 left-0 right-0 z-100 py-4 mx-2 pointer-events-none backdrop-blur-[2px]">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link
						href="/"
						className="font-display text-2xl font-bold text-white drop-shadow-lg transition-transform hover:scale-105 pointer-events-auto"
					>
						Isabelle Cinquin
					</Link>

					{/* Desktop Navigation with SlideTabs */}
					<nav className="hidden md:block pointer-events-auto">
						<SlideTabs items={navItems} activeIndex={activeIndex} />
					</nav>

					{/* Mobile Menu Button */}
					<button
						type="button"
						className="relative z-101 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60 border border-white/20 backdrop-blur-sm transition-all hover:bg-white hover:text-secondary md:hidden group pointer-events-auto"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-expanded={isMenuOpen}
						aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
					>
						{isMenuOpen ? (
							<X className="h-5 w-5 text-white group-hover:text-secondary transition-colors" />
						) : (
							<Menu className="h-5 w-5 text-white group-hover:text-secondary transition-colors" />
						)}
					</button>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<nav className="mt-4 animate-in fade-in slide-in-from-top-2 rounded-2xl bg-secondary/80 border border-white/20 p-2 backdrop-blur-md md:hidden pointer-events-auto">
						<ul className="flex flex-col gap-1">
							{navItems.map((item, index) => {
								const isActive = index === activeIndex
								return (
									<li key={item.href}>
										<Link
											href={item.href}
											className={`block rounded-xl px-4 py-3 font-sans text-sm font-medium transition-all ${
												isActive
													? 'bg-white text-secondary font-semibold'
													: 'text-white/80 hover:bg-white/10 hover:text-white'
											}`}
											onClick={() => setIsMenuOpen(false)}
										>
											{item.label}
										</Link>
									</li>
								)
							})}
						</ul>
					</nav>
				)}
			</div>
		</header>
	)
}
