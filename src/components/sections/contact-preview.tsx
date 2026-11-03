'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Heart, Phone, Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SectionWrapper } from '@/components/ui/section-wrapper'

interface ContactPreviewProps {
	phone?: string | null
	title?: string | null
	content?: string | null
}

export function ContactPreview({ phone, title, content }: ContactPreviewProps) {
	if (!title || !content) {
		throw new Error('Missing required data for Contact section')
	}

	return (
		<SectionWrapper id="contact" variant="primary" className="overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 md:px-6">
				{/* CTA Box with decorative elements */}
				<motion.div
					className="relative mx-auto flex w-full max-w-4xl flex-col justify-between gap-y-8 border border-white/20 bg-white/5 backdrop-blur-sm rounded-3xl px-6 py-12 md:px-12 md:py-16"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
					whileHover={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
				>
					{/* Corner decorations with pulse */}
					{[
						{ top: 4, left: 4 },
						{ top: 4, right: 4 },
						{ bottom: 4, left: 4 },
						{ bottom: 4, right: 4 },
					].map(pos => {
						// Calculate delay based on position (top-left: 0, top-right: 0.5, bottom-left: 1, bottom-right: 1.5)
						const delay = (pos.top !== undefined ? 0 : 1) + (pos.left !== undefined ? 0 : 0.5)
						return (
							<motion.div
								key={`corner-${pos.top ?? 'b'}-${pos.left ?? 'r'}`}
								className="absolute"
								style={pos}
								animate={{
									rotate: [0, 90, 0],
									opacity: [0.3, 0.6, 0.3],
								}}
								transition={{
									duration: 4,
									delay: delay * 0.5,
									repeat: Number.POSITIVE_INFINITY,
									ease: 'easeInOut',
								}}
							>
								<Plus className="size-5 text-white/30" strokeWidth={1.5} />
							</motion.div>
						)
					})}

					{/* Center dashed line decoration */}
					<div className="absolute top-8 bottom-8 left-1/2 w-px border-l border-dashed border-white/10" />

					{/* Main content */}
					<div className="space-y-4 text-center relative z-10">
						<motion.div
							className="inline-flex items-center justify-center gap-2 text-pink-300 mb-2"
							initial={{ scale: 0, rotate: -180 }}
							whileInView={{ scale: 1, rotate: 0 }}
							viewport={{ once: true }}
							transition={{
								type: 'spring',
								stiffness: 200,
								damping: 15,
								delay: 0.2,
							}}
						>
							<motion.div
								animate={{
									scale: [1, 1.2, 1],
								}}
								transition={{
									duration: 2,
									repeat: Number.POSITIVE_INFINITY,
									ease: 'easeInOut',
								}}
							>
								<Heart className="size-5 fill-current" />
							</motion.div>
						</motion.div>

						<motion.h2
							className="text-3xl md:text-4xl font-bold text-white tracking-tight"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.3 }}
						>
							{title}
						</motion.h2>

						<motion.p
							className="text-white/70 text-lg max-w-xl mx-auto"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 0.7 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							{content}
						</motion.p>
					</div>

					{/* CTA Buttons with stagger */}
					<motion.div
						className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={{
							hidden: {},
							visible: {
								transition: {
									staggerChildren: 0.1,
									delayChildren: 0.5,
								},
							},
						}}
					>
						{phone && (
							<motion.div
								variants={{
									hidden: { opacity: 0, y: 20 },
									visible: { opacity: 1, y: 0 },
								}}
								transition={{ duration: 0.5 }}
							>
								<Button
									variant="outline"
									size="lg"
									asChild
									className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white hover:border-white/40"
								>
									<Link href={`tel:${phone.replace(/\s/g, '')}`}>
										<Phone className="size-4" />
										Appelez moi
									</Link>
								</Button>
							</motion.div>
						)}

						<motion.div
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: { opacity: 1, y: 0 },
							}}
							transition={{ duration: 0.5 }}
						>
							<Button
								size="lg"
								asChild
								className="rounded-full bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
							>
								<Link href="/contact" className="group">
									Contactez moi
									<motion.div
										animate={{ x: [0, 4, 0] }}
										transition={{
											duration: 1.5,
											repeat: Number.POSITIVE_INFINITY,
											ease: 'easeInOut',
										}}
									>
										<ArrowRight className="size-4" />
									</motion.div>
								</Link>
							</Button>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</SectionWrapper>
	)
}
