'use client'

import { Clock, Heart, Home, MessageCircle, Stethoscope, Users, Wallet } from 'lucide-react'
import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import type { LandingCharterRule, LandingCharterSection } from '@/types/landing'

interface CharterProps {
	charterSection?: LandingCharterSection | null
}

// Icons for each rule
const ruleIcons = [Clock, Home, MessageCircle, Heart, Users, Stethoscope, Home, Clock, Wallet]

// Default rule titles
const defaultTitles: Record<number, string> = {
	1: 'Ponctualité le matin',
	2: "Respect de l'espace",
	3: 'Communication importante',
	4: 'Arrivée préparée',
	5: 'Questions bienvenues',
	6: 'Santé et maladie',
	7: 'Lieu de vie privé',
	8: 'Ponctualité le soir',
	9: 'Paiement régulier',
}

// Default rule contents
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

const defaultRules: LandingCharterRule[] = Array.from({ length: 9 }, (_, i) => ({
	id: String(i + 1),
	ruleNumber: i + 1,
	title: defaultTitles[i + 1],
}))

export function Charter({ charterSection }: CharterProps) {
	const title = charterSection?.title || 'Charte de vie'
	const subtitle = charterSection?.subtitle || 'Les règles de vie chez nounou, écrites du point de vue de votre enfant 💜'
	const rules = charterSection?.items || []
	const items = rules.length > 0 ? rules : defaultRules

	return (
		<SectionWrapper id="charte" variant="secondary" className="overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 md:px-6">
				<div className="flex flex-col gap-10 md:flex-row md:gap-16">
					{/* Left side - Title */}
					<div className="md:w-1/3">
						<div className="sticky top-24">
							<h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
								{title.split(' ').slice(0, -1).join(' ')}{' '}
								<span className="font-handwriting text-white/80">{title.split(' ').slice(-1)}</span>
							</h2>
							<p className="text-white/70 mt-4">{subtitle}</p>
							<p className="text-white/60 mt-4 text-sm">
								Des questions ?{' '}
								<Link href="/contact" className="text-white font-medium hover:underline">
									Contactez-moi
								</Link>
							</p>
						</div>
					</div>

					{/* Right side - Accordion */}
					<div className="md:w-2/3">
						<Accordion type="single" collapsible className="w-full space-y-3">
							{items.map((rule: LandingCharterRule, index: number) => {
								const IconComponent = ruleIcons[index % ruleIcons.length]
								const ruleTitle = rule.title || defaultTitles[rule.ruleNumber] || `Règle ${rule.ruleNumber}`
								const content = rule.content || defaultContents[rule.ruleNumber] || 'Contenu à définir.'

								return (
									<AccordionItem
										key={rule.id || index}
										value={rule.id || String(index)}
										className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-4 data-[state=open]:bg-white/15 transition-all"
									>
										<AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline text-white">
											<div className="flex items-center gap-3">
												<div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/20">
													<IconComponent className="size-4 text-white" />
												</div>
												<span className="text-base font-semibold text-white">{title}</span>
											</div>
										</AccordionTrigger>
										<AccordionContent className="pb-5">
											<div className="pl-11">
												<p className="text-base text-white/80 leading-relaxed">{content}</p>
											</div>
										</AccordionContent>
									</AccordionItem>
								)
							})}
						</Accordion>
					</div>
				</div>
			</div>
		</SectionWrapper>
	)
}
