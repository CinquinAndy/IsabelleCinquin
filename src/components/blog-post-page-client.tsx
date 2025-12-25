'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, ChevronDown, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ContactPreview } from '@/components/sections/contact-preview'
import { RichText } from '@/components/ui/rich-text'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { formatMediaUrl } from '@/lib/utils'
import type { Landing, Post } from '@/payload-types'

interface BlogPostPageClientProps {
	post: Post
	landing: Landing | null
}

// Decorative icons for hero section
const decorativeIcons = [
	{ src: '/icons/scribbbles/7/SVG/Fichier 15.svg', position: 'top-20 left-8 md:left-16' },
	{ src: '/icons/scribbbles/7/SVG/Fichier 10.svg', position: 'top-32 right-4 md:right-20' },
	{ src: '/icons/scribbbles/7/SVG/Fichier 20.svg', position: 'bottom-32 left-12 md:left-24' },
	{ src: '/icons/scribbbles/7/SVG/Fichier 2.svg', position: 'bottom-20 right-8 md:right-16' },
]

export function BlogPostPageClient({ post, landing }: BlogPostPageClientProps) {
	// Extract data from post
	const title = post.title
	const category =
		Array.isArray(post.categories) && post.categories.length > 0
			? typeof post.categories[0] === 'object'
				? post.categories[0].name
				: null
			: null
	const publishedAt = post.publishedAt
	const featuredImageUrl =
		typeof post.featuredImage === 'object' && post.featuredImage?.url ? formatMediaUrl(post.featuredImage.url) : null
	const featuredImageAlt =
		typeof post.featuredImage === 'object' && post.featuredImage?.alt ? post.featuredImage.alt : title

	return (
		<main className="min-h-screen">
			{/* Hero Section */}
			<section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-linear-to-b from-secondary via-primary to-primary">
				{/* Floating decorative icons */}
				{decorativeIcons.map((icon, index) => (
					<motion.div
						key={icon.src}
						className={`absolute ${icon.position} w-16 h-16 md:w-20 md:h-20 opacity-60`}
						initial={{ opacity: 0, y: 20 }}
						animate={{
							opacity: [0.4, 0.7, 0.4],
							y: [0, -12, 0],
							rotate: [0, 5, -5, 0],
						}}
						transition={{
							opacity: { duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 },
							y: { duration: 4 + index * 0.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' },
							rotate: { duration: 5 + index * 0.3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' },
						}}
					>
						<Image src={icon.src} alt="" width={80} height={80} className="drop-shadow-lg" />
					</motion.div>
				))}

				{/* Back link */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
				>
					<Link
						href="/blog"
						className="absolute top-24 left-6 md:left-12 inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors z-10 group"
					>
						<motion.div whileHover={{ x: -4 }} transition={{ duration: 0.3 }}>
							<ArrowLeft className="w-4 h-4" />
						</motion.div>
						<span className="hidden sm:inline">Retour au blog</span>
					</Link>
				</motion.div>

				{/* Center content */}
				<div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
					{/* Category badge */}
					{category && (
						<motion.span
							className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium rounded-full mb-6"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								type: 'spring',
								stiffness: 200,
								damping: 15,
								delay: 0.2,
							}}
							whileHover={{ scale: 1.05, borderColor: 'rgba(255, 255, 255, 0.4)' }}
						>
							{category}
						</motion.span>
					)}

					{/* Title in handwriting font with word stagger */}
					<motion.h1
						className="font-handwriting text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-tight mb-6 drop-shadow-lg"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
					>
						{title}
					</motion.h1>

					{/* Meta info */}
					<motion.div
						className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70 mb-8"
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.7 }}
						transition={{ duration: 0.6, delay: 0.5 }}
					>
						<span>Par Isabelle Cinquin</span>
						<div className="w-1 h-1 rounded-full bg-white/40" />
						{publishedAt && (
							<>
								<motion.span className="flex items-center gap-1.5" whileHover={{ scale: 1.05 }}>
									<Calendar className="w-4 h-4" />
									{new Date(publishedAt).toLocaleDateString('fr-FR', {
										day: 'numeric',
										month: 'long',
										year: 'numeric',
									})}
								</motion.span>
								<div className="w-1 h-1 rounded-full bg-white/40" />
							</>
						)}
						<motion.span className="flex items-center gap-1.5" whileHover={{ scale: 1.05 }}>
							<Clock className="w-4 h-4" />3 min de lecture
						</motion.span>
					</motion.div>
				</div>

				{/* Scroll indicator */}
				<motion.div
					className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
					initial={{ opacity: 0, y: -10 }}
					animate={{
						opacity: 0.5,
						y: [0, 10, 0],
					}}
					transition={{
						opacity: { duration: 0.6, delay: 0.7 },
						y: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' },
					}}
				>
					<ChevronDown className="w-6 h-6" />
					<span className="text-xs">Lire l'article</span>
				</motion.div>

				{/* Wavy bottom border */}
				<motion.div
					className="absolute bottom-0 left-0 right-0"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.8 }}
				>
					<svg
						viewBox="0 0 1440 120"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="w-full h-auto"
						preserveAspectRatio="none"
					>
						<motion.path
							d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
							fill="currentColor"
							className="text-primary"
							initial={{ pathLength: 0 }}
							animate={{ pathLength: 1 }}
							transition={{ duration: 1.2, delay: 0.9, ease: 'easeInOut' }}
						/>
					</svg>
				</motion.div>
			</section>

			{/* Article Content */}
			<SectionWrapper variant="primary" className="pt-0 pb-16">
				<div className="max-w-4xl mx-auto px-4">
					{/* Featured image */}
					{featuredImageUrl && (
						<motion.div
							className="relative -mt-20 mb-12 z-10"
							initial={{ opacity: 0, scale: 0.95, y: 40 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
						>
							<motion.div
								className="relative aspect-video rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl group"
								whileHover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
							>
								{/* Glow effect on hover */}
								<div className="absolute -inset-1 bg-linear-to-r from-accent/30 via-purple-400/30 to-accent/30 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

								<div className="relative w-full h-full">
									<Image
										src={featuredImageUrl}
										alt={featuredImageAlt}
										fill
										className="object-cover relative z-10"
										sizes="(max-width: 768px) 100vw, 800px"
										priority
									/>

									{/* Overlay gradient on hover */}
									<div className="absolute inset-0 bg-linear-to-t from-secondary/60 via-transparent to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								</div>

								{/* Corner accents */}
								<div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-accent/40 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								<div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-accent/40 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</motion.div>
						</motion.div>
					)}

					{/* Article content from rich text */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: featuredImageUrl ? 0.6 : 0.4 }}
					>
						<RichText content={post.content} variant="dark" className="prose-lg" />
					</motion.div>
				</div>
			</SectionWrapper>

			{/* CTA Section */}
			<ContactPreview
				title={landing?.contactSection?.title}
				content={landing?.contactSection?.content}
				phone={landing?.settings?.phone}
			/>
		</main>
	)
}
