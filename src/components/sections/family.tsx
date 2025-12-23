'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { formatMediaUrl } from '@/lib/utils'
import type { LandingFamilyMember } from '@/types/landing'

// Flexible type that accepts Payload Media or simple image objects from fallback data
type FamilyMemberImage = LandingFamilyMember['image'] | { url: string; alt?: string }

interface FamilyMember {
	id?: string | null
	image: FamilyMemberImage
	firstName: string
	lastName?: string | null
	description: string
	link?: string | null
}

interface FamilyProps {
	members?: FamilyMember[] | null
}

function MemberCard({ member }: { member: FamilyMember }) {
	const mediaUrl = formatMediaUrl(typeof member.image === 'object' && member.image?.url ? member.image.url : null)
	const mediaAlt =
		typeof member.image === 'object' && member.image?.alt ? member.image.alt : `Photo de ${member.firstName}`
	const hasLink = !!member.link

	const CardContent = (
		<motion.div
			className={`group h-full min-h-[300px] relative flex flex-col items-center overflow-hidden rounded-2xl bg-secondary/30 p-6 
				text-center transition-shadow duration-300 ease-out hover:shadow-xl shrink-0 w-[200px] md:w-[240px] snap-center`}
			whileHover={{ y: -8, scale: 1.02 }}
			transition={{ type: 'spring', stiffness: 300, damping: 20 }}
		>
			{/* Hover wave effect */}
			<div
				className="absolute bottom-0 left-0 right-0 h-1/2 origin-bottom scale-y-0 rounded-t-full 
			bg-linear-to-t from-accent/30 to-transparent transition-transform duration-500 ease-out group-hover:scale-y-100"
			/>

			{/* Member Image */}
			<div
				className="relative z-10 h-24 w-24 md:h-32 md:w-32 overflow-hidden rounded-full 
			border-4 border-white/30 bg-white/10 transition-all duration-500 ease-out group-hover:border-accent 
			group-hover:scale-105"
			>
				{mediaUrl ? (
					<Image
						src={mediaUrl}
						alt={mediaAlt}
						fill
						className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
						sizes="(max-width: 768px) 96px, 128px"
					/>
				) : (
					<div className="h-full w-full bg-muted/50 flex items-center justify-center">
						<span className="text-3xl font-bold text-white/50">{member.firstName.charAt(0)}</span>
					</div>
				)}
			</div>

			{/* Name & Role */}
			<h3 className="relative z-10 mt-4 text-lg md:text-xl font-bold text-white font-display">
				{member.firstName}
				{member.lastName && ` ${member.lastName}`}
			</h3>
			<p className="relative z-10 text-xs md:text-sm text-white/70 mt-1 line-clamp-2">{member.description}</p>

			{/* Link indicator - petit plus en bas */}
			{hasLink && (
				<div className="relative z-10 mt-3 flex items-center justify-center">
					<div className="flex items-center gap-2 opacity-50 transition-all duration-300 group-hover:opacity-100">
						<Plus className="h-4 w-4 text-accent" />
						<span className="text-xs text-white/60 group-hover:text-white transition-colors">Voir plus</span>
					</div>
				</div>
			)}
		</motion.div>
	)

	if (hasLink) {
		return (
			<Link href={member.link!} target="_blank" rel="noopener noreferrer" className="block shrink-0">
				{CardContent}
			</Link>
		)
	}

	return CardContent
}

export function Family({ members }: FamilyProps) {
	const scrollContainerRef = useRef<HTMLDivElement>(null)

	if (!members || members.length === 0) return null

	const scroll = (direction: 'left' | 'right') => {
		if (scrollContainerRef.current) {
			const { current } = scrollContainerRef
			const scrollAmount = current.clientWidth * 0.6
			current.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth',
			})
		}
	}

	return (
		<SectionWrapper id="famille" variant="primary">
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
					La petite <span className="font-handwriting text-white/80">famille</span>
				</h2>
				<p className="mt-4 text-lg text-white/70">Les personnes qui vivent avec nounou</p>
			</div>

			<div className="relative w-full group/carousel">
				{/* Left Scroll Button */}
				<button
					type="button"
					onClick={() => scroll('left')}
					className="absolute top-1/2 -translate-y-1/2 left-2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-white/30"
					aria-label="Défiler vers la gauche"
				>
					<ChevronLeft className="w-6 h-6" />
				</button>

				{/* Scrollable Container */}
				<div
					ref={scrollContainerRef}
					className="flex gap-4 md:gap-6 overflow-x-auto pb-4 px-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
					style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
				>
					{members.map((member, index) => (
						<MemberCard key={member.id || index} member={member} />
					))}
				</div>

				{/* Right Scroll Button */}
				<button
					type="button"
					onClick={() => scroll('right')}
					className="absolute top-1/2 -translate-y-1/2 right-2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-white/30"
					aria-label="Défiler vers la droite"
				>
					<ChevronRight className="w-6 h-6" />
				</button>

				{/* Gradient fade edges */}
				<div className="absolute left-0 top-0 bottom-4 w-8 bg-linear-to-r from-primary to-transparent pointer-events-none z-10" />
				<div className="absolute right-0 top-0 bottom-4 w-8 bg-linear-to-l from-primary to-transparent pointer-events-none z-10" />
			</div>
		</SectionWrapper>
	)
}
