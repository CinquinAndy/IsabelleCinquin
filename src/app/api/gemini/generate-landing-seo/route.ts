import { createGoogleGenerativeAI } from '@ai-sdk/google'
import configPromise from '@payload-config'
import { generateObject } from 'ai'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { z } from 'zod'

// Schema for the expected output
const seoSchema = z.object({
	title: z.string().describe('An SEO optimized title for the landing page, around 50-60 characters.'),
	description: z
		.string()
		.describe('An SEO optimized meta description for the landing page, around 150-160 characters.'),
	keywords: z.array(z.object({ keyword: z.string() })).describe('A list of 5-8 relevant keywords.'),
})

export async function POST(req: Request) {
	try {
		// Verify authentication via Payload
		const payload = await getPayload({ config: configPromise })
		const headersList = await headers()
		const { user } = await payload.auth({ headers: headersList })

		if (!user) {
			return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
		}

		const body = await req.json()
		const { content, heroTitle, heroSubtitle, location } = body

		if (!content) {
			return NextResponse.json({ error: 'Le contenu est requis' }, { status: 400 })
		}

		// Check for API key
		const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
		if (!apiKey) {
			console.error('GOOGLE_GENERATIVE_AI_API_KEY not configured')
			return NextResponse.json({ error: 'Configuration API manquante' }, { status: 500 })
		}

		// Initialize Google AI provider
		const google = createGoogleGenerativeAI({ apiKey })
		const model = google('gemini-2.0-flash')

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
			schema: seoSchema,
			prompt,
		})

		return NextResponse.json(object)
	} catch (error) {
		console.error('Error generating Landing SEO:', error)
		return NextResponse.json({ error: 'Échec de la génération SEO' }, { status: 500 })
	}
}
