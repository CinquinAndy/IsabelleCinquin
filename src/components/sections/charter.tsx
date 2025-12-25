'use client'

import { motion } from 'framer-motion'
import { Clock, Heart, Home, MessageCircle, Stethoscope, Users, Wallet } from 'lucide-react'
import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import type { Landing } from '@/payload-types'

interface CharterProps {
	charterSection?: Landing['charterSection'] | null
}

// Icons for each rule
const ruleIcons = [Clock, Home, MessageCircle, Heart, Users, Stethoscope, Home, Clock, Wallet]

export function Charter({ charterSection }: CharterProps) {
	if (!charterSection?.title || !charterSection?.items) {
		throw new Error('Missing required data for Charter section: title or items')
	}

	const title = charterSection.title
	const subtitle = charterSection.subtitle
	const items = charterSection.items

	return (
		<SectionWrapper id="charte" variant="secondary" className="overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 md:px-6">
				<div className="flex flex-col gap-10 md:flex-row md:gap-16">
					{/* Left side - Title with animation */}
					<motion.div 
						className="md:w-1/3"
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
					>
						<div className="sticky top-24">
							<motion.h2 
								className="text-3xl md:text-4xl font-bold text-white tracking-tight"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.1 }}
							>
								{title.split(' ').slice(0, -1).join(' ')}{' '}
								<motion.span 
									className="font-handwriting text-white/80 inline-block"
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 0.8 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: 0.2 }}
								>
									{title.split(' ').slice(-1)}
								</motion.span>
							</motion.h2>
							<motion.p 
								className="text-white/70 mt-4"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 0.7 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.3 }}
							>
								{subtitle}
							</motion.p>
							<motion.p 
								className="text-white/60 mt-4 text-sm"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 0.6 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.4 }}
							>
								Des questions ?{' '}
								<Link href="/contact" className="text-white font-medium hover:underline hover:text-accent transition-colors">
									Contactez-moi
								</Link>
							</motion.p>
						</div>
					</motion.div>

					{/* Right side - Accordion with stagger */}
					<motion.div 
						className="md:w-2/3"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.1 }}
						variants={{
							hidden: {},
							visible: {
								transition: {
									staggerChildren: 0.06,
									delayChildren: 0.2,
								},
							},
						}}
					>
						<Accordion type="single" collapsible className="w-full space-y-3">
							{items.map((rule, index: number) => {
								const IconComponent = ruleIcons[index % ruleIcons.length]
								const ruleTitle = rule.title
								const content = rule.content

								if (!ruleTitle || !content) {
									throw new Error(`Missing title or content for charter rule ${rule.ruleNumber}`)
								}

								return (
									<motion.div
										key={rule.id || index}
										variants={{
											hidden: { opacity: 0, y: 20 },
											visible: { opacity: 1, y: 0 },
										}}
										transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
									>
										<AccordionItem
											value={rule.id || String(index)}
											className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-4 data-[state=open]:bg-white/15 data-[state=open]:border-white/30 transition-all"
										>
											<AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline text-white">
												<div className="flex items-center gap-3">
													<motion.div 
														className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/20"
														whileHover={{ scale: 1.1, rotate: 5 }}
														transition={{ duration: 0.3 }}
													>
														<IconComponent className="size-4 text-white" />
													</motion.div>
													<span className="text-base font-semibold text-white">{ruleTitle}</span>
												</div>
											</AccordionTrigger>
											<AccordionContent className="pb-5">
												<div className="pl-11">
													<p className="text-base text-white/80 leading-relaxed">{content}</p>
												</div>
											</AccordionContent>
										</AccordionItem>
									</motion.div>
								)
							})}
						</Accordion>
					</motion.div>
				</div>
			</div>
		</SectionWrapper>
	)
}
