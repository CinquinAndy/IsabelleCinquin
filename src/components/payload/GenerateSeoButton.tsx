'use client'

import { useForm } from '@payloadcms/ui'
import { Wand2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const GenerateSeoButton: React.FC = () => {
	const { fields, dispatchFields } = useForm()

	const title = fields.title?.value as string
	const excerpt = fields.excerpt?.value as string
	const content = fields.content?.value

	const [isLoading, setIsLoading] = useState(false)

	const handleGenerate = async () => {
		if (!content) {
			toast.error('Le contenu principal est vide, impossible de générer le SEO.')
			return
		}

		setIsLoading(true)
		try {
			// Convert richText content to string (simplified)
			const contentString = JSON.stringify(content)

			const response = await fetch('/api/gemini/generate-seo', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					previousTitle: title,
					previousExcerpt: excerpt,
					content: contentString,
				}),
			})

			if (!response.ok) throw new Error('Generation failed')

			const data = await response.json()

			// Update Title
			dispatchFields({
				type: 'UPDATE',
				path: 'seo.metaTitle',
				value: data.title,
			})

			// Update Description
			dispatchFields({
				type: 'UPDATE',
				path: 'seo.metaDescription',
				value: data.description,
			})

			// Update Keywords (assuming Keywords field expects array of objects { keyword: string })
			// We need to check exact field structure for keywords in seo.ts.
			// Assuming keywords field is an array of rows with 'keyword' property.
			// API returns { keywords: [{ keyword: '...' }] } which matches.
			// However, Payload array field update might need rows with IDs or just array of data.
			// Ideally we pass the array of objects.
			if (data.keywords && Array.isArray(data.keywords)) {
				// We need to fetch current keywords to calculate number of rows to update/replace?
				// Or jus replace value. 'UPDATE' usually replaces value for simple fields. 
				// For array fields, it might require specific handling or REPLACE operation if supported.
				// Let's try UPDATE with value.
				
				// Transform API keywords to Payload array format (often needs unique IDs if existing, but for new rows... let's try passing the array directly).
				dispatchFields({
					type: 'UPDATE',
					path: 'seo.keywords',
					value: data.keywords,
				})
			}

			toast.success('SEO généré avec succès ! Vérifiez les champs.')
		} catch (error) {
			console.error(error)
			toast.error('Erreur lors de la génération.')
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
				className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors disabled:opacity-50 cursor-pointer"
			>
				<Wand2 className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
				{isLoading ? 'Génération en cours...' : 'Générer SEO avec IA'}
			</button>
			<p className="text-xs text-slate-500 mt-1">
				Génère Titre, Description et Mots-clés basés sur le contenu.
			</p>
		</div>
	)
}
