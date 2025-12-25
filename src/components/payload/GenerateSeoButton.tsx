'use client'

import { useForm } from '@payloadcms/ui'
import { Wand2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { generateSeoForPost } from '@/actions/generate-seo'

/**
 * SEO Generator button for blog posts
 * Uses Server Action for secure, server-side generation with Vercel AI + Gemini 2.5
 */
export const GenerateSeoButton: React.FC = () => {
	const { fields, dispatchFields } = useForm()
	const [isLoading, setIsLoading] = useState(false)

	const handleGenerate = async () => {
		setIsLoading(true)
		try {
			// Extract content from post fields
			const title = fields.title?.value as string
			const excerpt = fields.excerpt?.value as string
			const content = fields.content?.value

			if (!content) {
				toast.error('Le contenu principal est vide, impossible de générer le SEO.')
				return
			}

			// Convert content to string
			let contentString = ''
			if (typeof content === 'string') {
				contentString = content
			} else if (content && typeof content === 'object') {
				contentString = JSON.stringify(content)
			}

			if (!contentString || contentString.length < 50) {
				toast.error('Le contenu est trop court pour générer du SEO pertinent.')
				return
			}

			// Call the Server Action - all processing happens server-side
			const data = await generateSeoForPost({
				content: contentString,
				previousTitle: title,
				previousExcerpt: excerpt,
			})

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
		} catch (error) {
			console.error('Error generating SEO:', error)
			const message = error instanceof Error ? error.message : 'Échec de la génération du SEO'
			toast.error(message)
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
				Génère automatiquement le titre, la description et les mots-clés SEO à partir du contenu de l'article.
			</p>
		</div>
	)
}
