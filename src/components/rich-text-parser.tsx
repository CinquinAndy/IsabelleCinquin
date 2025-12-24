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
	type: 'paragraph' | 'heading' | 'list' | 'quote'
	tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'ol' | 'ul' | 'blockquote'
	children: RichTextNode[]
}

interface RichTextContent {
	root: {
		children: RichTextBlock[]
	}
}

interface RichTextParserProps {
	content: unknown
	className?: string
}

export function RichTextParser({ content, className }: RichTextParserProps) {
	if (!content || typeof content !== 'object') return null

	const typedContent = content as RichTextContent
	if (!typedContent?.root?.children) return null

	const renderChildren = (children: RichTextNode[], parentKey: string = ''): React.ReactNode[] => {
		return children.map((child, index) => {
			const key = `${parentKey}-${index}`

			if (child.type === 'text') {
				let textContent: React.ReactNode = child.text
				// Handle bold (1) and italic (2) format bitmask
				if (typeof child.format === 'number') {
					if (child.format & 1)
						textContent = (
							<strong key={`${key}-strong`} className="text-accent font-bold">
								{textContent}
							</strong>
						)
					if (child.format & 2) textContent = <em key={`${key}-em`}>{textContent}</em>
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
					>
						{renderChildren(child.children || [], key)}
					</a>
				)
			}

			// Handle nested nodes
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
				return <p key={key}>{renderChildren(block.children, key)}</p>

			case 'heading': {
				const Tag = (block.tag || 'h3') as keyof JSX.IntrinsicElements
				return <Tag key={key}>{renderChildren(block.children, key)}</Tag>
			}

			case 'list': {
				const ListTag = block.tag === 'ol' ? 'ol' : 'ul'
				return (
					<ListTag key={key}>
						{block.children.map((item: RichTextNode, i: number) => (
							<li key={`${key}-item-${i}`}>{renderChildren(item.children || [], `${key}-item-${i}`)}</li>
						))}
					</ListTag>
				)
			}

			case 'quote':
				return <blockquote key={key}>{renderChildren(block.children, key)}</blockquote>

			default:
				return null
		}
	}

	return <div className={className}>{typedContent.root.children.map(renderBlock)}</div>
}
