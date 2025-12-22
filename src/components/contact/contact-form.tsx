'use client'

import { Loader2, Send } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			})

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
