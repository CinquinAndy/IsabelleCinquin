import { expect, test } from '@playwright/test'
import { masquer, preparerContexte, stabiliser } from './outils/stabiliser'

// Non-régression visuelle au pixel près (maxDiffPixels: 0, voir playwright.config.ts), en bureau et en téléphone,
// sur toutes les pages publiques rendues avec l'instantané du contenu.
// Captures par tranches de 4000 px : au-delà de 8192 px, une capture d'un seul tenant peut recopier le haut de page.
//
// Masques, tous listés ici (le reste de la page est comparé) :
// - canvas : shader WebGL du hero et étincelles du curseur « Compare », rendus différents à chaque image ;
// - iframe de la carte OpenStreetMap (service tiers, coupé pendant les tests) ;
// - ligne « © année » du pied de page : l'année est figée au build, elle changerait au 1er janvier.

const PAGES = [
	{ nom: 'accueil', route: '/', statut: 200 },
	{ nom: 'blog', route: '/blog', statut: 200 },
	{ nom: 'article', route: '/blog/peinturemagique', statut: 200 },
	{ nom: 'contact', route: '/contact', statut: 200 },
	{ nom: 'mentions-legales', route: '/mentions-legales', statut: 200 },
	{ nom: '404', route: '/page-inexistante', statut: 404 },
]
const CACHER = ['canvas', 'iframe[title="Localisation Nounou Sciez"]']
const TRANCHE = 4000

test.use({ reducedMotion: 'reduce' })

for (const { nom, route, statut } of PAGES) {
	test(`visuel ${nom}`, async ({ page, context }) => {
		await preparerContexte(context)
		const reponse = await page.goto(route, { waitUntil: 'load' })
		expect(reponse?.status()).toBe(statut)
		await stabiliser(page)
		await masquer(page, CACHER)

		const imagesCassees = await page.evaluate(() =>
			[...document.images].filter(i => i.complete && !i.naturalWidth).map(i => i.src)
		)
		expect(imagesCassees).toEqual([])

		const { largeur, hauteur } = await page.evaluate(() => ({
			largeur: document.documentElement.scrollWidth,
			hauteur: document.documentElement.scrollHeight,
		}))
		const masques = [page.locator('footer p', { hasText: '©' })]
		for (let y = 0, n = 1; y < hauteur; y += TRANCHE, n++) {
			await expect(page).toHaveScreenshot(`${nom}-${n}.png`, {
				fullPage: true,
				clip: { x: 0, y, width: largeur, height: Math.min(TRANCHE, hauteur - y) },
				mask: masques,
				maskColor: '#ff00ff',
			})
		}
	})
}
