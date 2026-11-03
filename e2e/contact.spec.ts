import { expect, type Page, test } from '@playwright/test'
import { preparerContexte } from './outils/stabiliser'

// Le formulaire n'envoie jamais rien : /api/contact est intercepté dans le navigateur.

async function remplir(page: Page) {
	await page.getByLabel(/Nom complet/).fill('Camille Test')
	await page.getByLabel(/Email/).fill('camille@example.com')
	await page.getByLabel(/Téléphone/).fill('06 00 00 00 00')
	await page.getByLabel(/Message/).fill('Bonjour, une place en janvier ?')
}

test.beforeEach(async ({ context, page }) => {
	await preparerContexte(context, { horloge: false })
	await page.goto('/contact')
})

test('un message valide part vers /api/contact et le visiteur est prévenu', async ({ page }) => {
	let corps: unknown
	await page.route('**/api/contact', async route => {
		corps = route.request().postDataJSON()
		await route.fulfill({ status: 200, json: { success: true } })
	})
	await remplir(page)
	await page.getByRole('button', { name: /Envoyer/ }).click()
	await expect(page.getByText('Message envoyé avec succès')).toBeVisible()
	expect(corps).toEqual({
		name: 'Camille Test',
		email: 'camille@example.com',
		phone: '06 00 00 00 00',
		preferredDate: '',
		message: 'Bonjour, une place en janvier ?',
	})
	await expect(page.getByLabel(/Nom complet/)).toHaveValue('')
})

test('une erreur du serveur est annoncée et le formulaire garde la saisie', async ({ page }) => {
	await page.route('**/api/contact', route => route.fulfill({ status: 500, json: { error: 'x' } }))
	await remplir(page)
	await page.getByRole('button', { name: /Envoyer/ }).click()
	await expect(page.getByText('Une erreur est survenue. Veuillez réessayer.')).toBeVisible()
	await expect(page.getByLabel(/Nom complet/)).toHaveValue('Camille Test')
})

test('les champs obligatoires bloquent l’envoi', async ({ page }) => {
	let appels = 0
	await page.route('**/api/contact', route => {
		appels++
		return route.fulfill({ status: 200, json: { success: true } })
	})
	await page.getByRole('button', { name: /Envoyer/ }).click()
	expect(await page.getByLabel(/Nom complet/).evaluate(e => (e as HTMLInputElement).validity.valueMissing)).toBe(true)
	expect(appels).toBe(0)
})

test('la route /api/contact refuse une demande incomplète (400)', async ({ request }) => {
	const reponse = await request.post('/api/contact', { data: { name: '', email: '', message: '' } })
	expect(reponse.status()).toBe(400)
})
