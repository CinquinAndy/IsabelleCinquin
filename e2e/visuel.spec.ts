import { expect, test } from '@playwright/test'
import { masquer, preparerContexte, stabiliser } from './outils/stabiliser'

// Non-régression visuelle au pixel près (maxDiffPixels: 0, voir playwright.config.ts), en bureau et en téléphone,
// sur toutes les pages publiques rendues avec l'instantané du contenu.
// Captures par tranches de 4000 px : au-delà de 8192 px, une capture d'un seul tenant peut recopier le haut de page.
//
// Masques, tous listés ici (le reste de la page est comparé) :
// - canvas : shader WebGL du hero et étincelles du curseur « Compare », rendus différents à chaque image ;
// - iframe de la carte OpenStreetMap (service tiers, coupé pendant les tests).
// La ligne « © année » du pied de page est comparée : l'année vient de l'horloge du navigateur, figée au 02/11/2026.

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

// Deux parcours : « réduit » (prefers-reduced-motion) et « animé » (le visiteur par défaut, animations d'entrée
// jouées jusqu'au bout sous horloge figée). Les captures du second portent le suffixe « -anime ».
const MOUVEMENTS = [
	{ suffixe: '', reducedMotion: 'reduce' as const },
	{ suffixe: '-anime', reducedMotion: 'no-preference' as const },
]

for (const { suffixe, reducedMotion } of MOUVEMENTS) {
	for (const { nom, route, statut } of PAGES) {
		test(`visuel ${nom}${suffixe}`, async ({ page, context }) => {
			await page.emulateMedia({ reducedMotion })
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
			for (let y = 0, n = 1; y < hauteur; y += TRANCHE, n++) {
				await expect(page).toHaveScreenshot(`${nom}${suffixe}-${n}.png`, {
					fullPage: true,
					clip: { x: 0, y, width: largeur, height: Math.min(TRANCHE, hauteur - y) },
				})
			}
		})
	}
}
