import { Header } from '@/components/header'
import { Hero } from '@/components/hero'

export default function HomePage() {
	return (
		<>
			<Header />
			<Hero>
				<div className="text-center px-4">
					<h1 className="mb-4 text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
						Nounou Sciez
					</h1>
					<p className="text-xl md:text-2xl text-white/90 drop-shadow-md max-w-2xl mx-auto">
						Isabelle Cinquin - Assistante Maternelle
					</p>
					<p className="mt-4 text-lg text-white/80 drop-shadow-md">
						Un accueil chaleureux pour vos enfants au bord du Lac Léman
					</p>
					<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
						<a
							href="#contact"
							className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-primary shadow-lg transition-all hover:bg-white/90 hover:scale-105"
						>
							Me contacter
						</a>
						<a
							href="#about"
							className="inline-flex items-center justify-center rounded-full border-2 border-white/50 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
						>
							En savoir plus
						</a>
					</div>
				</div>
			</Hero>
		</>
	)
}
