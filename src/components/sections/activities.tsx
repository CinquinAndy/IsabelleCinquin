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

// Default activities with placeholder images
const defaultActivities = [
	{
		id: 1,
		title: 'Activités manuelles créatives',
		slug: 'activites-manuelles',
		excerpt: 'Peinture, dessin, pâte à modeler, sable magique... Des activités pour développer la créativité !',
		category: 'Créativité',
		image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&auto=format&fit=crop',
	},
	{
		id: 2,
		title: 'Promenades au lac Léman',
		slug: 'promenades-lac',
		excerpt: "Découverte de la nature, observation des canards, jeux au bord de l'eau dans un cadre magnifique.",
		category: 'Extérieur',
		image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&auto=format&fit=crop',
	},
	{
		id: 3,
		title: 'Jeux et éveil musical',
		slug: 'jeux-eveil',
		excerpt: 'Comptines, instruments de musique, danse... Pour éveiller les sens et passer de bons moments.',
		category: 'Éveil',
		image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=600&auto=format&fit=crop',
	},
]

export function Activities({ posts }: ActivitiesProps) {
	// Use posts if available, otherwise use default activities
	const hasRealPosts = posts && posts.length > 0

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
					{hasRealPosts
						? // Real posts from CMS
							posts
								.slice(0, 6)
								.map(post => {
									const mediaUrl =
										typeof post.featuredImage === 'object' && post.featuredImage?.url ? post.featuredImage.url : null
									const mediaAlt =
										typeof post.featuredImage === 'object' && post.featuredImage?.alt
											? post.featuredImage.alt
											: post.title

									return (
										<Link
											key={post.id}
											href={`/blog/${post.slug}`}
											className="group max-w-xs w-full hover:-translate-y-1 transition-all duration-300"
										>
											<div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/10">
												{mediaUrl ? (
													<Image
														src={mediaUrl}
														alt={mediaAlt}
														fill
														className="object-cover group-hover:scale-105 transition-transform duration-500"
														sizes="(max-width: 768px) 100vw, 320px"
													/>
												) : (
													<div className="w-full h-full bg-white/5 flex items-center justify-center">
														<span className="text-4xl">🎨</span>
													</div>
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
								})
						: // Default placeholder activities - also links to future blog posts
							defaultActivities.map(activity => (
								<Link
									key={activity.id}
									href={`/blog/${activity.slug}`}
									className="group max-w-xs w-full hover:-translate-y-1 transition-all duration-300"
								>
									<div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/10">
										<Image
											src={activity.image}
											alt={activity.title}
											fill
											className="object-cover group-hover:scale-105 transition-transform duration-500"
											sizes="(max-width: 768px) 100vw, 320px"
										/>
										{/* Overlay gradient */}
										<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									</div>
									<h3 className="text-lg text-white font-semibold mt-4 group-hover:text-white/90 transition-colors">
										{activity.title}
									</h3>
									<p className="text-sm text-white/60 mt-2 line-clamp-2">{activity.excerpt}</p>
									<span className="inline-block text-xs font-medium text-pink-300 mt-2">{activity.category}</span>
								</Link>
							))}
				</div>

				{/* CTA button */}
				{hasRealPosts && (
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
