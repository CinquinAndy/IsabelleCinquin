'use client'

import { useDocumentInfo, useForm } from '@payloadcms/ui'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'

const AltTextGenerator: React.FC = () => {
	const [isGenerating, setIsGenerating] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)
	const { id } = useDocumentInfo()
	const { dispatchFields } = useForm()
	const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)

	// Clean up polling interval on unmount
	useEffect(() => {
		return () => {
			if (pollingIntervalRef.current) {
				clearInterval(pollingIntervalRef.current)
			}
		}
	}, [])

	const pollForAltText = async () => {
		try {
			// Fetch the media document to check if alt text has been generated
			const response = await fetch(`/api/media/${id}`)
			if (!response.ok) return

			const media = await response.json()

			// Check if alt text exists now
			if (media.alt && media.alt.trim() !== '') {
				// Stop polling
				if (pollingIntervalRef.current) {
					clearInterval(pollingIntervalRef.current)
					pollingIntervalRef.current = null
				}

				// Update the form data with the new alt text
				dispatchFields({
					type: 'UPDATE',
					path: 'alt',
					value: media.alt,
				})

				// Update UI
				setSuccess(`✅ Alt text généré avec succès: "${media.alt}"`)
				setIsGenerating(false)
			}
		} catch (err) {
			console.error('Polling error:', err)
		}
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
			setSuccess(`⏳ Génération en cours pour "${data.filename}"... Le champ sera mis à jour automatiquement.`)

			// Start polling for the generated alt text (every 2 seconds)
			pollingIntervalRef.current = setInterval(pollForAltText, 2000)

			// Stop polling after 30 seconds (timeout)
			setTimeout(() => {
				if (pollingIntervalRef.current) {
					clearInterval(pollingIntervalRef.current)
					pollingIntervalRef.current = null
					setIsGenerating(false)
					setSuccess('⚠️ La génération prend plus de temps que prévu. Vérifiez les logs du serveur.')
				}
			}, 30000)
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
