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
			// Extract ALL available data from the Landing page
			const allFields = fields as any
			console.log('[DEBUG] All fields:', Object.keys(allFields))

			// Try different approaches to get the data
			const hero = allFields.hero?.value || allFields.hero || {}
			const about = allFields.about?.value || allFields.about || {}
			const introduction = allFields.introduction?.value || allFields.introduction || {}
			const trainingsSection = allFields.trainingsSection?.value || allFields.trainingsSection || {}
			const objectivesSection = allFields.objectivesSection?.value || allFields.objectivesSection || {}
			const settings = allFields.settings?.value || allFields.settings || {}
			const dailyScheduleSection = allFields.dailyScheduleSection?.value || allFields.dailyScheduleSection || {}
			const equipmentSection = allFields.equipmentSection?.value || allFields.equipmentSection || {}
			const livingPlaceSection = allFields.livingPlaceSection?.value || allFields.livingPlaceSection || {}

			console.log('[DEBUG] Extracted sections:', {
				hero: !!hero?.title,
				about: !!about?.title,
				introduction: !!introduction?.title,
				settings: !!settings?.address,
			})

			// Build comprehensive content summary
			const contentParts: string[] = []

			// Hero section
			if (hero?.title) contentParts.push(`**Titre principal**: ${hero.title}`)
			if (hero?.subtitle) contentParts.push(`**Sous-titre**: ${hero.subtitle}`)

			// About section
			if (about?.title) contentParts.push(`\n**À propos - Titre**: ${about.title}`)
			if (about?.titleAccent) contentParts.push(`**À propos - Accent**: ${about.titleAccent}`)
			if (about?.content) {
				const aboutText = extractTextFromRichText(about.content)
				if (aboutText) contentParts.push(`**À propos - Contenu**: ${aboutText.substring(0, 400)}`)
			}

			// Introduction
			if (introduction?.title) contentParts.push(`\n**Introduction - Titre**: ${introduction.title}`)
			if (introduction?.content) {
				const introText = extractTextFromRichText(introduction.content)
				if (introText) contentParts.push(`**Introduction**: ${introText.substring(0, 300)}`)
			}

			// Trainings
			if (trainingsSection?.items?.length > 0) {
				const trainings = trainingsSection.items
					.map((t: any) => t.title)
					.filter(Boolean)
					.join(', ')
				contentParts.push(`\n**Formations suivies**: ${trainings}`)
			}

			// Objectives
			if (objectivesSection?.items?.length > 0) {
				const objectives = objectivesSection.items
					.map((o: any) => o.title)
					.filter(Boolean)
					.join(', ')
				contentParts.push(`**Objectifs pédagogiques**: ${objectives}`)
			}

			// Daily schedule
			if (dailyScheduleSection?.items?.length > 0) {
				const scheduleInfo = dailyScheduleSection.items
					.map((s: any) => `${s.time}: ${s.description}`)
					.filter(Boolean)
					.join('; ')
				contentParts.push(`\n**Programme quotidien**: ${scheduleInfo}`)
			}

			// Equipment
			if (equipmentSection?.items?.length > 0) {
				const equipment = equipmentSection.items
					.map((e: any) => e.title)
					.filter(Boolean)
					.join(', ')
				contentParts.push(`**Équipements disponibles**: ${equipment}`)
			}

			// Living place
			if (livingPlaceSection?.title) {
				contentParts.push(`\n**Cadre de vie**: ${livingPlaceSection.title}`)
			}
			if (livingPlaceSection?.content) {
				const placeText = extractTextFromRichText(livingPlaceSection.content)
				if (placeText) contentParts.push(placeText.substring(0, 200))
			}

			// Contact/Address
			if (settings?.address) contentParts.push(`\n**Adresse**: ${settings.address}`)
			if (settings?.name) contentParts.push(`**Nom**: ${settings.name}`)

			const contentSummary = contentParts.join('\n')

			console.log('[DEBUG] Content summary length:', contentSummary.length)
			console.log('[DEBUG] First 200 chars:', contentSummary.substring(0, 200))

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
				heroTitle: hero?.title,
				heroSubtitle: hero?.subtitle,
				location: settings?.address || '1250 Chemin de la Renouillère, 74140 Sciez',
			})

			console.log('[DEBUG] SEO Generated:', data)

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

			if (data.keywords && Array.isArray(data.keywords)) {
				dispatchFields({
					type: 'UPDATE',
					path: 'seo.keywords',
					value: data.keywords,
				})
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
