import type { Metadata } from 'next'

const SITE_URL = 'https://isabelle-cinquin.fr'

interface SEOData {
	seo_title?: string | null
	seo_description?: string | null
	title?: string | null
	shortDescription?: string | null
	description?: unknown // Can be string or rich text object
}

/**
 * Truncate text to a maximum length, ensuring we don't cut in the middle of a word
 */
function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text

	const truncated = text.slice(0, maxLength)
	const lastSpace = truncated.lastIndexOf(' ')

	if (lastSpace > 0) {
		return `${truncated.slice(0, lastSpace)}...`
	}

	return `${truncated}...`
}

/**
 * Extract plain text from rich text content (removes HTML/formatting)
 */
function extractPlainText(richTextOrString: unknown): string {
	if (typeof richTextOrString === 'string') {
		return richTextOrString
	}

	// If it's a rich text object, try to extract text from it
	if (richTextOrString && typeof richTextOrString === 'object') {
		return JSON.stringify(richTextOrString)
			.replace(/<[^>]*>/g, '') // Remove HTML tags
			.replace(/[{}[\]"]/g, ' ') // Remove JSON syntax
			.replace(/\s+/g, ' ') // Normalize whitespace
			.trim()
	}

	return ''
}

/**
 * Generate SEO-optimized metadata from Payload CMS data
 */
export function generateSEOMetadata(
	data: SEOData,
	pathname: string,
	options?: {
		robots?: string
	}
): Metadata {
	// Get title - use seo_title or fall back to title
	const title = data.seo_title || data.title

	if (!title) {
		// Don't throw for now, just fallback gracefully
		return {
			title: 'Isabelle Cinquin | Nounou Sciez',
		}
	}

	// Get description - use seo_description, shortDescription, or extract from rich text
	let rawDescription = data.seo_description

	if (!rawDescription) {
		if (data.shortDescription) {
			rawDescription = data.shortDescription
		} else if (data.description) {
			const plainText = extractPlainText(data.description)
			rawDescription = truncateText(plainText, 155)
		}
	}

	// Ensure description doesn't exceed 155 characters
	const description = rawDescription && rawDescription.length > 155 ? truncateText(rawDescription, 155) : rawDescription || ''

	// Generate canonical URL
	const canonicalUrl = `${SITE_URL}${pathname}`

	// Build metadata object
	const metadata: Metadata = {
		title,
		description,
		alternates: {
			canonical: canonicalUrl,
		},
	}

	// Add robots directive if specified
	if (options?.robots) {
		metadata.robots = options.robots
	}

	return metadata
}

/**
 * Get the site base URL
 */
export function getSiteUrl(): string {
	return SITE_URL
}
