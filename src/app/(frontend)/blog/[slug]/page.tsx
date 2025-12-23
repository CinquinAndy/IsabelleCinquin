import { ArrowLeft, Calendar, ChevronDown, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ContactPreview } from '@/components/sections/contact-preview'
import { SectionWrapper } from '@/components/ui/section-wrapper'

// TODO: Connect to Payload CMS to fetch real blog post content
// This page currently uses placeholder content for demonstration

interface BlogPostPageProps {
	params: Promise<{ slug: string }>
}

// Default article content for demo
const defaultArticle = {
	title: 'Activités manuelles créatives',
	highlightedText: 'créatives',
	category: 'Créativité',
	publishedAt: '2024-01-15',
	readTime: '5 min de lecture',
	author: 'Isabelle Cinquin',
	featuredImage: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=800&auto=format&fit=crop',
	paragraphs: [
		"Chez nounou, nous accordons une grande importance aux activités manuelles. Elles permettent aux enfants de développer leur créativité tout en s'amusant !",
		"Peinture, dessin, pâte à modeler, sable magique... Les possibilités sont infinies ! Chaque activité est adaptée à l'âge et aux capacités de l'enfant, pour qu'il puisse s'épanouir à son rythme.",
		"Ces moments créatifs sont aussi l'occasion de travailler la motricité fine, d'apprendre les couleurs, les formes, et de développer la patience et la concentration.",
		"Les enfants adorent ramener leurs créations à la maison pour les montrer à Papa et Maman. C'est toujours un moment de fierté pour eux !",
	],
	// Scribble icons for decoration
	icons: [
		{ src: '/icons/scribbbles/7/SVG/Fichier 15.svg', position: 'top-20 left-8 md:left-16' },
		{ src: '/icons/scribbbles/7/SVG/Fichier 10.svg', position: 'top-32 right-4 md:right-20' },
		{ src: '/icons/scribbbles/7/SVG/Fichier 20.svg', position: 'bottom-32 left-12 md:left-24' },
		{ src: '/icons/scribbbles/7/SVG/Fichier 2.svg', position: 'bottom-20 right-8 md:right-16' },
	],
}

// Map slugs to specific content (for demo purposes)
const articlesBySlug: Record<string, typeof defaultArticle> = {
	'activites-manuelles': defaultArticle,
	'promenades-lac': {
		...defaultArticle,
		title: 'Promenades au lac Léman',
		highlightedText: 'lac Léman',
		category: 'Extérieur',
		publishedAt: '2024-01-10',
		readTime: '4 min de lecture',
		featuredImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&auto=format&fit=crop',
		paragraphs: [
			'La maison est située au bord du magnifique lac Léman, ce qui offre un cadre exceptionnel pour les promenades avec les enfants.',
			"Nous partons régulièrement à la découverte de la nature : observation des canards, des cygnes, des poissons... Les enfants apprennent à respecter l'environnement tout en s'émerveillant.",
			"Ces sorties sont l'occasion de faire de l'exercice, de respirer l'air frais et de profiter des différentes saisons. Chaque période de l'année offre ses propres merveilles !",
			"Les plus grands peuvent même jouer au bord de l'eau (sous surveillance bien sûr), ramasser des cailloux ou simplement profiter du paysage.",
		],
	},
	'jeux-eveil': {
		...defaultArticle,
		title: 'Jeux et éveil musical',
		highlightedText: 'éveil musical',
		category: 'Éveil',
		publishedAt: '2024-01-05',
		readTime: '5 min de lecture',
		featuredImage: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1200&h=800&auto=format&fit=crop',
		paragraphs: [
			'La musique occupe une place importante dans notre quotidien ! Les comptines, les instruments et la danse rythment nos journées.',
			"Les enfants adorent chanter les comptines traditionnelles, mais aussi découvrir de nouvelles chansons. C'est un excellent moyen de développer le langage et la mémoire.",
			"Nous avons également à disposition différents instruments adaptés aux tout-petits : maracas, tambourin, xylophone, clochettes... De quoi éveiller l'oreille musicale !",
			'Ces moments musicaux sont aussi très appréciés pour le rituel du calme avant la sieste ou pour accompagner certaines activités.',
		],
	},
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params

	// Get article content (TODO: replace with Payload CMS fetch)
	const article = articlesBySlug[slug] || defaultArticle

	return (
		<main className="min-h-screen">
			{/* Hero Section */}
			<section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-secondary via-primary to-primary">
				{/* Floating decorative icons */}
				{article.icons.map((icon, index) => (
					<div
						key={index}
						className={`absolute ${icon.position} w-16 h-16 md:w-20 md:h-20 opacity-60 animate-subtle-spin`}
						style={{ animationDelay: `${index * 0.5}s` }}
					>
						<Image src={icon.src} alt="" width={80} height={80} className="drop-shadow-lg" />
					</div>
				))}

				{/* Back link */}
				<Link
					href="/blog"
					className="absolute top-24 left-6 md:left-12 inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors z-10"
				>
					<ArrowLeft className="w-4 h-4" />
					<span className="hidden sm:inline">Retour au blog</span>
				</Link>

				{/* Center content */}
				<div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
					{/* Category badge */}
					<span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium rounded-full mb-6">
						{article.category}
					</span>

					{/* Title in handwriting font */}
					<h1 className="font-handwriting text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-tight mb-6 drop-shadow-lg">
						{article.title}
					</h1>

					{/* Meta info */}
					<div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70 mb-8">
						<span>Par {article.author}</span>
						<div className="w-1 h-1 rounded-full bg-white/40" />
						<span className="flex items-center gap-1.5">
							<Calendar className="w-4 h-4" />
							{new Date(article.publishedAt).toLocaleDateString('fr-FR', {
								day: 'numeric',
								month: 'long',
								year: 'numeric',
							})}
						</span>
						<div className="w-1 h-1 rounded-full bg-white/40" />
						<span className="flex items-center gap-1.5">
							<Clock className="w-4 h-4" />
							{article.readTime}
						</span>
					</div>
				</div>

				{/* Scroll indicator */}
				<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
					<ChevronDown className="w-6 h-6" />
					<span className="text-xs">Lire l'article</span>
				</div>

				{/* Wavy bottom border */}
				<div className="absolute bottom-0 left-0 right-0">
					<svg
						viewBox="0 0 1440 120"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="w-full h-auto"
						preserveAspectRatio="none"
					>
						<path
							d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
							fill="currentColor"
							className="text-primary"
						/>
					</svg>
				</div>
			</section>

			{/* Article Content */}
			<SectionWrapper variant="primary" className="pt-0 pb-16">
				<div className="max-w-4xl mx-auto px-4">
					{/* Featured image */}
					<div className="relative -mt-20 mb-12 z-10">
						<div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
							<Image
								src={article.featuredImage}
								alt={article.title}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 800px"
								priority
							/>
						</div>
					</div>

					{/* Article content */}
					<article className="prose prose-invert prose-lg max-w-none">
						{article.paragraphs.map((paragraph, index) => (
							<p key={index} className="text-white/80 leading-relaxed mb-6 text-lg">
								{paragraph}
							</p>
						))}
					</article>
				</div>
			</SectionWrapper>

			{/* CTA Section */}
			<ContactPreview />
		</main>
	)
}

export async function generateMetadata({ params }: BlogPostPageProps) {
	const { slug } = await params
	const article = articlesBySlug[slug] || defaultArticle

	return {
		title: `${article.title} | Blog Nounou Sciez`,
		description: article.paragraphs[0],
	}
}
