'use client'

import { useDocumentInfo } from '@payloadcms/ui'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'

const AltTextGenerator: React.FC = () => {
	const [isGenerating, setIsGenerating] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)
	const [generatedAlt, setGeneratedAlt] = useState<string | null>(null)
	const { id } = useDocumentInfo()
	const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)

	// Cleanup polling on unmount
	useEffect(() => {
		return () => {
			if (pollingIntervalRef.current) {
				clearInterval(pollingIntervalRef.current)
			}
		}
	}, [])

	// Start polling for alt text generation
	const startPolling = () => {
		let attempts = 0
		const maxAttempts = 30 // Poll for up to 30 seconds

		pollingIntervalRef.current = setInterval(async () => {
			attempts++

			try {
				const response = await fetch(`/api/forvoyez/check-status?mediaId=${id}`)
				const data = await response.json()

				if (data.hasAlt && data.alt) {
					// Alt text has been generated!
					setGeneratedAlt(data.alt)
					setSuccess(`✅ Alt text généré : "${data.alt}"`)
					setIsGenerating(false)

					// Stop polling
					if (pollingIntervalRef.current) {
						clearInterval(pollingIntervalRef.current)
						pollingIntervalRef.current = null
					}
				} else if (attempts >= maxAttempts) {
					// Timeout - stop polling
					setSuccess('⏱️ Génération en cours... Consultez les logs ou réessayez.')
					setIsGenerating(false)

					if (pollingIntervalRef.current) {
						clearInterval(pollingIntervalRef.current)
						pollingIntervalRef.current = null
					}
				}
			} catch (err) {
				console.error('Polling error:', err)
				// Continue polling on error
			}
		}, 1000) // Poll every second
	}

	const handleGenerate = async () => {
		if (!id) {
			setError('Document not saved yet')
			return
		}

		setIsGenerating(true)
		setError(null)
		setSuccess(null)

		try {
			const response = await fetch('/api/forvoyez/generate-alt', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ mediaId: id }),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Failed to generate alt text')
			}

			// Show success message - generation is happening in background
			setSuccess(`🔄 Génération en cours pour "${data.filename}"...`)

			// Start polling to check when alt text is ready
			startPolling()
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred')
			setIsGenerating(false)
		}
	}

	return (
		<div className="field-type">
			<div className="flex flex-col gap-2">
				<Button type="button" onClick={handleGenerate} disabled={isGenerating || !id} className="w-full">
					{isGenerating ? '⏳ Génération en cours...' : '✨ Générer alt text avec ForVoyez'}
				</Button>
				{success && <p className="text-sm text-green-600 font-medium">{success}</p>}
				{error && <p className="text-sm text-red-500">{error}</p>}
				{!id && <p className="text-sm text-gray-500">Sauvegardez d'abord l'image pour générer l'alt text</p>}
			</div>
		</div>
	)
}

export default AltTextGenerator
