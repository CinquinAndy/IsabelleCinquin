import Image from 'next/image'
import Link from 'next/link'

interface AboutSectionProps {
	imageSrc?: string
	imageAlt?: string
}

export function AboutSection({ imageSrc = '/bear.png', imageAlt = 'Photo Isabelle' }: AboutSectionProps) {
	return (
		<section id="presentation" className="relative w-full py-20 md:py-28 px-4 md:px-8 bg-secondary">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
					{/* Image - 40% */}
					<div className="w-full lg:w-[40%] flex items-center justify-center">
						<div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl">
							<Image
								src={imageSrc}
								alt={imageAlt}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 256px, 320px"
							/>
						</div>
					</div>

					{/* Content - 60% */}
					<div className="w-full lg:w-[60%] text-center lg:text-left">
						<span className="inline-block bg-white text-secondary font-bold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-6">
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
								className="inline-flex items-center justify-center rounded-full border-2 border-white bg-white/10 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-white/20 hover:scale-105"
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
