'use client'

import type React from 'react'
import { useEffect, useRef, useState } from 'react'

const UMAMI_SHARE_URL = 'https://umami.wadefade.fr/share/8WhySQrFsmBwyGnf'

export default function DashboardHero(): React.JSX.Element {
	const [iframeLoaded, setIframeLoaded] = useState(false)
	const [showFallback, setShowFallback] = useState(false)
	const timeoutRef = useRef<number | null>(null)

	useEffect(() => {
		timeoutRef.current = window.setTimeout(() => {
			if (!iframeLoaded) setShowFallback(true)
		}, 2500)

		return () => {
			if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
		}
	}, [iframeLoaded])

	return (
		<section className="dashboard-hero">
			<div className="dashboard-hero__header">
				<h2 className="dashboard-hero__title">Statistiques du site</h2>
				<a
					href={UMAMI_SHARE_URL}
					target="_blank"
					rel="noreferrer noopener"
					className="dashboard-hero__button"
				>
					Ouvrir Umami
				</a>
			</div>

			<div className="dashboard-hero__content">
				{!showFallback && (
					<iframe
						title="Umami analytics"
						src={UMAMI_SHARE_URL}
						className="dashboard-hero__iframe"
						loading="lazy"
						referrerPolicy="no-referrer"
						onLoad={() => {
							setIframeLoaded(true)
							if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
						}}
					/>
				)}

				{showFallback && (
					<div className="dashboard-hero__fallback">
						<h3>Analytics ne peut pas être intégré</h3>
						<p>
							Votre navigateur ou le serveur analytics bloque l&apos;intégration (X-Frame-Options / CSP).
							Ouvrez le tableau de bord dans un nouvel onglet.
						</p>
						<a
							href={UMAMI_SHARE_URL}
							target="_blank"
							rel="noreferrer noopener"
							className="dashboard-hero__button"
						>
							Ouvrir Umami
						</a>
					</div>
				)}
			</div>

			<style>{`
				.dashboard-hero {
					margin-bottom: 1.5rem;
					padding: 1rem;
					border-radius: 0.5rem;
					border: 1px solid var(--theme-elevation-150);
					background: var(--theme-elevation-50);
				}
				.dashboard-hero__header {
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 1rem;
					margin-bottom: 0.75rem;
				}
				.dashboard-hero__title {
					margin: 0;
					font-size: 1.125rem;
					font-weight: 500;
				}
				.dashboard-hero__button {
					display: inline-flex;
					align-items: center;
					gap: 0.5rem;
					padding: 0.5rem 0.75rem;
					border-radius: 0.375rem;
					background: var(--theme-elevation-200);
					color: var(--theme-text);
					font-size: 0.875rem;
					font-weight: 500;
					text-decoration: none;
					transition: background 0.15s;
				}
				.dashboard-hero__button:hover {
					background: var(--theme-elevation-300);
				}
				.dashboard-hero__content {
					height: 72vh;
					max-height: 900px;
					width: 100%;
					overflow: hidden;
					border-radius: 0.5rem;
					border: 1px solid var(--theme-elevation-150);
				}
				.dashboard-hero__iframe {
					height: 100%;
					width: 100%;
					border: 0;
				}
				.dashboard-hero__fallback {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					gap: 0.75rem;
					height: 100%;
					padding: 1.5rem;
					text-align: center;
				}
				.dashboard-hero__fallback h3 {
					margin: 0;
					font-size: 1rem;
					font-weight: 500;
				}
				.dashboard-hero__fallback p {
					margin: 0;
					max-width: 28rem;
					font-size: 0.875rem;
					color: var(--theme-elevation-800);
				}
			`}</style>
		</section>
	)
}
