import Image from 'next/image'
import Link from 'next/link'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { SectionTitle } from '@/components/ui/section-title'
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

export function Family({ members }: FamilyProps) {
	if (!members || members.length === 0) return null

	return (
		<SectionWrapper id="famille" variant="primary">
			<SectionTitle subtitle="Les personnes qui vivent avec nounou">La petite famille</SectionTitle>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{members.map((member, index) => {
					const mediaUrl = typeof member.image === 'object' && member.image?.url ? member.image.url : null
					const mediaAlt =
						typeof member.image === 'object' && member.image?.alt ? member.image.alt : `Photo de ${member.firstName}`

					const Card = (
						<div
							key={member.id || index}
							className="group relative bg-white/10 rounded-xl overflow-hidden transition-transform hover:scale-105"
						>
							{mediaUrl && (
								<div className="aspect-square relative">
									<Image
										src={mediaUrl}
										alt={mediaAlt}
										fill
										className="object-cover"
										sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
								</div>
							)}
							<div className="p-4 text-center">
								<h3 className="font-bold text-lg">
									{member.firstName}
									{member.lastName && ` ${member.lastName}`}
								</h3>
								<p className="text-sm opacity-80 mt-1 line-clamp-2">{member.description}</p>
							</div>
						</div>
					)

					if (member.link) {
						return (
							<Link key={member.id || index} href={member.link} target="_blank" rel="noopener noreferrer">
								{Card}
							</Link>
						)
					}

					return Card
				})}
			</div>
		</SectionWrapper>
	)
}
