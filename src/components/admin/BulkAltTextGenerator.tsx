'use client'

import { useState } from 'react'

const BulkAltTextGenerator: React.FC = () => {
	const [isGenerating, setIsGenerating] = useState(false)
	const [totalImages, setTotalImages] = useState<number | null>(null)
	const [error, setError] = useState<string | null>(null)

	const handleBulkGenerate = async () => {
		setIsGenerating(true)
		setError(null)
		setTotalImages(null)

		try {
			const response = await fetch('/api/forvoyez/generate-all', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Failed to generate alt texts')
			}

			// Generation happens in background - show immediate feedback
			setTotalImages(data.total)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred')
		} finally {
			setIsGenerating(false)
		}
	}

	return (
		<div
			style={{
				width: '100%',
				display: 'flex',
				marginBottom: '16px',
				marginLeft: '36px',
				marginTop: '16px',
			}}
		>
			<div style={{ maxWidth: '28rem' }}>
				<div
					style={{
						padding: '16px',
						border: '1px solid #e5e7eb',
						borderRadius: '8px',
						backgroundColor: '#fff',
						boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
					}}
				>
					<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
						<div style={{ textAlign: 'left' }}>
							<h3 style={{ fontSize: '16px', fontWeight: '600', color: '#000', margin: 0 }}>
								Génération en masse avec ForVoyez
							</h3>
							<p style={{ fontSize: '14px', color: '#000', marginTop: '4px', marginBottom: 0 }}>
								Générer automatiquement les alt text manquants pour toutes les images
							</p>
						</div>
						<button
							type="button"
							onClick={handleBulkGenerate}
							disabled={isGenerating}
							style={{
								width: '100%',
								padding: '8px 16px',
								backgroundColor: isGenerating ? '#9ca3af' : '#3b82f6',
								color: 'white',
								border: 'none',
								borderRadius: '6px',
								fontSize: '14px',
								fontWeight: '500',
								cursor: isGenerating ? 'not-allowed' : 'pointer',
								opacity: isGenerating ? 0.6 : 1,
							}}
						>
							{isGenerating ? '⏳ Génération en cours...' : '✨ Générer tous les alt texts'}
						</button>

						{totalImages !== null && (
							<div
								style={{
									padding: '12px',
									backgroundColor: '#eff6ff',
									border: '1px solid #bfdbfe',
									borderRadius: '6px',
								}}
							>
								<div style={{ fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
									<p style={{ fontWeight: '500', color: '#1e3a8a', margin: 0 }}>
										✅ Génération lancée en arrière-plan !
									</p>
									<p style={{ color: '#1d4ed8', margin: 0 }}>
										Total: <span style={{ fontWeight: '600' }}>{totalImages}</span> images en cours de traitement
									</p>
									<p style={{ color: '#15803d', margin: 0, marginTop: '8px' }}>
										Les alt texts seront générés dans les prochaines minutes.
									</p>
									<p style={{ fontSize: '12px', color: '#1d4ed8', marginTop: '4px', marginBottom: 0 }}>
										Consultez les logs du serveur pour suivre la progression.
									</p>
								</div>
							</div>
						)}

						{error && (
							<div
								style={{
									padding: '12px',
									backgroundColor: '#fef2f2',
									border: '1px solid #fecaca',
									borderRadius: '6px',
								}}
							>
								<p style={{ fontSize: '14px', color: '#b91c1c', margin: 0 }}>{error}</p>
							</div>
						)}

						{isGenerating && totalImages === null && (
							<div
								style={{
									padding: '12px',
									backgroundColor: '#f9fafb',
									border: '1px solid #e5e7eb',
									borderRadius: '6px',
								}}
							>
								<p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
									⏳ Recherche des images sans alt text...
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default BulkAltTextGenerator
