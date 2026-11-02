import { expect, test } from '@playwright/test'

// Contrôle minimal : les pages publiques répondent, sans erreur dans la console, et les fichiers pour les moteurs
// de recherche sont servis. Ne dépend pas du contenu saisi dans l'administration.

const pages = ['/', '/blog', '/contact', '/mentions-legales']

for (const route of pages) {
	test(`la page ${route} s'affiche`, async ({ page }) => {
		const erreurs: string[] = []
		page.on('pageerror', e => erreurs.push(e.message))
		const reponse = await page.goto(route)
		expect(reponse?.status()).toBe(200)
		await expect(page.locator('body')).toBeVisible()
		await expect(page.locator('h1, h2').first()).toBeVisible()
		expect(erreurs).toEqual([])
	})
}

test('une adresse inconnue répond 404', async ({ page }) => {
	const reponse = await page.goto('/page-qui-n-existe-pas')
	expect(reponse?.status()).toBe(404)
})

test('chaque article listé sur le blog s’ouvre', async ({ page, request }) => {
	await page.goto('/blog')
	const liens = await page.locator('a[href^="/blog/"]').evaluateAll(as => [
		...new Set(as.map(a => a.getAttribute('href') ?? '')),
	])
	for (const lien of liens) {
		expect((await request.get(lien)).status(), lien).toBe(200)
	}
})

test('le sitemap liste les pages publiques', async ({ request }) => {
	const reponse = await request.get('/sitemap.xml')
	expect(reponse.status()).toBe(200)
	const xml = await reponse.text()
	for (const chemin of ['', '/blog', '/contact', '/mentions-legales']) {
		expect(xml).toContain(`<loc>https://isabelle-cinquin.fr${chemin}</loc>`)
	}
	expect(xml).not.toContain('/admin')
})

test('le robots.txt bloque l’administration et donne le sitemap', async ({ request }) => {
	const reponse = await request.get('/robots.txt')
	expect(reponse.status()).toBe(200)
	const texte = await reponse.text()
	expect(texte).toContain('Disallow: /admin/')
	expect(texte).toContain('Allow: /api/media/file/')
	expect(texte).toContain('Sitemap: https://isabelle-cinquin.fr/sitemap.xml')
})
