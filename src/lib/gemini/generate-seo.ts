import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateText } from 'ai'

interface SeoContent {
	title: string
	description: string
}

export interface PageContext {
	pageType:
		| 'homepage'
		| 'service' // Adaptation future pour "activité" ?
		| 'realisation'
		| 'faq'
		| 'contact'
		| 'mentions-legales'
		| 'prestations'
		| 'realisations'
	title?: string
	description?: string
	content?: string
	location?: string
	category?: string
	additionalContext?: Record<string, unknown>
}

/**
 * Generate SEO title and description using Gemini
 */
export async function generateSeoContent(context: PageContext): Promise<SeoContent | null> {
	try {
		const apiKey = process.env.GEMINI_API_KEY
		if (!apiKey) {
			console.error('GEMINI_API_KEY not configured')
			return null
		}

		const google = createGoogleGenerativeAI({ apiKey })
		const prompt = buildSeoPrompt(context)

		const { text } = await generateText({
			model: google('gemini-2.5-pro'),
			prompt,
			temperature: 0.7,
		})

		// Parse the response
		const seoContent = parseSeoResponse(text)
		return seoContent
	} catch (error) {
		console.error('Error generating SEO content:', error)
		return null
	}
}

function buildSeoPrompt(context: PageContext): string {
	const baseContext = `Tu es un expert en SEO pour une assistante maternelle (nounou) basée à Sciez (Haute-Savoie, 74).
Isabelle Cinquin est une nounou expérimentée qui accueille des enfants dans un cadre chaleureux et sécurisé au bord du Lac Léman.

**IMPORTANT - Règles strictes:**
- Le titre SEO doit faire **maximum 60 caractères**
- La description SEO doit faire **maximum 155 caractères**
- Reste naturel, clair, rassurant et professionnel
- Évite les superlatifs excessifs
- Intègre des mots-clés pertinents naturellement (nounou, assistante maternelle, Sciez, 74, garde d'enfant)
- Pense référencement local (Sciez, Thonon-les-Bains, Douvaine, Haute-Savoie)

`

	let specificContext = ''

	switch (context.pageType) {
		case 'homepage':
			specificContext = `Page: **Accueil**
Cette page présente Isabelle Cinquin, son cadre d'accueil, et ses valeurs.
Focus: nounou Sciez, assistante maternelle agréée, garde enfant.`
			break

		case 'service':
			// Mapping to "Activités" or similar
			specificContext = `Page: **Activité/Service - ${context.title || 'Activité'}**
${context.description ? `Description: ${context.description}` : ''}
Focus: activité enfant, éveil, jeux, promenade.`
			break
            
		case 'faq':
			specificContext = `Page: **Questions fréquentes**
Page répondant aux questions des parents sur l'accueil, les tarifs, le contrat.
Focus: tarif nounou, horaires, contrat garde.`
			break

		case 'contact':
			specificContext = `Page: **Contact**
Page pour contacter Isabelle Cinquin.
Focus: contact nounou Sciez, disponibilité, coordonnées.`
			break

		case 'mentions-legales':
			specificContext = `Page: **Mentions légales**
Page d'information légale.
Focus: simple et factuel.`
			break
            
        default:
             specificContext = `Page: **${context.title || 'Page'}**`
	}

	if (context.content) {
		specificContext += `\n\nContenu disponible:\n${context.content.substring(0, 500)}...`
	}

	const outputFormat = `

**RÉPONSE ATTENDUE (format strict):**
Génère UNIQUEMENT ces deux lignes, sans autre texte:

TITLE: [ton titre SEO de max 60 caractères]
DESCRIPTION: [ta description SEO de max 155 caractères]

Exemple:
TITLE: Nounou Sciez | Isabelle Cinquin - Assistante Maternelle
DESCRIPTION: Isabelle Cinquin, assistante maternelle à Sciez (74). Accueil chaleureux et activités d'éveil pour vos enfants proche Thonon. Contactez-moi.`

	return baseContext + specificContext + outputFormat
}

function parseSeoResponse(text: string): SeoContent {
	const lines = text.trim().split('\n')
	let title = ''
	let description = ''

	for (const line of lines) {
		const trimmedLine = line.trim()
		if (trimmedLine.startsWith('TITLE:')) {
			title = trimmedLine.replace('TITLE:', '').trim()
		} else if (trimmedLine.startsWith('DESCRIPTION:')) {
			description = trimmedLine.replace('DESCRIPTION:', '').trim()
		}
	}

	// Ensure we have valid content
	if (!title || !description) {
		// Fallback parsing
		const titleMatch = text.match(/TITLE:\s*(.+)/i)
		const descMatch = text.match(/DESCRIPTION:\s*(.+)/i)
		title = titleMatch?.[1]?.trim() || 'Isabelle Cinquin | Nounou Sciez'
		description = descMatch?.[1]?.trim() || 'Assistante maternelle à Sciez (74) pour la garde de vos enfants.'
	}

	// Truncate if too long
	if (title.length > 60) {
		title = `${title.substring(0, 57)}...`
	}
	if (description.length > 155) {
		description = `${description.substring(0, 152)}...`
	}

	return { title, description }
}
