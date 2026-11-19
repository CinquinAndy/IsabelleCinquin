import { beforeEach, describe, expect, it, vi } from 'vitest'

const send = vi.fn()
vi.mock('resend', () => ({
	Resend: class {
		emails = { send }
	},
}))

const { POST } = await import('./route')

const requete = (corps: unknown) =>
	new Request('http://localhost/api/contact', {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(corps),
	})

const complet = {
	name: 'Camille',
	email: 'camille@example.com',
	phone: '06 00 00 00 00',
	preferredDate: '2026-12-01',
	message: 'Bonjour,\nune place en janvier ?',
}

describe('POST /api/contact', () => {
	beforeEach(() => {
		send.mockReset()
		vi.spyOn(console, 'error').mockImplementation(() => {})
		vi.spyOn(console, 'info').mockImplementation(() => {})
		vi.spyOn(console, 'warn').mockImplementation(() => {})
		process.env.RESEND_API_KEY = 're_test'
		delete process.env.CONTACT_EMAIL
		delete process.env.TURNSTILE_SECRET_KEY
		vi.unstubAllEnvs()
		vi.unstubAllGlobals()
	})

	it.each([
		['le nom', { ...complet, name: '' }],
		['l’email', { ...complet, email: '' }],
		['le message', { ...complet, message: '' }],
	])('refuse un message sans %s (400), sans rien envoyer', async (_champ, corps) => {
		const reponse = await POST(requete(corps))
		expect(reponse.status).toBe(400)
		expect(await reponse.json()).toEqual({ error: 'Nom, email et message sont requis' })
		expect(send).not.toHaveBeenCalled()
	})

	it('envoie le message à la nounou, avec l’adresse du parent en réponse', async () => {
		send.mockResolvedValue({ data: { id: 'x' }, error: null })

		const reponse = await POST(requete(complet))

		expect(reponse.status).toBe(200)
		expect(await reponse.json()).toEqual({ success: true })
		expect(send).toHaveBeenCalledTimes(1)
		const courriel = send.mock.calls[0][0]
		expect(courriel).toMatchObject({
			from: 'Nounou Sciez <contact@andy-cinquin.com>',
			to: 'andorma@gmail.com',
			replyTo: 'camille@example.com',
			subject: '[Nounou Sciez] Nouveau message de Camille',
		})
		expect(courriel.html).toContain('Bonjour,\nune place en janvier ?')
		expect(courriel.html).toContain('href="tel:0600000000"')
		expect(courriel.html).toContain('01/12/2026')
	})

	it('suit CONTACT_EMAIL quand il est défini', async () => {
		process.env.CONTACT_EMAIL = 'autre@example.com'
		send.mockResolvedValue({ data: { id: 'x' }, error: null })
		await POST(requete(complet))
		expect(send.mock.calls[0][0].to).toBe('autre@example.com')
	})

	it('répond 500 si Resend refuse l’envoi', async () => {
		send.mockResolvedValue({ data: null, error: { message: 'refusé' } })
		const reponse = await POST(requete(complet))
		expect(reponse.status).toBe(500)
		expect(await reponse.json()).toEqual({ error: "Erreur lors de l'envoi de l'email" })
	})

	it('répond 500 sur un corps illisible', async () => {
		const reponse = await POST(new Request('http://localhost/api/contact', { method: 'POST', body: 'pas du json' }))
		expect(reponse.status).toBe(500)
		expect(send).not.toHaveBeenCalled()
	})

	it('échappe le HTML saisi par le visiteur', async () => {
		send.mockResolvedValue({ data: { id: 'x' }, error: null })
		await POST(requete({ ...complet, name: '<b>Camille</b>', message: '<a href="https://x.example">clic</a>' }))
		const html = send.mock.calls[0][0].html as string
		expect(html).not.toContain('<b>Camille</b>')
		expect(html).not.toContain('<a href="https://x.example">')
		expect(html).toContain('&lt;b&gt;Camille&lt;/b&gt;')
	})

	it('signale dans l’objet un message qui contient un lien', async () => {
		send.mockResolvedValue({ data: { id: 'x' }, error: null })
		await POST(requete({ ...complet, message: 'Voir www.exemple.fr' }))
		expect(send.mock.calls[0][0].subject).toBe('[Lien dans le message] [Nounou Sciez] Nouveau message de Camille')
	})

	it('refuse un email mal formé ou un message trop long (400)', async () => {
		expect((await POST(requete({ ...complet, email: 'pas-un-email' }))).status).toBe(400)
		expect((await POST(requete({ ...complet, message: 'a'.repeat(5001) }))).status).toBe(400)
		expect(send).not.toHaveBeenCalled()
	})

	it('écarte en silence un robot qui remplit le champ piège', async () => {
		const reponse = await POST(requete({ ...complet, website: 'https://spam.example' }))
		expect(reponse.status).toBe(200)
		expect(await reponse.json()).toEqual({ success: true })
		expect(send).not.toHaveBeenCalled()
	})

	it('écarte en silence un nom et un message en lettres au hasard', async () => {
		const reponse = await POST(requete({ ...complet, name: 'FzEwOOmxoOoDAyMmIDdgBtPG', message: 'oKcQzvnDkccQlIuC' }))
		expect(reponse.status).toBe(200)
		expect(send).not.toHaveBeenCalled()
	})

	it('refuse (403) quand Cloudflare rejette le jeton Turnstile', async () => {
		process.env.TURNSTILE_SECRET_KEY = 'secret-de-test'
		const verification = vi
			.fn()
			.mockResolvedValue(new Response(JSON.stringify({ success: false, 'error-codes': ['invalid-input-response'] })))
		vi.stubGlobal('fetch', verification)
		const reponse = await POST(requete({ ...complet, turnstileToken: 'jeton' }))
		expect(reponse.status).toBe(403)
		expect(verification).toHaveBeenCalledTimes(1)
		expect(send).not.toHaveBeenCalled()
	})

	it('envoie quand Cloudflare valide le jeton Turnstile', async () => {
		process.env.TURNSTILE_SECRET_KEY = 'secret-de-test'
		vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true }))))
		send.mockResolvedValue({ data: { id: 'x' }, error: null })
		const reponse = await POST(requete({ ...complet, turnstileToken: 'jeton' }))
		expect(reponse.status).toBe(200)
		expect(send).toHaveBeenCalledTimes(1)
	})

	it('refuse tout envoi en production quand TURNSTILE_SECRET_KEY manque', async () => {
		vi.stubEnv('NODE_ENV', 'production')
		const reponse = await POST(requete({ ...complet, turnstileToken: 'jeton' }))
		expect(reponse.status).toBe(403)
		expect(send).not.toHaveBeenCalled()
	})
})
