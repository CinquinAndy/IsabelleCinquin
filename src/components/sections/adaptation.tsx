import { Users } from 'lucide-react'
import { SectionTitle } from '@/components/ui/section-title'
import { SectionWrapper } from '@/components/ui/section-wrapper'

interface AdaptationProps {
	content?: unknown
}

export function Adaptation(_props: AdaptationProps) {
	return (
		<SectionWrapper id="adaptation" variant="secondary">
			<SectionTitle>Période d'adaptation</SectionTitle>

			<div className="max-w-2xl mx-auto text-center">
				<div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
					<Users className="w-10 h-10" />
				</div>

				<p className="text-lg leading-relaxed opacity-90 mb-6">
					Période importante pour permettre à l'enfant, aux parents, et à nounou de faire connaissance.
				</p>

				<div className="bg-white/10 rounded-xl p-6">
					<h3 className="font-bold text-lg mb-4">La clé d'un accueil réussi comporte plusieurs points importants :</h3>
					<ul className="space-y-2 text-left max-w-md mx-auto">
						<li className="flex items-start gap-3">
							<span className="w-2 h-2 rounded-full bg-white/60 mt-2" />
							<span>Une confiance mutuelle</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="w-2 h-2 rounded-full bg-white/60 mt-2" />
							<span>Un dialogue permanent entre les parents et la nounou</span>
						</li>
					</ul>
				</div>
			</div>
		</SectionWrapper>
	)
}
