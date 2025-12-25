'use client'

import { useForm } from '@payloadcms/ui'
import { Wand2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { generateSeoForLanding } from '@/actions/generate-seo'

export const LandingSeoGenerator: React.FC = () => {
	console.log('[DEBUG] LandingSeoGenerator component loaded!')

	const { fields, dispatchFields } = useForm()
	const [isLoading, setIsLoading] = useState(false)

	const handleGenerate = async () => {
		console.log('[DEBUG] Button clicked! handleGenerate called')
		alert('Button was clicked! (temp debug)')

		setIsLoading(true)
		console.log('[DEBUG] isLoading set to true')

		try {
			// Extract content from Landing structure
			const hero = fields.hero?.value as any
			const about = fields.about?.value as any
			const settings = fields.settings?.value as any

			console.log('[DEBUG] Extracted fields:', { hero: !!hero, about: !!about })

			// Build a simple content summary
			const contentParts: string[] = []
			if (hero?.title) contentParts.push(`Titre: ${hero.title}`)
			if (hero?.subtitle) contentParts.push(`Sous-titre: ${hero.subtitle}`)
			if (about?.title) contentParts.push(`À propos: ${about.title}`)

			const contentSummary = contentParts.join('\n')
			console.log('[DEBUG] Content summary:', contentSummary)

			if (!contentSummary || contentSummary.length < 10) {
				toast.error('Contenu insuffisant')
				return
			}

			console.log('[DEBUG] Calling Server Action...')

			const data = await generateSeoForLanding({
				content: contentSummary,
				heroTitle: hero?.title,
				heroSubtitle: hero?.subtitle,
				location: settings?.address,
			})

			console.log('[DEBUG] Server Action response:', data)

			// Update SEO fields
			dispatchFields({
				type: 'UPDATE',
				path: 'seo.metaTitle',
				value: data.title,
			})

			dispatchFields({
				type: 'UPDATE',
				path: 'seo.metaDescription',
				value: data.description,
			})

			if (data.keywords && Array.isArray(data.keywords)) {
				dispatchFields({
					type: 'UPDATE',
					path: 'seo.keywords',
					value: data.keywords,
				})
			}

			toast.success('SEO généré avec succès !')
			console.log('[DEBUG] Success!')
		} catch (error) {
			console.error('[DEBUG] Error:', error)
			const message = error instanceof Error ? error.message : 'Erreur'
			toast.error(message)
		} finally {
			setIsLoading(false)
			console.log('[DEBUG] isLoading set to false')
		}
	}

	return (
		<div className="flex flex-col gap-2">
			<button
				type="button"
				onClick={handleGenerate}
				disabled={isLoading}
				style={{
					backgroundColor: isLoading ? '#999' : '#7c3aed',
					color: 'white',
					padding: '8px 16px',
					borderRadius: '8px',
					border: 'none',
					cursor: isLoading ? 'not-allowed' : 'pointer',
				}}
			>
				<Wand2 className={`h-4 w-4 inline mr-2 ${isLoading ? 'animate-spin' : ''}`} />
				{isLoading ? 'Génération en cours...' : '🤖 Générer SEO avec Gemini (DEBUG)'}
			</button>
			<p style={{ fontSize: '12px', color: '#666' }}>
				Génère automatiquement le titre, la description et les mots-clés SEO.
			</p>
		</div>
	)
}
