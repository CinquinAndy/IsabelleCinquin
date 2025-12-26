'use server'

import { createGoogleGenerativeAI } from '@ai-sdk/google'
import configPromise from '@payload-config'
import { generateObject } from 'ai'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import { z } from 'zod'

// Schema for blog post SEO - simplified
const seoSchema = z.object({
	title: z.string().describe('An SEO optimized title, around 50-60 characters.'),
	description: z.string().describe('An SEO optimized meta description, around 150-160 characters.'),
})

// Schema for landing page SEO - kept for compatibility but not actively used
const landingSeoSchema = z.object({
	title: z.string().describe('An SEO optimized title for the landing page, around 50-60 characters.'),
	description: z
		.string()
		.describe('An SEO optimized meta description for the landing page, around 150-160 characters.'),
	keywords: z.array(z.object({ keyword: z.string() })).describe('A list of 5-8 relevant keywords.'),
})

/**
 * Generate SEO metadata for blog posts
 */
export async function generateSeoForPost(data: { content: string; previousTitle?: string; previousExcerpt?: string }) {
	try {
		// Check authentication via cookies
		const cookieStore = await cookies()
		const token = cookieStore.get('payload-token')

		if (!token) {
			throw new Error('Non authentifié. Veuillez vous reconnecter.')
		}

		const { content, previousTitle, previousExcerpt } = data

		if (!content) {
			throw new Error('Le contenu est requis')
		}

		// Check for API key
		const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
		if (!apiKey) {
			console.error('GOOGLE_GENERATIVE_AI_API_KEY not configured')
			throw new Error('Configuration API manquante')
		}

		// Get Payload context for additional data
		const payload = await getPayload({ config: configPromise })
		const landing = await payload.findGlobal({ slug: 'landing' })

		const businessContext = `
Contexte de l'entreprise:
- Nom: Isabelle Cinquin
- Métier: Assistante Maternelle
- Localisation: ${landing.settings?.address || 'Sciez, Haute-Savoie'}
`

		// Initialize Google AI
		const google = createGoogleGenerativeAI({ apiKey })
		const model = google('gemini-2.5-flash')

		const prompt = `
Tu es un expert SEO spécialisé dans les services de garde d'enfants.

${businessContext}

Génère des métadonnées SEO optimisées pour cet article de blog:

Titre actuel: ${previousTitle || 'N/A'}
Extrait actuel: ${previousExcerpt || 'N/A'}

Contenu de l'article:
${content.substring(0, 8000)}

Exigences:
1. **title**: Maximum 60 caractères, incluant des mots-clés pertinents et naturels
2. **description**: Maximum 160 caractères, résumé accrocheur qui donne envie de cliquer

Langue: Français
Ton: Professionnel mais chaleureux, authentique
Approche: Axé sur la petite enfance, l'éveil et le bien-être des enfants
`

		const { object } = await generateObject({
			model,
			schema: seoSchema,
			prompt,
		})

		return object
	} catch (error) {
		console.error('Error generating post SEO:', error)
		throw error
	}
}

/**
 * Generate SEO metadata for landing page
 */
export async function generateSeoForLanding(data: {
	content: string
	heroTitle?: string
	heroSubtitle?: string
	location?: string
}) {
	try {
		// Check authentication via cookies
		const cookieStore = await cookies()
		const token = cookieStore.get('payload-token')

		if (!token) {
			throw new Error('Non authentifié. Veuillez vous reconnecter.')
		}

		const { content, heroTitle, heroSubtitle, location } = data

		if (!content) {
			throw new Error('Le contenu est requis')
		}

		// Check for API key
		const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
		if (!apiKey) {
			console.error('GOOGLE_GENERATIVE_AI_API_KEY not configured')
			throw new Error('Configuration API manquante')
		}

		// Initialize Google AI
		const google = createGoogleGenerativeAI({ apiKey })
		const model = google('gemini-2.5-flash')

		const prompt = `
Tu es un expert SEO spécialisé dans les services locaux de garde d'enfants (Assistante Maternelle / Nounou).

**CONTEXTE DU SITE**
- Service: Assistante Maternelle (Nounou)
- Nom: Isabelle Cinquin
- Titre principal: ${heroTitle || 'Isabelle Cinquin'}
- Sous-titre: ${heroSubtitle || 'Assistante Maternelle au bord du Lac Léman'}
- Localisation: ${location || '1250 Chemin de la Renouillère, 74140 Sciez'}
- Zone de service: Sciez, Thonon-les-Bains, Douvaine, Anthy-sur-Léman, Haute-Savoie (74)
- Points clés: Maison avec jardin, bord du Lac Léman, activités variées, repas maison

**CONTENU DE LA PAGE D'ACCUEIL**
${content}

**EXIGENCES SEO**
Génère des métadonnées SEO optimisées pour cette page d'accueil de nounou:

1. **title** (Meta Title):
   - Maximum 60 caractères
   - Doit inclure: "Nounou" ou "Assistante Maternelle", "Sciez", et le nom "Isabelle Cinquin"
   - Ton professionnel mais chaleureux
   - Exemple: "Nounou Sciez | Isabelle Cinquin - Assistante Maternelle"

2. **description** (Meta Description):
   - Maximum 160 caractères
   - Résume la proposition de valeur: expérience, localisation, cadre d'accueil
   - Appel à l'action subtil
   - Mots-clés: assistante maternelle, garde enfant, Sciez, Haute-Savoie
   - Exemple: "Assistante maternelle agréée à Sciez (74). Accueil chaleureux au bord du Lac Léman. Maison avec jardin, activités d'éveil. 20 ans d'expérience."

3. **keywords**:
   - 5-8 mots-clés/expressions pertinents
   - Mix de termes généraux et locaux
   - Exemples: "assistante maternelle sciez", "nounou 74", "garde enfant thonon", "assistante maternelle haute savoie", etc.

**LANGUE**: Français
**TONE**: Professionnel, rassurant, chaleureux
`

		const { object } = await generateObject({
			model,
			schema: landingSeoSchema,
			prompt,
		})

		return object
	} catch (error) {
		console.error('Error generating landing SEO:', error)
		throw error
	}
}
