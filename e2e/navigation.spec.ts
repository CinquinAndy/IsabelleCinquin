import { expect, test } from '@playwright/test'
import { preparerContexte } from './outils/stabiliser'

const LIENS = [
	{ texte: 'Accueil', chemin: '/' },
	{ texte: 'Activités', chemin: '/blog' },
	{ texte: 'Contact', chemin: '/contact' },
]

test.beforeEach(async ({ context }) => {
	await preparerContexte(context)
})

test('le menu principal mène à chaque page', async ({ page, isMobile }) => {
	for (const { texte, chemin } of LIENS) {
		await page.goto('/mentions-legales')
		const entete = page.locator('header')
		if (isMobile) {
			await entete.getByRole('button', { name: 'Ouvrir le menu' }).click()
			await page.clock.fastForward(1000)
		}
		await entete.getByRole('link', { name: texte, exact: true }).filter({ visible: true }).first().click()
		await expect(page).toHaveURL(chemin)
	}
})

test('le menu mobile s’ouvre et se ferme', async ({ page, isMobile }) => {
	test.skip(!isMobile, 'menu propre au téléphone')
	await page.goto('/')
	const bouton = page.locator('header').getByRole('button', { name: 'Ouvrir le menu' })
	await bouton.click()
	await page.clock.fastForward(1000)
	const fermer = page.locator('header').getByRole('button', { name: 'Fermer le menu' })
	await expect(fermer).toBeVisible()
	await fermer.click()
	await page.clock.fastForward(1000)
	await expect(bouton).toBeVisible()
})

test('l’article mis en avant sur l’accueil s’ouvre', async ({ page }) => {
	await page.goto('/blog')
	const lien = page.locator('a[href="/blog/peinturemagique"]').first()
	await lien.scrollIntoViewIfNeeded()
	await lien.click()
	await expect(page).toHaveURL('/blog/peinturemagique')
	await expect(page.locator('h1')).toBeVisible()
})
