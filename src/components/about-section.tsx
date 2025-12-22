'use client'

import Image from 'next/image'
import Link from 'next/link'

interface AboutSectionProps {
	imageSrc?: string
	title?: string
	subtitle?: string
	description?: string
	buttonText?: string
	buttonHref?: string
}

export function AboutSection({
	imageSrc = '/placeholder.jpg',
	title = 'À propos de moi',
	subtitle = 'QUI SUIS-JE',
	description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	buttonText = 'En savoir plus',
	buttonHref = '#presentation',
}: AboutSectionProps) {
	return (
		<section className="relative bg-background py-16 md:py-24 overflow-hidden">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Left side - Image with decorative elements */}
					<div className="relative flex justify-center lg:justify-start">
						{/* Decorative ring - outer */}
						<div className="absolute -left-8 top-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 rounded-full border-4 border-primary/20" />
						
						{/* Decorative ring - inner with gradient */}
						<div className="absolute -left-4 top-1/2 -translate-y-1/2 w-72 h-72 md:w-80 md:h-80 rounded-full border-8 border-transparent bg-gradient-to-br from-primary/10 to-accent/10" />
						
						{/* Small decorative circles */}
						<div className="absolute -left-12 top-1/4 w-8 h-8 rounded-full bg-accent/60" />
						<div className="absolute left-16 -bottom-4 w-6 h-6 rounded-full border-2 border-primary" />
						<div className="absolute left-8 top-8 w-4 h-4 rounded-full bg-primary/40" />
						
						{/* Main image container - half circle effect */}
						<div
							className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden"
							style={{
								borderRadius: '0 50% 50% 0',
								clipPath: 'ellipse(100% 50% at 0% 50%)',
							}}
						>
							{/* Background circle for the crescent effect */}
							<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full scale-110 -translate-x-8" />
							
							{/* Image */}
							<Image
								src={imageSrc}
								alt={title}
								fill
								className="object-cover"
								style={{
									borderRadius: '0 50% 50% 0',
								}}
							/>
							
							{/* Overlay gradient for depth */}
							<div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/10" />
						</div>
						
						{/* Decorative accent shape */}
						<div 
							className="absolute -right-4 top-1/3 w-16 h-24 bg-accent/30 rounded-full"
							style={{ transform: 'rotate(-20deg)' }}
						/>
					</div>

					{/* Right side - Content */}
					<div className="text-center lg:text-left">
						{/* Subtitle */}
						<span className="text-sm font-semibold tracking-widest text-primary/70 uppercase mb-2 block">
							{subtitle}
						</span>
						
						{/* Title */}
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
							{title}
						</h2>
						
						{/* Description */}
						<p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
							{description}
						</p>
						
						{/* Button */}
						<Link
							href={buttonHref}
							className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105 hover:shadow-xl"
						>
							{buttonText}
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
