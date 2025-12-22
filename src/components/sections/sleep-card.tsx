'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Moon, ArrowRight } from 'lucide-react'

interface SleepCardProps {
	title?: string
	description?: string
	scheduleNight?: string
	scheduleEvening?: string
	capacity?: string
}

export function SleepCard({
	title = 'Accueil de nuit',
	description = "Pour les parents qui travaillent tôt le matin ou tard le soir, j'offre un service d'accueil de nuit dans un environnement calme et sécurisé.",
	scheduleNight = '18h - 7h',
	scheduleEvening = 'Du soir au matin',
	capacity = '1 enfant',
}: SleepCardProps) {
	return (
		<motion.div
			className="relative overflow-hidden rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6 }}
		>
			{/* Subtle gradient background */}
			<div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5" />

			<div className="relative flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
				{/* Left: Icon/Illustration */}
				<div className="relative shrink-0">
					{/* Glassmorphism circle background */}
					<div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 backdrop-blur-sm flex items-center justify-center">
						{/* Inner glow */}
						<div className="absolute inset-4 rounded-full bg-white/40 backdrop-blur-sm" />
						
						{/* SVG Illustration */}
						<Image
							src="/icons/scribbbles/7/SVG/Fichier 2.svg"
							alt="Illustration sommeil"
							width={120}
							height={120}
							className="relative z-10 drop-shadow-lg"
						/>
					</div>

					{/* Schedule badges floating around */}
					<motion.div
						className="absolute -top-2 right-0 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md border border-white/50"
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.3 }}
					>
						<span className="text-xs font-semibold text-primary">{scheduleEvening}</span>
					</motion.div>

					<motion.div
						className="absolute bottom-4 -left-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md border border-white/50"
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.4 }}
					>
						<span className="text-xs font-semibold text-secondary">{scheduleNight}</span>
					</motion.div>

					<motion.div
						className="absolute top-1/2 -right-6 bg-accent/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md"
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.5 }}
					>
						<span className="text-xs font-bold text-white">{capacity}</span>
					</motion.div>
				</div>

				{/* Right: Content */}
				<div className="flex-1 text-center md:text-left">
					{/* Small icon */}
					<div className="inline-flex items-center gap-2 mb-3">
						<div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
							<Moon className="w-4 h-4 text-secondary" />
						</div>
						<span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
							Service de nuit
						</span>
					</div>

					<h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
						{title}
					</h3>

					<p className="text-muted-foreground leading-relaxed mb-5 max-w-md">
						{description}
					</p>

					{/* CTA */}
					<Link
						href="/contact"
						className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors group"
					>
						En savoir plus
						<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
					</Link>
				</div>
			</div>

			{/* Decorative elements */}
			<div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
			<div className="absolute -top-8 -left-8 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />
		</motion.div>
	)
}

