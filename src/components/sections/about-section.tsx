'use client'

import NumberFlow from '@number-flow/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { RichTextParser } from '@/components/rich-text-parser'
import { formatMediaUrl } from '@/lib/utils'
import type { LandingAbout } from '@/types/landing'

interface AboutSectionProps {
	about?: LandingAbout | null
}

export function AboutSection({ about }: AboutSectionProps) {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 300)
		return () => clearTimeout(timer)
	}, [])

	if (!about) return null

	const mediaUrl = formatMediaUrl(typeof about.image === 'object' && about.image?.url ? about.image.url : null)
	const mediaAlt = typeof about.image === 'object' && about.image?.alt ? about.image.alt : 'Photo Isabelle'

	return (
		<section id="presentation" className="relative w-full py-20 md:py-28 px-4 md:px-8 bg-secondary">
			<div className="max-w-7xl mx-auto">
				<div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
					{/* Image - 40% */}
					<div className="w-full lg:w-[40%] flex items-center justify-center relative">
						<div className="relative z-20 w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl">
							{mediaUrl ? (
								<Image
									src={mediaUrl}
									alt={mediaAlt}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 256px, 320px"
								/>
							) : (
								<div className="w-full h-full bg-white/20" />
							)}
						</div>
						<div
							className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary/75 w-64 h-64 md:w-96 md:h-96 
                            rounded-full m-6 z-10"
						/>
						<div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30">
							<Image
								src="/icons/scribbbles/1/SVG/Fichier 46.svg"
								alt="Scribble"
								width={100}
								height={100}
								className="-translate-x-24 translate-y-12"
							/>
						</div>
						<div className="absolute top-0 right-1/2 -translate-x-1/2 z-30">
							<Image
								src="/icons/scribbbles/1/SVG/Fichier 48.svg"
								alt="Scribble"
								width={150}
								height={150}
								className="translate-x-84 translate-y-20"
							/>
						</div>
						<div className="absolute top-0 left-0 z-30">
							<Image
								src="/icons/scribbbles/1/SVG/Fichier 12.svg"
								alt="Scribble"
								width={75}
								height={75}
								className="translate-x-40 -translate-y-10"
							/>
						</div>
					</div>

					{/* Content - 60% */}
					<div className="w-full lg:w-[60%] text-center lg:text-left">
						{about.badge && (
							<span className="inline-block bg-white text-secondary font-bold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-6">
								{about.badge}
							</span>
						)}

						<h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
							{about.title}
							<br />
							<span className="text-accent">{about.titleAccent}</span>
						</h2>

						<div className="space-y-5 text-white text-lg leading-relaxed">
							{about.content && <RichTextParser content={about.content} />}

							{/* Stats Cards - Style like screenshot */}
							{about.stats && about.stats.length > 0 && (
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
									{about.stats.map((stat, i) => (
										<div key={i} className="bg-sidebar border border-white/10 rounded-2xl p-6 text-center">
											<div className="text-3xl md:text-5xl font-handwriting text-accent">
												<NumberFlow value={isVisible ? stat.value : 0} suffix={stat.suffix || ''} />
											</div>
											<h3 className="text-base font-light text-white/70 mt-4 uppercase tracking-wider">{stat.label}</h3>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
