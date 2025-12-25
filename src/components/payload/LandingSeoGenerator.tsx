'use client'

import { useForm } from '@payloadcms/ui'
import { Wand2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { generateSeoForLanding } from '@/actions/generate-seo'

// Helper to extract text from RichText
function extractTextFromRichText(content: any): string {
	if (!content) return ''
	if (typeof content === 'string') return content

	if (Array.isArray(content)) {
		return content
			.map(node => extractTextFromRichText(node))
			.filter(Boolean)
			.join(' ')
	}

	if (typeof content === 'object') {
		if (content.text) return content.text
		if (content.children) return extractTextFromRichText(content.children)
	}

	return ''
}

export const LandingSeoGenerator: React.FC = () => {
	const { fields, dispatchFields } = useForm()
	const [isLoading, setIsLoading] = useState(false)

	const handleGenerate = async () => {
		setIsLoading(true)

		try {
			// Payload flattens fields as "section.field" keys
			const allFields = fields as any

			// Extract Hero data
			const heroTitle = allFields['hero.title']?.value
			const heroSubtitle = allFields['hero.subtitle']?.value

			// Extract About data
			const aboutTitle = allFields['about.title']?.value
			const aboutTitleAccent = allFields['about.titleAccent']?.value
			const aboutContent = allFields['about.content']?.value

			// Extract Introduction data
			const introTitle = allFields['introduction.title']?.value
			const introContent = allFields['introduction.content']?.value

			// Extract Settings
			const settingsName = allFields['settings.name']?.value
			const settingsAddress = allFields['settings.address']?.value

			console.log('[DEBUG] Extracted data:', {
				heroTitle,
				heroSubtitle,
				aboutTitle,
				settingsAddress,
			})

			// Build comprehensive content summary
			const contentParts: string[] = []

			// Hero section
			if (heroTitle) contentParts.push(`**Titre principal**: ${heroTitle}`)
			if (heroSubtitle) contentParts.push(`**Sous-titre**: ${heroSubtitle}`)

			// About section
			if (aboutTitle) contentParts.push(`\n**À propos - Titre**: ${aboutTitle}`)
			if (aboutTitleAccent) contentParts.push(`**À propos - Accent**: ${aboutTitleAccent}`)
			if (aboutContent) {
				const aboutText = extractTextFromRichText(aboutContent)
				if (aboutText) contentParts.push(`**À propos - Contenu**: ${aboutText.substring(0, 400)}`)
			}

			// Introduction
			if (introTitle) contentParts.push(`\n**Introduction - Titre**: ${introTitle}`)
			if (introContent) {
				const introText = extractTextFromRichText(introContent)
				if (introText) contentParts.push(`**Introduction**: ${introText.substring(0, 300)}`)
			}

			// Try to find trainings (looking for pattern)
			const trainingKeys = Object.keys(allFields).filter(
				k => k.startsWith('trainingsSection.items.') && k.endsWith('.title')
			)
			if (trainingKeys.length > 0) {
				const trainings = trainingKeys
					.map(k => allFields[k]?.value)
					.filter(Boolean)
					.join(', ')
				contentParts.push(`\n**Formations suivies**: ${trainings}`)
			}

			// Try to find objectives
			const objectiveKeys = Object.keys(allFields).filter(
				k => k.startsWith('objectivesSection.items.') && k.endsWith('.title')
			)
			if (objectiveKeys.length > 0) {
				const objectives = objectiveKeys
					.map(k => allFields[k]?.value)
					.filter(Boolean)
					.join(', ')
				contentParts.push(`**Objectifs pédagogiques**: ${objectives}`)
			}

			// Try to find equipment
			const equipmentKeys = Object.keys(allFields).filter(
				k => k.startsWith('equipmentSection.items.') && k.endsWith('.title')
			)
			if (equipmentKeys.length > 0) {
				const equipment = equipmentKeys
					.map(k => allFields[k]?.value)
					.filter(Boolean)
					.join(', ')
				contentParts.push(`**Équipements disponibles**: ${equipment}`)
			}

			// Contact/Address
			if (settingsAddress) contentParts.push(`\n**Adresse**: ${settingsAddress}`)
			if (settingsName) contentParts.push(`**Nom**: ${settingsName}`)

			const contentSummary = contentParts.join('\n')

			console.log('[DEBUG] Content summary length:', contentSummary.length)
			console.log('[DEBUG] Content preview:', contentSummary.substring(0, 300))

			if (!contentSummary || contentSummary.length < 50) {
				toast.error(
					'⚠️ Contenu insuffisant. Veuillez remplir au moins les sections Hero et À propos pour générer un SEO pertinent.'
				)
				return
			}

			toast.info('🤖 Génération en cours avec Gemini 2.5 Flash...')

			// Call the Server Action with all extracted content
			const data = await generateSeoForLanding({
				content: contentSummary,
				heroTitle: heroTitle || 'Isabelle Cinquin',
				heroSubtitle: heroSubtitle || 'Assistante Maternelle au bord du Lac Léman',
				location: settingsAddress || '1250 Chemin de la Renouillère, 74140 Sciez',
			})

			console.log('[DEBUG] SEO Generated:', data)
			console.log('[DEBUG] Keywords received:', data.keywords)
			console.log('[DEBUG] Keywords is array?', Array.isArray(data.keywords))
			console.log('[DEBUG] Keywords length:', data.keywords?.length)

			// Update SEO fields in Payload 
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

			// Keywords debug and update
			if (data.keywords && Array.isArray(data.keywords)) {
				console.log('[DEBUG] Dispatching keywords to seo.keywords:', data.keywords)
				
				// Payload array fields need unique IDs for each item
				const keywordsWithIds = data.keywords.map((kw, index) => ({
					...kw,
					id: `keyword-${Date.now()}-${index}` // Generate unique ID
				}))
				
				console.log('[DEBUG] Keywords with IDs:', keywordsWithIds)
				
				dispatchFields({
					type: 'UPDATE',
					path: 'seo.keywords',
					value: keywordsWithIds,
				})
				console.log('[DEBUG] Keywords dispatched successfully')
			} else {
				console.warn('[DEBUG] Keywords not valid:', data.keywords)
			}

			toast.success('✅ SEO généré avec succès !')
		} catch (error) {
			console.error('[ERROR] SEO Generation failed:', error)
			const message = error instanceof Error ? error.message : 'Erreur lors de la génération du SEO'
			toast.error(`❌ ${message}`)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="flex flex-col gap-2">
			<button
				type="button"
				onClick={handleGenerate}
				disabled={isLoading}
				className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
			>
				<Wand2 className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
				{isLoading ? 'Génération en cours...' : '🤖 Générer SEO avec Gemini'}
			</button>
			<p className="text-xs text-gray-500">
				Génère automatiquement le titre, la description et les mots-clés SEO optimisés pour le référencement local.
			</p>
		</div>
	)
}
