'use client'

import { Loader2, Send } from 'lucide-react'
import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { HONEYPOT_FIELD } from '@/lib/security/spam'

/**
 * Clé publique du widget Turnstile « isabelle-cinquin.fr contact » (compte Cloudflare d'Andy).
 * En développement : clé de test de Cloudflare, qui passe toujours (le serveur ignore alors la vérification).
 */
const TURNSTILE_SITE_KEY =
	process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
	(process.env.NODE_ENV === 'production' ? '0x4AAAAAAGJAI4gjPIGVNHso' : '1x00000000000000000000AA')

interface TurnstileApi {
	render: (
		element: HTMLElement,
		options: {
			sitekey: string
			callback: (token: string) => void
			'expired-callback': () => void
			'error-callback': () => void
			language?: string
			theme?: 'auto' | 'light' | 'dark'
		}
	) => string
	reset: (widgetId?: string) => void
	remove: (widgetId?: string) => void
}

declare global {
	interface Window {
		turnstile?: TurnstileApi
	}
}

interface ContactFormData {
	name: string
	email: string
	phone: string
	preferredDate: string
	message: string
}

export function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [formData, setFormData] = useState<ContactFormData>({
		name: '',
		email: '',
		phone: '',
		preferredDate: '',
		message: '',
	})
	// Widget Turnstile : conteneur, identifiant et dernier jeton (à usage unique, valable environ 5 minutes).
	const turnstileContainerRef = useRef<HTMLDivElement>(null)
	const turnstileWidgetRef = useRef<string | null>(null)
	const turnstileTokenRef = useRef<string | null>(null)
	const honeypotRef = useRef<HTMLInputElement>(null)

	/** Affiche le widget une fois le script chargé (aussi après une navigation côté client). */
	function renderTurnstile() {
		const container = turnstileContainerRef.current
		if (!window.turnstile || !container || turnstileWidgetRef.current) return
		turnstileWidgetRef.current = window.turnstile.render(container, {
			sitekey: TURNSTILE_SITE_KEY,
			language: 'fr',
			theme: 'light',
			callback: token => {
				turnstileTokenRef.current = token
			},
			'expired-callback': () => {
				turnstileTokenRef.current = null
			},
			'error-callback': () => {
				turnstileTokenRef.current = null
			},
		})
	}

	/** Un jeton ne sert qu'une fois : on en redemande un après chaque tentative. */
	function resetTurnstile() {
		turnstileTokenRef.current = null
		if (turnstileWidgetRef.current) window.turnstile?.reset(turnstileWidgetRef.current)
	}

	useEffect(() => {
		return () => {
			if (turnstileWidgetRef.current) window.turnstile?.remove(turnstileWidgetRef.current)
			turnstileWidgetRef.current = null
		}
	}, [])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const turnstileToken = turnstileTokenRef.current
		if (!turnstileToken) {
			toast.info('Vérification anti-robot en cours', {
				description: 'Patientez quelques secondes puis renvoyez le message.',
			})
			return
		}
		setIsSubmitting(true)

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...formData, turnstileToken, website: honeypotRef.current?.value ?? '' }),
			})

			if (response.status === 403) {
				toast.error("La vérification anti-robot n'a pas abouti. Patientez quelques secondes puis renvoyez le message.")
				return
			}
			if (!response.ok) {
				throw new Error("Erreur lors de l'envoi")
			}

			toast.success('Message envoyé avec succès ! Je vous répondrai rapidement.')
			setFormData({
				name: '',
				email: '',
				phone: '',
				preferredDate: '',
				message: '',
			})
		} catch {
			toast.error('Une erreur est survenue. Veuillez réessayer.')
		} finally {
			resetTurnstile()
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="grid md:grid-cols-2 gap-6">
				<div>
					<label htmlFor="name" className="block text-sm font-medium mb-2">
						Nom complet <span className="text-accent">*</span>
					</label>
					<input
						type="text"
						id="name"
						name="name"
						required
						value={formData.name}
						onChange={handleChange}
						className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors placeholder:text-white/50"
						placeholder="Votre nom"
					/>
				</div>

				<div>
					<label htmlFor="email" className="block text-sm font-medium mb-2">
						Email <span className="text-accent">*</span>
					</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						value={formData.email}
						onChange={handleChange}
						className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors placeholder:text-white/50"
						placeholder="votre@email.com"
					/>
				</div>
			</div>

			<div className="grid md:grid-cols-2 gap-6">
				<div>
					<label htmlFor="phone" className="block text-sm font-medium mb-2">
						Téléphone
					</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors placeholder:text-white/50"
						placeholder="06 00 00 00 00"
					/>
				</div>

				<div>
					<label htmlFor="preferredDate" className="block text-sm font-medium mb-2">
						Date de garde souhaitée
					</label>
					<input
						type="date"
						id="preferredDate"
						name="preferredDate"
						value={formData.preferredDate}
						onChange={handleChange}
						className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors"
					/>
				</div>
			</div>

			<div>
				<label htmlFor="message" className="block text-sm font-medium mb-2">
					Message <span className="text-accent">*</span>
				</label>
				<textarea
					id="message"
					name="message"
					required
					rows={5}
					value={formData.message}
					onChange={handleChange}
					className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors placeholder:text-white/50 resize-none"
					placeholder="Décrivez votre besoin (âge de l'enfant, jours souhaités, etc.)"
				/>
			</div>

			{/* Champ piège : invisible pour les visiteurs, rempli par les robots qui remplissent tout. */}
			<div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
				<label htmlFor={HONEYPOT_FIELD}>Ne pas remplir ce champ</label>
				<input
					ref={honeypotRef}
					id={HONEYPOT_FIELD}
					name={HONEYPOT_FIELD}
					type="text"
					tabIndex={-1}
					autoComplete="off"
				/>
			</div>

			{/* Cloudflare Turnstile : vérification anti-robot, le plus souvent invisible pour le visiteur. */}
			<Script
				src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
				strategy="afterInteractive"
				onReady={renderTurnstile}
			/>
			<div ref={turnstileContainerRef} className="min-h-[65px]" />

			<button
				type="submit"
				disabled={isSubmitting}
				className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
			>
				{isSubmitting ? (
					<>
						<Loader2 className="w-5 h-5 animate-spin" />
						Envoi en cours...
					</>
				) : (
					<>
						<Send className="w-5 h-5" />
						Envoyer le message
					</>
				)}
			</button>
		</form>
	)
}
