import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { SectionTitle } from '@/components/ui/section-title'
import type { Media } from '@/payload-types'

interface Post {
	id: number
	title: string
	slug: string
	excerpt: string
	featuredImage?: Media | number | null
	publishedAt?: string | null
}

interface ActivitiesProps {
	posts?: Post[] | null
}

export function Activities({ posts }: ActivitiesProps) {
	if (!posts || posts.length === 0) {
		return (
			<SectionWrapper id="activites" variant="primary">
				<SectionTitle subtitle="Découvrez ce que nous faisons au quotidien">Activités proposées</SectionTitle>

				<div className="text-center py-12">
					<p className="text-lg opacity-70">Les activités seront bientôt disponibles dans le blog !</p>
					<Link
						href="/blog"
						className="inline-flex items-center gap-2 mt-4 text-white/80 hover:text-white transition-colors"
					>
						Voir le blog
						<ArrowRight className="w-4 h-4" />
					</Link>
				</div>
			</SectionWrapper>
		)
	}

	return (
		<SectionWrapper id="activites" variant="primary">
			<SectionTitle subtitle="Découvrez ce que nous faisons au quotidien">Activités proposées</SectionTitle>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{posts.slice(0, 6).map(post => {
					const mediaUrl =
						typeof post.featuredImage === 'object' && post.featuredImage?.url ? post.featuredImage.url : null
					const mediaAlt =
						typeof post.featuredImage === 'object' && post.featuredImage?.alt ? post.featuredImage.alt : post.title

					return (
						<Link
							key={post.id}
							href={`/blog/${post.slug}`}
							className="group bg-white/10 rounded-xl overflow-hidden hover:bg-white/20 transition-colors"
						>
							{mediaUrl && (
								<div className="aspect-video relative">
									<Image
										src={mediaUrl}
										alt={mediaAlt}
										fill
										className="object-cover group-hover:scale-105 transition-transform duration-300"
										sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
									/>
								</div>
							)}
							<div className="p-4">
								<h3 className="font-bold text-lg line-clamp-1">{post.title}</h3>
								<p className="text-sm opacity-80 mt-1 line-clamp-2">{post.excerpt}</p>
							</div>
						</Link>
					)
				})}
			</div>

			<div className="text-center mt-10">
				<Link
					href="/blog"
					className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors font-semibold"
				>
					Voir toutes les activités
					<ArrowRight className="w-4 h-4" />
				</Link>
			</div>
		</SectionWrapper>
	)
}


