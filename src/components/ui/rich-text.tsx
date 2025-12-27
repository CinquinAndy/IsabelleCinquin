import type { SerializedUploadNode } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { type JSXConvertersFunction, RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn, formatMediaUrl } from '@/lib/utils'

interface RichTextProps {
	/** The Lexical serialized editor state from Payload CMS */
	content?: SerializedEditorState | null
	/** Visual variant for different backgrounds */
	variant?: 'light' | 'dark'
	/** Additional CSS classes */
	className?: string
}

/**
 * Custom Image component for RichText with "Living Place" styling
 */
function RichTextImage({ node }: { node: SerializedUploadNode }) {
	const value = node.value as any
	const imageUrl = formatMediaUrl(value?.url)
	const imageAlt = value?.alt || 'Image article'

	if (!imageUrl) return null

	return (
		<motion.div
			className="relative group my-8 not-prose"
			initial={{ opacity: 0, y: 20, scale: 0.98 }}
			whileInView={{ opacity: 1, y: 0, scale: 1 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
			whileHover={{ scale: 1.02 }}
		>
			{/* Glowing border effect */}
			<div className="absolute -inset-1 bg-linear-to-r from-accent/30 via-purple-400/30 to-accent/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

			<div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-white/5">
				{/* Image overlay gradient */}
				<div className="absolute inset-0 bg-linear-to-t from-secondary/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

				<motion.div
					className="relative w-full h-full"
					whileHover={{ scale: 1.05 }}
					transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
				>
					<Image src={imageUrl} alt={imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
				</motion.div>

				{/* Corner accent */}
				<div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-accent/40 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
				<div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-accent/40 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
			</div>

			{/* Caption if provided */}
			{/* Lexical upload node doesn't strictly have a caption field in standard payload, usually separate text node */}
		</motion.div>
	)
}

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
	...defaultConverters,
	upload: ({ node }) => <RichTextImage node={node} />,
})

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
			<PayloadRichText data={content} converters={converters} />
		</div>
	)
}
