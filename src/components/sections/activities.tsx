'use client'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { formatMediaUrl } from '@/lib/utils'
import type { Media } from '@/payload-types'

interface Post {
	id: number
	title: string
	slug: string
	excerpt: string
	featuredImage?: Media | number | null
	publishedAt?: string | null
	categories?: Array<{ name: string } | number> | null
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
			<div className="absolute bottom-0 right-0 flex justify-center translate-y-10 md:translate-y-16 z-0 pointer-events-none scale-75">
				<Image src="/panda.png" alt="panda" width={800} height={800} className="w-[300px] lg:w-[400px] xl:w-[500px] h-auto" />
			</div>
			<div className="max-w-7xl mx-auto">
				{/* Header with animation */}
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
				>
					<motion.h2
						className="text-3xl md:text-4xl font-bold text-white tracking-tight"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.1 }}
					>
						Les{' '}
						<motion.span
							className="font-handwriting text-accent drop-shadow-md inline-block"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 0.8 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							activités
						</motion.span>
					</motion.h2>
					<motion.p
						className="mt-4 text-lg text-white/70 max-w-2xl mx-auto"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 0.7 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.3 }}
					>
						Découvrez ce que nous faisons au quotidien pour éveiller et amuser vos enfants
					</motion.p>
				</motion.div>

				{/* Cards grid with stagger */}
				<motion.div
					className="flex flex-wrap justify-center gap-8"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
					variants={{
						hidden: {},
						visible: {
							transition: {
								staggerChildren: 0.08,
								delayChildren: 0.2,
							},
						},
					}}
				>
					{posts.slice(0, 6).map((post, _index) => {
						// Extract media URL
						const mediaUrl = formatMediaUrl(
							typeof post.featuredImage === 'object' && post.featuredImage?.url ? post.featuredImage.url : null
						)
						const mediaAlt =
							typeof post.featuredImage === 'object' && post.featuredImage?.alt ? post.featuredImage.alt : post.title

						// Extract first category name
						const categoryName =
							Array.isArray(post.categories) && post.categories.length > 0
								? typeof post.categories[0] === 'object'
									? post.categories[0].name
									: null
								: null

						return (
							<motion.div
								key={post.id}
								variants={{
									hidden: { opacity: 0, y: 30 },
									visible: { opacity: 1, y: 0 },
								}}
								transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
							>
								<Link href={`/blog/${post.slug}`} className="group max-w-xs w-full block">
									<motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
										<motion.div
											className="relative aspect-4/3 rounded-2xl overflow-hidden bg-white/10 border border-white/10"
											whileHover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
										>
											{mediaUrl && (
												<>
													{/* Overlay on hover */}
													<div className="absolute inset-0 bg-linear-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

													<Image
														src={mediaUrl}
														alt={mediaAlt}
														fill
														className="object-cover group-hover:scale-105 transition-transform duration-500"
														sizes="(max-width: 768px) 100vw, 320px"
													/>
												</>
											)}
										</motion.div>
										<h3 className="text-lg text-white font-semibold mt-4 group-hover:text-accent transition-colors line-clamp-2">
											{post.title}
										</h3>
										<p className="text-sm text-white/60 mt-2 line-clamp-2">{post.excerpt}</p>
										{categoryName && (
											<span className="inline-block text-xs font-medium text-pink-300 mt-2">{categoryName}</span>
										)}
									</motion.div>
								</Link>
							</motion.div>
						)
					})}
				</motion.div>

				{/* CTA button */}
				{posts.length > 0 && (
					<motion.div
						className="text-center mt-12"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						<Link
							href="/blog"
							className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 hover:border-accent/30 transition-all font-semibold text-white group"
						>
							Voir toutes les activités
							<motion.div
								animate={{ x: [0, 4, 0] }}
								transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
							>
								<ArrowRight className="w-4 h-4" />
							</motion.div>
						</Link>
					</motion.div>
				)}
			</div>
		</SectionWrapper>
	)
}
