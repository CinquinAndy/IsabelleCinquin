import { Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Category {
	id: number
	name: string
	slug: string
}

interface FeaturedImage {
	id: number
	url?: string | null
	alt?: string | null
}

interface PostCardProps {
	title: string
	slug: string
	excerpt: string
	featuredImage?: FeaturedImage | number | null
	publishedAt?: string | null
	categories?: (Category | number)[] | null
}

export function PostCard({ title, slug, excerpt, featuredImage, publishedAt, categories }: PostCardProps) {
	const mediaUrl = typeof featuredImage === 'object' && featuredImage?.url ? featuredImage.url : null
	const mediaAlt = typeof featuredImage === 'object' && featuredImage?.alt ? featuredImage.alt : title

	const categoryList = categories?.filter((cat): cat is Category => typeof cat === 'object')

	return (
		<Link
			href={`/blog/${slug}`}
			className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
		>
			{mediaUrl && (
				<div className="aspect-video relative overflow-hidden">
					<Image
						src={mediaUrl}
						alt={mediaAlt}
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-300"
						sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
					/>
				</div>
			)}

			<div className="p-5">
				{/* Categories */}
				{categoryList && categoryList.length > 0 && (
					<div className="flex flex-wrap gap-2 mb-3">
						{categoryList.map(cat => (
							<span key={cat.id} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
								{cat.name}
							</span>
						))}
					</div>
				)}

				<h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
					{title}
				</h3>

				<p className="text-sm text-muted-foreground mt-2 line-clamp-2">{excerpt}</p>

				{publishedAt && (
					<div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
						<Calendar className="w-3 h-3" />
						{new Date(publishedAt).toLocaleDateString('fr-FR', {
							day: 'numeric',
							month: 'long',
							year: 'numeric',
						})}
					</div>
				)}
			</div>
		</Link>
	)
}
