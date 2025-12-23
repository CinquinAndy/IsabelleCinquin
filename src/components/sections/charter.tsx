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
export function Charter({ charterSection }: CharterProps) {
	if (!charterSection?.title || !charterSection?.items) {
		throw new Error('Missing required data for Charter section: title or items')
	}

	const title = charterSection.title
	const subtitle =
		charterSection.subtitle || 'Les règles de vie chez nounou, écrites du point de vue de votre enfant 💜'
	const items = charterSection.items

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
								const ruleTitle = rule.title
								const content = rule.content

								if (!ruleTitle || !content) {
									throw new Error(`Missing title or content for charter rule ${rule.ruleNumber}`)
								}

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
												<span className="text-base font-semibold text-white">{ruleTitle}</span>
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
