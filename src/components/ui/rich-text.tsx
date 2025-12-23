import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import { cn } from '@/lib/utils'

interface RichTextProps {
	/** The Lexical serialized editor state from Payload CMS */
	content?: SerializedEditorState | null
	/** Visual variant for different backgrounds */
	variant?: 'light' | 'dark'
	/** Additional CSS classes */
	className?: string
}

/**
 * RichText component that converts Payload Lexical content to JSX
 * Uses Tailwind prose classes with custom isa color theme
 */
export function RichText({ content, variant = 'dark', className }: RichTextProps) {
	// Return null if no content
	if (!content) return null

	// Check if content has actual nodes
	if (!content.root?.children?.length) return null

	const proseClasses = cn(
		'prose prose-isa max-w-none',
		{
			// Light variant - for light backgrounds
			'prose-isa': variant === 'light',
			// Dark variant - for purple/dark backgrounds (inverted)
			'prose-invert prose-isa': variant === 'dark',
		},
		className
	)

	return (
		<div className={proseClasses}>
			<PayloadRichText data={content} />
		</div>
	)
}
