'use client'

import { useForm } from '@payloadcms/ui'
import { Wand2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

// Type definitions for Landing sections
interface LandingSection {
	title?: string
	subtitle?: string
	titleAccent?: string
	content?: unknown
	items?: Array<{ title?: string }>
	address?: string
}

interface RichTextNode {
	text?: string
	children?: RichTextNode[] | unknown
}

/**
 * SEO Generator specifically for the Landing global
 * Extracts content from various sections to generate relevant SEO metadata
 */
export const LandingSeoGenerator: React.FC = () => {
	const { fields, dispatchFields } = useForm()
	const [isLoading, setIsLoading] = useState(false)

	const handleGenerate = async () => {
		setIsLoading(true)
		try {
			// Extract content from Landing structure
			const hero = fields.hero?.value as LandingSection | undefined
			const about = fields.about?.value as LandingSection | undefined
			const introduction = fields.introduction?.value as LandingSection | undefined
			const trainingsSection = fields.trainingsSection?.value as LandingSection | undefined
			const objectivesSection = fields.objectivesSection?.value as LandingSection | undefined
			const settings = fields.settings?.value as LandingSection | undefined

			// Build a content summary for the AI
			const contentParts: string[] = []

			if (hero?.title) contentParts.push(`Titre: ${hero.title}`)
			if (hero?.subtitle) contentParts.push(`Sous-titre: ${hero.subtitle}`)
			if (about?.title) contentParts.push(`À propos: ${about.title}`)
			if (about?.titleAccent) contentParts.push(about.titleAccent)
			
			// Extract text from about content (RichText)
			if (about?.content) {
				const aboutText = extractTextFromRichText(about.content)
				if (aboutText) contentParts.push(aboutText.substring(0, 300))
			}

			if (introduction?.title) contentParts.push(`Introduction: ${introduction.title}`)
			if (introduction?.content) {
				const introText = extractTextFromRichText(introduction.content)
				if (introText) contentParts.push(introText.substring(0, 200))
			}

			// Add trainings if available
			if (trainingsSection?.items && Array.isArray(trainingsSection.items)) {
				const trainings = trainingsSection.items.map((t) => t.title).filter(Boolean).join(', ')
				contentParts.push(`Formations: ${trainings}`)
			}

			// Add objectives if available
			if (objectivesSection?.items && Array.isArray(objectivesSection.items)) {
				const objectives = objectivesSection.items.map((o) => o.title).filter(Boolean).join(', ')
				contentParts.push(`Objectifs: ${objectives}`)
			}

			// Add location context
			if (settings?.address) contentParts.push(`Adresse: ${settings.address}`)

			const contentSummary = contentParts.join('\n')

			if (!contentSummary || contentSummary.length < 50) {
				toast.error('Contenu insuffisant pour générer le SEO. Veuillez remplir au moins le Hero et À propos.')
				return
			}

			const response = await fetch('/api/gemini/generate-landing-seo', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					content: contentSummary,
					heroTitle: hero?.title,
					heroSubtitle: hero?.subtitle,
					location: settings?.address,
				}),
			})

			if (!response.ok) {
				const error = await response.json()
				throw new Error(error.error || 'Échec de la génération')
			}

			const data = await response.json()

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

			toast.success('✅ SEO généré avec succès ! Vérifiez les champs ci-dessous.')
		} catch (error) {
			console.error(error)
			toast.error(error instanceof Error ? error.message : 'Erreur lors de la génération SEO')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="mb-4">
			<button
				type="button"
				onClick={handleGenerate}
				disabled={isLoading}
				className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<Wand2 className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
				{isLoading ? 'Génération en cours...' : '🤖 Générer SEO avec Gemini'}
			</button>
			<p className="text-xs text-gray-500 mt-2">
				Génère automatiquement le titre, la description et les mots-clés SEO basés sur le contenu de la page.
			</p>
		</div>
	)
}

/**
 * Extract plain text from Payload RichText format
 */
function extractTextFromRichText(richText: unknown): string {
	if (!richText) return ''

	// If it's already a string, return it
	if (typeof richText === 'string') return richText

	// Handle Payload RichText structure (array of nodes)
	if (Array.isArray(richText)) {
		return richText
			.map((node: unknown) => {
				const richNode = node as RichTextNode
				if (richNode.text) return richNode.text
				if (richNode.children) return extractTextFromRichText(richNode.children)
				return ''
			})
			.join(' ')
	}

	// Handle single node
	const richNode = richText as RichTextNode
	if (richNode.text) return richNode.text
	if (richNode.children) return extractTextFromRichText(richNode.children)

	return ''
}
