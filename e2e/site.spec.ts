import { expect, test } from '@playwright/test'
import { preparerContexte } from './outils/stabiliser'

// Les pages publiques répondent sans erreur, leurs balises SEO sont celles de la production, et les fichiers pour les
// moteurs de recherche sont servis. Contenu : l'instantané de e2e/instantane/.

test.beforeEach(async ({ context }) => {
	await preparerContexte(context)
})

const pages = ['/', '/blog', '/blog/peinturemagique', '/contact', '/mentions-legales']

// Relevé sur https://isabelle-cinquin.fr le 03/11/2026.
const SEO = [
	{
		route: '/',
		titre: 'Nounou Sciez | Isabelle Cinquin',
		canonique: 'https://isabelle-cinquin.fr',
		description: /^Nounou agréée à Sciez au bord du Lac Léman\./,
		jsonLd: ['ChildCare', 'WebSite', 'Person'],
	},
	{
		route: '/blog',
		titre: 'Blog Petite Enfance | Conseils Nounou - Isabelle Cinquin | Isabelle Cinquin',
		canonique: 'https://isabelle-cinquin.fr/blog',
		description: /^Découvrez mes articles : activités manuelles/,
	},
	{
		route: '/blog/peinturemagique',
		titre: 'Cuisine Ludique Enfants Sciez : Éveil & Goût chez Isabelle Cinquin | Isabelle Cinquin',
		canonique: 'https://isabelle-cinquin.fr/blog/peinturemagique',
		description: /^Chez Isabelle Cinquin, assistante maternelle à Sciez, la cuisine est un jeu !/,
	},
	{
		route: '/contact',
		titre: 'Contact | Isabelle Cinquin - Nounou Sciez (74) | Isabelle Cinquin',
		canonique: 'https://isabelle-cinquin.fr/contact',
		description: /^Contactez Isabelle, nounou agréée à Sciez\./,
	},
	{
		route: '/mentions-legales',
		titre: 'Mentions légales | Isabelle Cinquin',
		canonique: null,
		description: /^Mentions légales du site isabelle-cinquin\.fr$/,
	},
]

for (const { route, titre, canonique, description, jsonLd } of SEO) {
	test(`balises SEO de ${route}`, async ({ page }) => {
		await page.goto(route)
		await expect(page).toHaveTitle(titre)
		const lien = page.locator('link[rel="canonical"]')
		if (canonique) await expect(lien).toHaveAttribute('href', canonique)
		else await expect(lien).toHaveCount(0)
		expect(await page.locator('meta[name="description"]').getAttribute('content')).toMatch(description)
		await expect(page.locator('h1')).toHaveCount(1)
		await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
		const types = await page
			.locator('script[type="application/ld+json"]')
			.evaluateAll(s => s.map(e => JSON.parse(e.textContent ?? '{}')['@type']))
		expect(types).toEqual(jsonLd ?? [])
	})
}

test('le guide d’utilisation renvoie vers l’administration sans session', async ({ page }) => {
	await page.goto('/tuto')
	await expect(page).toHaveURL(/\/admin/)
})

for (const route of pages) {
	test(`la page ${route} s'affiche`, async ({ page }) => {
		const erreurs: string[] = []
		page.on('pageerror', e => erreurs.push(e.message))
		page.on('console', m => {
			if (m.type() === 'error' && !/umami|openstreetmap|ERR_FAILED/.test(m.text())) erreurs.push(m.text())
		})
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
	const liens = await page
		.locator('a[href^="/blog/"]')
		.evaluateAll(as => [...new Set(as.map(a => a.getAttribute('href') ?? ''))])
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
