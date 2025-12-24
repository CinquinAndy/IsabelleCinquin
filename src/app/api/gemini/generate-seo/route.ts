import { createGoogleGenerativeAI } from '@ai-sdk/google'
import configPromise from '@payload-config'
import { generateObject } from 'ai'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { z } from 'zod'

// Schema for the expected output
const seoSchema = z.object({
	title: z.string().describe('An SEO optimized title for the article, around 50-60 characters.'),
	description: z.string().describe('An SEO optimized meta description, around 150-160 characters.'),
	keywords: z.array(z.object({ keyword: z.string() })).describe('A list of 5-8 relevant keywords.'),
})

export async function POST(req: Request) {
	try {
		// Verify authentication via Payload
		const payload = await getPayload({ config: configPromise })
		const headersList = await headers()
		const { user } = await payload.auth({ headers: headersList })

		if (!user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const body = await req.json()
		const { content, previousTitle, previousExcerpt } = body

		if (!content) {
			return NextResponse.json({ error: 'Content is required' }, { status: 400 })
		}

		// Fetch Global Context (Landing Page Settings) to provide local SEO context
		const landing = await payload.findGlobal({
			slug: 'landing',
			depth: 1,
		})

		const settings = landing.settings
		const globalContext = `
      Site Identity: ${landing.hero?.title} - ${landing.hero?.subtitle}
      Location: ${settings?.address} (Sciez, near Thonon-les-Bains, Douvaine, Anthy-sur-Léman)
      Activity: Assistante Maternelle / Nounou
      Key Selling Points: Maison avec jardin, bord du Lac Léman, activités variées (promenades, bricolage), repas maison.
    `

		// Initialize Google AI provider
		const google = createGoogleGenerativeAI({
			apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
		})

		const model = google('gemini-2.0-flash')

		const prompt = `
      You are an SEO expert specializing in local service businesses (Childcare/Nanny).
      Generate optimized metadata for the following blog post, ensuring it ranks well for the activity and location.
      
      --- GLOBAL CONTEXT (Use this to ground the SEO in the specific location and service) ---
      ${globalContext}
      
      --- ARTICLE CONTENT ---
      Current Title: ${previousTitle || 'N/A'}
      Current Excerpt: ${previousExcerpt || 'N/A'}
      
      Content:
      ${content.substring(0, 8000)} // Limiting content size context
      
      --- REQUIREMENTS ---
      Please provide a JSON object with:
      1. title: An engaging, keyword-rich Meta Title (max 60 chars). MUST include relevant local terms if fitting (e.g. Sciez).
      2. description: A compelling Meta Description (max 160 chars). Summarize the article while reinforcing the local nanny service value proposition.
      3. keywords: A list of 5-8 relevant keywords. Mix of broad terms (Assistante maternelle) and specific/local terms (Sciez, Activité enfant, etc.).
      
      The tone should be professional yet warm, reassuring parents.
      Language: French.
    `

		const { object } = await generateObject({
			model,
			schema: seoSchema,
			prompt,
		})

		return NextResponse.json(object)
	} catch (error) {
		console.error('Error generating SEO:', error)
		return NextResponse.json({ error: 'Failed to generate SEO' }, { status: 500 })
	}
}
