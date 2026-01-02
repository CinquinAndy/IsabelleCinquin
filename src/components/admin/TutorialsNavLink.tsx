'use client'

import type React from 'react'
import { useEffect, useState } from 'react'

export default function TutorialsNavLink(): React.JSX.Element {
	const [theme, setTheme] = useState<'light' | 'dark'>('light')

	useEffect(() => {
		if (typeof document === 'undefined') return
		const el = document.documentElement
		const update = () => {
			const attr = el.getAttribute('data-theme')
			setTheme((attr as 'light' | 'dark') || 'light')
		}
		const observer = new MutationObserver(update)
		observer.observe(el, { attributes: true, attributeFilter: ['data-theme'] })
		update()
		return () => observer.disconnect()
	}, [])

	const linkStyle: React.CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		gap: '0.5rem',
		padding: '0.5rem 1rem',
		fontSize: '0.875rem',
		color: theme === 'dark' ? '#fff' : '#000',
		textDecoration: 'none',
		borderRadius: '0.25rem',
		transition: 'background 0.15s',
	}

	return (
		<div style={{ padding: '0.5rem 0', borderTop: '1px solid var(--theme-elevation-150)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
			<a
				href="/admin/tuto"
				style={linkStyle}
				onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--theme-elevation-100)')}
				onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
			>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
					<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
					<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
				</svg>
				Tutoriels
			</a>
			<a
				href="https://umami.wadefade.fr/share/8WhySQrFsmBwyGnf"
				target="_blank"
				rel="noreferrer noopener"
				style={linkStyle}
				onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--theme-elevation-100)')}
				onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
			>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
					<path d="M3 3v18h18" />
					<path d="M18 17V9" />
					<path d="M13 17V5" />
					<path d="M8 17v-3" />
				</svg>
				Analytics (Umami)
			</a>
		</div>
	)
}
