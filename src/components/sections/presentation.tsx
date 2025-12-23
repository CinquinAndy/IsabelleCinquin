import { SectionWrapper } from '@/components/ui/section-wrapper'

interface PresentationProps {
	content?: unknown
	agreementInfo?: string | null
}

export function Presentation({ agreementInfo }: PresentationProps) {
	return (
		<SectionWrapper id="presentation" variant="secondary">
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
					Ma <span className="font-handwriting text-white/80">présentation</span>
				</h2>
			</div>

			<div className="max-w-3xl mx-auto text-center space-y-6">
				<p className="text-lg leading-relaxed opacity-90">Je suis nounou sur la commune de Sciez (74) depuis 2003.</p>
				<p className="text-lg leading-relaxed opacity-90">
					J'ai fait une pause de 10 ans (2008 - 2018) pour travailler avec mon mari. Depuis 2018 j'ai repris mon
					activité de nounou.
				</p>
				<p className="text-lg leading-relaxed opacity-90">
					Accueillant vos enfants chez moi, avec un accueil personnalisé et chaleureux.
				</p>
				{agreementInfo && (
					<div className="mt-8 p-6 bg-white/10 rounded-xl">
						<p className="text-base opacity-80">{agreementInfo}</p>
					</div>
				)}
				{!agreementInfo && (
					<div className="mt-8 p-6 bg-white/10 rounded-xl">
						<p className="text-base opacity-80">
							Mon agrément me permet d'accueillir 3 enfants le jour de 7h à 19h et un enfant la nuit de 18h à 7h.
						</p>
					</div>
				)}
			</div>
		</SectionWrapper>
	)
}
