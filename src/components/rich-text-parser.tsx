import type { JSX } from 'react'

interface RichTextNode {
	type: string
	children?: RichTextNode[]
	format?: number // For text nodes (bitmask for bold/italic)
	text?: string // For text nodes
	fields?: {
		url?: string
		newTab?: boolean
	} // For link nodes
	tag?: string // For heading/list nodes
}

interface RichTextBlock extends RichTextNode {
	type: 'paragraph' | 'heading' | 'list'
	tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'ol' | 'ul'
	children: RichTextNode[]
}

interface RichTextContent {
	root: {
		children: RichTextBlock[]
	}
}

interface RichTextParserProps {
	content: any
	className?: string
}

export function RichTextParser({ content, className }: RichTextParserProps) {
	if (!content?.root?.children) return null

	// Helper to cast types safely
	const typedContent = content as RichTextContent

	const renderChildren = (children: RichTextNode[], parentKey: string = '') => {
		return children.map((child, index) => {
			const key = `${parentKey}-${index}` // Generate a unique key for each child

			if (child.type === 'text') {
				let textContent: React.ReactNode = child.text
				// Simple check for bold/italic if format is a number
				if (typeof child.format === 'number') {
					if (child.format & 1) textContent = <strong>{textContent}</strong>
					if (child.format & 2) textContent = <em>{textContent}</em>
				}
				return <span key={key}>{textContent}</span>
			}

			if (child.type === 'link') {
				return (
					<a
						key={key}
						href={child.fields?.url || '#'}
						target={child.fields?.newTab ? '_blank' : undefined}
						rel={child.fields?.newTab ? 'noopener noreferrer' : undefined}
						className="text-primary hover:underline"
					>
						{renderChildren(child.children || [], key)}
					</a>
				)
			}
			
			// Handle styling nodes if they exist as wrappers
			if (child.children) {
				return <span key={key}>{renderChildren(child.children, key)}</span>
			}

			return null
		})
	}

	const renderBlock = (block: RichTextBlock, index: number) => {
		const key = `block-${index}`
		switch (block.type) {
			case 'paragraph':
				return (
					<p key={key} className="mb-4 last:mb-0">
						{renderChildren(block.children, key)}
					</p>
				)
			case 'heading': {
				const Tag = (block.tag || 'h3') as keyof JSX.IntrinsicElements
				return (
					<Tag key={key} className="font-bold mb-2 mt-4">
						{renderChildren(block.children, key)}
					</Tag>
				)
			}
			case 'list': {
				const ListTag = block.tag === 'ol' ? 'ol' : 'ul'
				return (
					<ListTag key={key} className={`pl-5 mb-4 ${block.tag === 'ol' ? 'list-decimal' : 'list-disc'}`}>
						{block.children.map((item: RichTextNode, i: number) => (
							<li key={`${key}-item-${i}`}>{renderChildren(item.children || [], `${key}-item-${i}`)}</li>
						))}
					</ListTag>
				)
			}
			default:
				return null
		}
	}

	return <div className={className}>{typedContent.root.children.map(renderBlock)}</div>
}
