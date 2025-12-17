'use client'

import { useDocumentInfo } from '@payloadcms/ui'
import { useState } from 'react'

const SeoGenerator: React.FC = () => {
	const [isGenerating, setIsGenerating] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)
	const { id, collectionSlug, globalSlug } = useDocumentInfo()

	const handleGenerate = async () => {
		setIsGenerating(true)
		setError(null)
		setSuccess(null)

		try {
			const response = await fetch('/api/gemini/generate-seo', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					documentId: id,
					collectionSlug,
					globalSlug,
				}),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Failed to generate SEO content')
			}

			setSuccess(`✅ SEO généré: "${data.title}"`)

			// Reload after a short delay
			setTimeout(() => {
				window.location.reload()
			}, 2000)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred')
			setIsGenerating(false)
		}
	}

	return (
		<div
			style={{
				marginBottom: '16px',
				padding: '12px',
				borderRadius: '6px',
			}}
		>
			<button
				type="button"
				onClick={handleGenerate}
				disabled={isGenerating}
				style={{
					width: '100%',
					padding: '8px 16px',
					backgroundColor: isGenerating ? '#9ca3af' : '#8b5cf6',
					color: 'white',
					border: 'none',
					borderRadius: '6px',
					fontSize: '14px',
					fontWeight: '500',
					cursor: isGenerating ? 'not-allowed' : 'pointer',
					opacity: isGenerating ? 0.6 : 1,
				}}
			>
				{isGenerating ? '⏳ Génération en cours...' : '🤖 Générer SEO avec Gemini'}
			</button>
			{success && <p style={{ fontSize: '14px', color: '#059669', marginTop: '8px', marginBottom: 0 }}>{success}</p>}
			{error && <p style={{ fontSize: '14px', color: '#dc2626', marginTop: '8px', marginBottom: 0 }}>{error}</p>}
		</div>
	)
}

export default SeoGenerator
