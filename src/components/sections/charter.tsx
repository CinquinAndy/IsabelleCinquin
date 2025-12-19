'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { SectionTitle } from '@/components/ui/section-title'
import { cn } from '@/lib/utils'

interface CharterRule {
	id?: string
	ruleNumber: number
	title?: string | null
	content?: unknown
}

interface CharterProps {
	rules?: CharterRule[] | null
}

const defaultRules: CharterRule[] = [
	{
		id: '1',
		ruleNumber: 1,
		title: '1ère règle de Nounou',
	},
	{
		id: '2',
		ruleNumber: 2,
		title: '2ème règle de Nounou',
	},
	{
		id: '3',
		ruleNumber: 3,
		title: '3ème règle de Nounou',
	},
	{
		id: '4',
		ruleNumber: 4,
		title: '4ème règle de Nounou',
	},
	{
		id: '5',
		ruleNumber: 5,
		title: '5ème règle de Nounou',
	},
	{
		id: '6',
		ruleNumber: 6,
		title: '6ème règle de Nounou',
	},
	{
		id: '7',
		ruleNumber: 7,
		title: '7ème règle de Nounou',
	},
	{
		id: '8',
		ruleNumber: 8,
		title: '8ème règle de Nounou',
	},
	{
		id: '9',
		ruleNumber: 9,
		title: '9ème règle de Nounou',
	},
]

const defaultContents: Record<number, string> = {
	1: "Papa, Maman, il est important pour mon rythme et l'organisation de nounou d'arriver bien à l'heure chaque jour. En cas d'imprévu, merci de prévenir Nounou.",
	2: "Papa, Maman, pensez à bien rester à l'entrée. Car c'est moi qui vais crapahuter ici toute la journée.",
	3: "Papa, Maman, je suis trop jeune pour expliquer ma nuit, mon petit déj, le week-end... à nounou. Prenez 5 minutes pour tout raconter à nounou, cela va drôlement l'aider à s'occuper de moi toute cette nouvelle journée.",
	4: "Papa, Maman, je me sens bien mieux quand j'arrive chez nounou habillé, débarbouillé, ma couche changée. Merci de respecter chaque jour ces petits gestes qui sont si agréables pour Nounou.",
	5: "Papa, Maman, n'hésitez pas à poser à ma nounou des questions qui vous préoccupent concernant mon évolution, alimentation, sommeil, santé, ma vie ici chez nounou...",
	6: "Papa, Maman, si je suis malade avec de la fièvre, ne me mettez pas chez Nounou sans avoir pris le soin de m'emmener au préalable chez le docteur. Je reviendrais chez nounou avec le traitement adapté.",
	7: "Papa, Maman, n'oubliez pas, le lieu de travail de Nounou est aussi sa maison, c'est pour cela qu'il faut respecter son environnement et ne pas être trop envahissant.",
	8: "Papa et Maman, le soir, la ponctualité atténue mes angoisses. Pensez à prévenir Nounou d'un retard exceptionnel afin qu'elle puisse me rassurer et m'expliquer. En plus nounou n'est pas que nounou tout le temps, elle peut aussi avoir des rendez-vous persos !",
	9: "Tout travail mérite salaire, Papa, Maman, n'oubliez pas de payer Nounou, elle aussi, doit payer son loyer, ses charges...",
}

export function Charter({ rules }: CharterProps) {
	const [openIndex, setOpenIndex] = useState<number | null>(null)
	const items = rules && rules.length > 0 ? rules : defaultRules

	return (
		<SectionWrapper id="charte" variant="secondary">
			<SectionTitle subtitle="Les règles de vie chez nounou">Charte de vie</SectionTitle>

			<div className="max-w-2xl mx-auto space-y-3">
				{items.map((rule, index) => {
					const isOpen = openIndex === index

					return (
						<div key={rule.id || index} className="bg-white/10 rounded-xl overflow-hidden">
							<button
								type="button"
								onClick={() => setOpenIndex(isOpen ? null : index)}
								className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
							>
								<span className="font-bold">{rule.title || `${rule.ruleNumber}ème règle de Nounou`}</span>
								<ChevronDown className={cn('w-5 h-5 transition-transform', isOpen && 'rotate-180')} />
							</button>

							<div className={cn('grid transition-all duration-300', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
								<div className="overflow-hidden">
									<div className="p-4 pt-0 opacity-90">{defaultContents[rule.ruleNumber] || 'Contenu à définir.'}</div>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</SectionWrapper>
	)
}


