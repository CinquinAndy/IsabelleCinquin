'use client'

import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SectionTitle } from '@/components/ui/section-title'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import type { Media } from '@/payload-types'

interface FamilyMember {
	id?: string
	image?: Media | number | null
	firstName: string
	lastName?: string | null
	description: string
	link?: string | null
}

interface FamilyProps {
	members?: FamilyMember[] | null
}

// Card colors based on index (using palette colors)
const cardColors = [
	'bg-accent/20', // pink
	'bg-primary/20', // violet
	'bg-sidebar/50', // dark violet
	'bg-secondary/30', // medium violet
	'bg-accent/30', // pink variant
]

function MemberCard({ member, index }: { member: FamilyMember; index: number }) {
	const mediaUrl = typeof member.image === 'object' && member.image?.url ? member.image.url : null
	const mediaAlt =
		typeof member.image === 'object' && member.image?.alt ? member.image.alt : `Photo de ${member.firstName}`
	const hasLink = !!member.link
	const colorClass = cardColors[index % cardColors.length]

	const CardContent = (
		<div
			className={`group relative flex flex-col items-center overflow-hidden rounded-2xl ${colorClass} p-6 text-center transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-xl`}
		>
			{/* Hover wave effect */}
			<div className="absolute bottom-0 left-0 right-0 h-1/2 origin-bottom scale-y-0 rounded-t-full bg-gradient-to-t from-accent/30 to-transparent transition-transform duration-500 ease-out group-hover:scale-y-100" />

			{/* Member Image */}
			<div className="relative z-10 h-28 w-28 md:h-36 md:w-36 overflow-hidden rounded-full border-4 border-white/30 bg-white/10 transition-all duration-500 ease-out group-hover:border-accent group-hover:scale-105">
				{mediaUrl ? (
					<Image
						src={mediaUrl}
						alt={mediaAlt}
						fill
						className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
						sizes="(max-width: 768px) 112px, 144px"
					/>
				) : (
					<div className="h-full w-full bg-muted/50 flex items-center justify-center">
						<span className="text-3xl font-bold text-white/50">{member.firstName.charAt(0)}</span>
					</div>
				)}
			</div>

			{/* Name & Role */}
			<h3 className="relative z-10 mt-4 text-xl font-bold text-white font-display">
				{member.firstName}
				{member.lastName && ` ${member.lastName}`}
			</h3>
			<p className="relative z-10 text-sm text-white/70 mt-1">{member.description}</p>

			{/* Link indicator - petit plus en bas */}
			{hasLink && (
				<div className="relative z-10 mt-4 flex items-center justify-center">
					<div className="flex items-center gap-2 opacity-50 transition-all duration-300 group-hover:opacity-100">
						<Plus className="h-4 w-4 text-accent" />
						<span className="text-xs text-white/60 group-hover:text-white transition-colors">Voir plus</span>
					</div>
				</div>
			)}
		</div>
	)

	if (hasLink) {
		return (
			<Link href={member.link!} target="_blank" rel="noopener noreferrer" className="block">
				{CardContent}
			</Link>
		)
	}

	return CardContent
}

export function Family({ members }: FamilyProps) {
	if (!members || members.length === 0) return null

	return (
		<SectionWrapper id="famille" variant="primary">
			<SectionTitle subtitle="Les personnes qui vivent avec nounou">La petite famille</SectionTitle>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
				{members.map((member, index) => (
					<MemberCard key={member.id || index} member={member} index={index} />
				))}
			</div>
		</SectionWrapper>
	)
}
