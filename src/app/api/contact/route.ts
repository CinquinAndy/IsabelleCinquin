import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { containsLink, isHoneypotFilled, looksLikeBotText } from '@/lib/security/spam'
import { verifyTurnstile } from '@/lib/security/turnstile'

interface ContactFormData {
	name: string
	email: string
	phone?: string
	preferredDate?: string
	message: string
	/** Jeton Cloudflare Turnstile produit par le widget de la page. */
	turnstileToken?: string
	/** Champ piège caché (voir HONEYPOT_FIELD) : vide pour un visiteur. */
	website?: string
}

// Expéditeur sur un domaine vérifié dans le compte Resend (andy-cinquin.com) : isabelle-cinquin.fr ne l'est pas,
// Resend refusait donc tout envoi depuis contact@isabelle-cinquin.fr.
const FROM = 'Nounou Sciez <contact@andy-cinquin.com>'

const MAX_LENGTH = { name: 200, email: 320, phone: 40, preferredDate: 40, message: 5000 } as const

const CAPTCHA_ERROR_MESSAGE =
	"La vérification anti-robot n'a pas abouti. Patientez quelques secondes puis renvoyez le message."

/** Le nom, le message… sont collés dans le HTML du mail : sans échappement, un robot y glissait balises et liens. */
function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;')
}

function text(value: unknown): string {
	return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: Request) {
	try {
		const body: ContactFormData = await request.json()
		const name = text(body.name)
		const email = text(body.email)
		const phone = text(body.phone)
		const preferredDate = text(body.preferredDate)
		const message = text(body.message)

		// Validation
		if (!name || !email || !message) {
			return NextResponse.json({ error: 'Nom, email et message sont requis' }, { status: 400 })
		}
		if (
			name.length > MAX_LENGTH.name ||
			email.length > MAX_LENGTH.email ||
			phone.length > MAX_LENGTH.phone ||
			preferredDate.length > MAX_LENGTH.preferredDate ||
			message.length > MAX_LENGTH.message ||
			!/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(email)
		) {
			return NextResponse.json({ error: 'Champs invalides' }, { status: 400 })
		}

		// Robots : champ piège rempli ou texte au hasard. Réponse de succès habituelle, rien n'est envoyé.
		if (isHoneypotFilled(body.website) || looksLikeBotText({ name, message })) {
			console.info('Formulaire de contact : envoi de robot écarté.')
			return NextResponse.json({ success: true })
		}

		// Cloudflare Turnstile : le jeton est vérifié ici, la route pouvant être appelée sans passer par la page.
		const turnstile = await verifyTurnstile(body.turnstileToken)
		if (!turnstile.success) {
			console.warn('Formulaire de contact : Turnstile refusé.', turnstile.errorCodes)
			return NextResponse.json({ error: CAPTCHA_ERROR_MESSAGE, code: 'CAPTCHA_FAILED' }, { status: 403 })
		}

		const apiKey = process.env.RESEND_API_KEY
		if (!apiKey) {
			console.error('Formulaire de contact : RESEND_API_KEY absent, envoi impossible.')
			return NextResponse.json({ error: "Erreur lors de l'envoi de l'email" }, { status: 500 })
		}
		const resend = new Resend(apiKey)

		const date = preferredDate ? new Date(preferredDate) : null
		const dateLabel = date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString('fr-FR') : ''
		const safePhone = escapeHtml(phone)
		const telHref = escapeHtml(phone.replace(/[^\d+]/g, ''))

		// Send email via Resend
		const { error } = await resend.emails.send({
			from: FROM,
			to: process.env.CONTACT_EMAIL || 'andorma@gmail.com',
			replyTo: email,
			subject: `${containsLink(message) ? '[Lien dans le message] ' : ''}[Nounou Sciez] Nouveau message de ${name}`,
			html: `
				<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #6446a6;">Nouveau message depuis le site</h2>

					<div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
						<p><strong>Nom :</strong> ${escapeHtml(name)}</p>
						<p><strong>Email :</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
						${phone ? `<p><strong>Téléphone :</strong> <a href="tel:${telHref}">${safePhone}</a></p>` : ''}
						${dateLabel ? `<p><strong>Date souhaitée :</strong> ${escapeHtml(dateLabel)}</p>` : ''}
					</div>

					<div style="background: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
						<h3 style="color: #453073; margin-top: 0;">Message :</h3>
						<p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
					</div>

					<p style="color: #888; font-size: 12px; margin-top: 30px;">
						Ce message a été envoyé depuis le formulaire de contact du site isabelle-cinquin.fr
					</p>
				</div>
			`,
		})

		if (error) {
			// Pas de données du visiteur dans les journaux : seulement le retour de Resend.
			console.error('Resend error:', { name: error.name, message: error.message })
			return NextResponse.json({ error: "Erreur lors de l'envoi de l'email" }, { status: 500 })
		}

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error('Contact form error:', error instanceof Error ? error.message : error)
		return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
	}
}
