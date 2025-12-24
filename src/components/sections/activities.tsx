'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import type { Media } from '@/payload-types'

interface Post {
	id: number
	title: string
	slug: string
	excerpt: string
	featuredImage?: Media | number | null
	publishedAt?: string | null
	category?: string | null
}

interface ActivitiesProps {
	posts?: Post[] | null
}

export function Activities({ posts }: ActivitiesProps) {
	if (!posts) {
		throw new Error('Missing required data for Activities section: posts')
	}

	return (
		<SectionWrapper id="activites" variant="primary" className="overflow-hidden">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
						Les <span className="font-handwriting text-white/80">activités</span>
					</h2>
					<p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
						Découvrez ce que nous faisons au quotidien pour éveiller et amuser vos enfants
					</p>
				</div>

				{/* Cards grid */}
				<div className="flex flex-wrap justify-center gap-8">
					{posts.slice(0, 6).map(post => {
						const mediaUrl =
							typeof post.featuredImage === 'object' && post.featuredImage?.url ? post.featuredImage.url : null
						const mediaAlt =
							typeof post.featuredImage === 'object' && post.featuredImage?.alt ? post.featuredImage.alt : post.title

						return (
							<Link
								key={post.id}
								href={`/blog/${post.slug}`}
								className="group max-w-xs w-full hover:-translate-y-1 transition-all duration-300"
							>
								<div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/10">
									{mediaUrl && (
										<Image
											src={mediaUrl}
											alt={mediaAlt}
											fill
											className="object-cover group-hover:scale-105 transition-transform duration-500"
											sizes="(max-width: 768px) 100vw, 320px"
										/>
									)}
								</div>
								<h3 className="text-lg text-white font-semibold mt-4 group-hover:text-white/90 transition-colors line-clamp-2">
									{post.title}
								</h3>
								<p className="text-sm text-white/60 mt-2 line-clamp-2">{post.excerpt}</p>
								{post.category && (
									<span className="inline-block text-xs font-medium text-pink-300 mt-2">{post.category}</span>
								)}
							</Link>
						)
					})}
				</div>

				{/* CTA button */}
				{posts.length > 0 && (
					<div className="text-center mt-12">
						<Link
							href="/blog"
							className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all font-semibold text-white"
						>
							Voir toutes les activités
							<ArrowRight className="w-4 h-4" />
						</Link>
					</div>
				)}
			</div>
		</SectionWrapper>
	)
}
