'use client'

import { useState } from 'react'

interface NavItem {
	label: string
	href: string
}

const navItems: NavItem[] = [
	{ label: 'Accueil', href: '#' },
	{ label: 'À propos', href: '#about' },
	{ label: 'Services', href: '#services' },
	{ label: 'Contact', href: '#contact' },
]

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<header className="fixed top-0 left-0 right-0 z-50">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-20 items-center justify-between">
					{/* Logo */}
					<a
						href="#"
						className="font-display text-2xl font-bold text-white drop-shadow-lg transition-transform hover:scale-105"
					>
						Isabelle Cinquin
					</a>

					{/* Desktop Navigation */}
					<nav className="hidden md:block">
						<ul className="flex items-center gap-8">
							{navItems.map((item) => (
								<li key={item.href}>
									<a
										href={item.href}
										className="font-sans text-sm font-medium text-white/90 drop-shadow-md transition-colors hover:text-white"
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</nav>

					{/* Mobile Menu Button */}
					<button
						type="button"
						className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20 md:hidden"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-expanded={isMenuOpen}
						aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
					>
						<svg
							className="h-6 w-6 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							{isMenuOpen ? (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							) : (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							)}
						</svg>
					</button>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<nav className="animate-in fade-in slide-in-from-top-2 rounded-xl bg-white/10 p-4 backdrop-blur-md md:hidden">
						<ul className="flex flex-col gap-2">
							{navItems.map((item) => (
								<li key={item.href}>
									<a
										href={item.href}
										className="block rounded-lg px-4 py-3 font-sans text-sm font-medium text-white transition-colors hover:bg-white/10"
										onClick={() => setIsMenuOpen(false)}
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</nav>
				)}
			</div>
		</header>
	)
}
