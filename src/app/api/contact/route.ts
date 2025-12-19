import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormData {
	name: string
	email: string
	phone?: string
	preferredDate?: string
	message: string
}

export async function POST(request: Request) {
	try {
		const body: ContactFormData = await request.json()
		const { name, email, phone, preferredDate, message } = body

		// Validation
		if (!name || !email || !message) {
			return NextResponse.json({ error: 'Nom, email et message sont requis' }, { status: 400 })
		}

		// Send email via Resend
		const { error } = await resend.emails.send({
			from: 'Nounou Sciez <contact@isabelle-cinquin.fr>',
			to: process.env.CONTACT_EMAIL || 'andorma@gmail.com',
			replyTo: email,
			subject: `[Nounou Sciez] Nouveau message de ${name}`,
			html: `
				<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #6446a6;">Nouveau message depuis le site</h2>
					
					<div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
						<p><strong>Nom :</strong> ${name}</p>
						<p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
						${phone ? `<p><strong>Téléphone :</strong> <a href="tel:${phone.replace(/\s/g, '')}">${phone}</a></p>` : ''}
						${preferredDate ? `<p><strong>Date souhaitée :</strong> ${new Date(preferredDate).toLocaleDateString('fr-FR')}</p>` : ''}
					</div>
					
					<div style="background: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
						<h3 style="color: #453073; margin-top: 0;">Message :</h3>
						<p style="white-space: pre-wrap;">${message}</p>
					</div>
					
					<p style="color: #888; font-size: 12px; margin-top: 30px;">
						Ce message a été envoyé depuis le formulaire de contact du site isabelle-cinquin.fr
					</p>
				</div>
			`,
		})

		if (error) {
			console.error('Resend error:', error)
			return NextResponse.json({ error: "Erreur lors de l'envoi de l'email" }, { status: 500 })
		}

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error('Contact form error:', error)
		return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
	}
}


