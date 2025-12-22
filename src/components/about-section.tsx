import Image from 'next/image'
import Link from 'next/link'

interface AboutSectionProps {
	imageSrc?: string
	imageAlt?: string
}

export function AboutSection({ imageSrc = '/bear.png', imageAlt = 'Photo Isabelle' }: AboutSectionProps) {
	return (
		<section id="presentation" className="relative w-full py-20 md:py-28 px-4 md:px-8 bg-secondary overflow-hidden">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
					{/* Image side - 40% width with all decorative elements */}
					<div className="relative w-full lg:w-[40%] flex items-center justify-center">
						{/* Decorative scribbles around image */}
						<Image
							src="/icons/scribbbles/1/SVG/Fichier 2.svg"
							alt=""
							width={180}
							height={110}
							className="absolute -top-8 -left-4 md:left-0 opacity-70 rotate-12"
							aria-hidden="true"
						/>
						<Image
							src="/icons/scribbbles/1/SVG/Fichier 5.svg"
							alt=""
							width={140}
							height={90}
							className="absolute -top-4 -right-4 md:right-0 opacity-60 -rotate-6"
							aria-hidden="true"
						/>
						<Image
							src="/icons/scribbbles/4/SVG/Fichier 10.svg"
							alt=""
							width={100}
							height={70}
							className="absolute -bottom-6 -left-2 md:left-4 opacity-70 rotate-45"
							aria-hidden="true"
						/>
						<Image
							src="/icons/scribbbles/3/SVG/Fichier 10.svg"
							alt=""
							width={120}
							height={80}
							className="absolute -bottom-4 -right-2 md:right-4 opacity-60 -rotate-12"
							aria-hidden="true"
						/>

						{/* Decorative circles behind image */}
						<div className="absolute -top-6 -left-6 w-72 h-72 md:w-80 md:h-80 rounded-full border-4 border-white/20" />
						<div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-accent" />
						<div className="absolute top-1/2 -translate-y-1/2 -right-12 w-16 h-16 rounded-full bg-white/30" />
						<div className="absolute -top-2 right-1/4 w-8 h-8 rounded-full bg-accent/60" />

						{/* Main image */}
						<div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl z-10">
							<Image
								src={imageSrc}
								alt={imageAlt}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 256px, 320px"
							/>
						</div>

						{/* Small decorative scribble below image */}
						<Image
							src="/icons/scribbbles/1/SVG/Fichier 2.svg"
							alt=""
							width={100}
							height={60}
							className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-80 z-20"
							aria-hidden="true"
						/>
					</div>

					{/* Content side - 60% width */}
					<div className="w-full lg:w-[60%] text-center lg:text-left">
						{/* Label with high contrast */}
						<span className="inline-block bg-white text-secondary font-bold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-6 shadow-md">
							À propos
						</span>

						<h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
							Nounou sur Sciez
							<br />
							<span className="text-accent">depuis 2003</span>
						</h2>

						<div className="space-y-5 text-white text-lg leading-relaxed">
							<p>
								Je suis assistante maternelle agréée sur la commune de Sciez (74), au bord du magnifique Lac Léman. J'ai
								fait une pause de 10 ans (2008-2018) pour travailler avec mon mari, puis j'ai repris mon activité avec
								toujours autant de passion.
							</p>

							<p>
								J'accueille vos enfants chez moi, dans une ambiance familiale et chaleureuse. Chaque petit bout reçoit
								un accueil personnalisé, adapté à son rythme et à ses besoins.
							</p>

							<div className="flex flex-col sm:flex-row gap-6 mt-8 pt-6 border-t border-white/20">
								<div className="flex-1 text-center sm:text-left">
									<div className="text-4xl font-bold text-white">3</div>
									<div className="text-sm font-medium text-white/90">enfants le jour</div>
									<div className="text-xs text-white/70">7h - 19h</div>
								</div>
								<div className="flex-1 text-center sm:text-left">
									<div className="text-4xl font-bold text-white">1</div>
									<div className="text-sm font-medium text-white/90">enfant la nuit</div>
									<div className="text-xs text-white/70">18h - 7h</div>
								</div>
								<div className="flex-1 text-center sm:text-left">
									<div className="text-4xl font-bold text-white">20+</div>
									<div className="text-sm font-medium text-white/90">ans d'expérience</div>
									<div className="text-xs text-white/70">avec les tout-petits</div>
								</div>
							</div>
						</div>

						<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
							<Link
								href="#contact"
								className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-accent/90 hover:scale-105"
							>
								Me contacter
							</Link>
							<Link
								href="#famille"
								className="inline-flex items-center justify-center rounded-full border-2 border-white bg-white/10 px-8 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
							>
								Découvrir la famille
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
