import { readFileSync } from 'node:fs'
import path from 'node:path'
import type { BrowserContext, Page } from '@playwright/test'

// Moment figé pour toutes les pages : Date, minuteries, requestAnimationFrame et performance suivent l'horloge de
// Playwright, qui n'avance que sur demande.
export const HEURE_FIXE = new Date('2026-11-02T12:00:00+01:00').getTime()

// Services tiers : statistiques et carte OpenStreetMap. Rien ne sort vers l'extérieur pendant les tests.
const TIERS = /(^|\.)(umami\.wadefade\.fr|openstreetmap\.org|googletagmanager\.com|google-analytics\.com)$/i

// Photos Unsplash du haut de /blog, écrites en dur dans le code : l'optimiseur d'images de Next les télécharge chez
// Unsplash à chaque build, et le CDN d'Unsplash ne renvoie pas toujours les mêmes octets (écart vu en CI le 03/11).
// Le navigateur reçoit donc une copie figée : la version optimisée servie par la production le 03/11/2026 (640 px, WebP).
const UNSPLASH = /^https:\/\/images\.unsplash\.com\/(photo-[\w-]+)\?/
const DOSSIER_TIERS = path.join(import.meta.dirname, '..', 'instantane', 'tiers')

function photoUnsplashFigee(adresse: URL) {
	if (adresse.pathname !== '/_next/image') return null
	const nom = UNSPLASH.exec(adresse.searchParams.get('url') ?? '')?.[1]
	return nom ? readFileSync(path.join(DOSSIER_TIERS, `${nom}.webp`)) : null
}

// Math.random rejoué à l'identique (particules, positions aléatoires).
function graine() {
	let a = 0x2f6e2b1
	Math.random = () => {
		a = (a + 0x6d2b79f5) | 0
		let t = Math.imul(a ^ (a >>> 15), 1 | a)
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296
	}
}

/**
 * Coupe les services tiers et rejoue Math.random. Avec `horloge` (captures, animations pilotées), le temps est
 * figé : il n'avance plus que par page.clock. Sans horloge, les minuteries tournent normalement (notifications).
 */
export async function preparerContexte(contexte: BrowserContext, { horloge = true } = {}) {
	await contexte.route('**/*', route => {
		const adresse = new URL(route.request().url())
		const photo = photoUnsplashFigee(adresse)
		if (photo) return route.fulfill({ body: photo, contentType: 'image/webp' })
		return TIERS.test(adresse.hostname) ? route.abort() : route.continue()
	})
	await contexte.addInitScript(graine)
	if (!horloge) return
	await contexte.clock.install({ time: HEURE_FIXE })
	await contexte.clock.pauseAt(HEURE_FIXE + 1000)
}

const pause = (ms: number) => new Promise(r => setTimeout(r, ms))

async function repos(page: Page) {
	await page.waitForLoadState('networkidle', { timeout: 45_000 }).catch(() => {})
	await page.evaluate(() => document.fonts.ready.then(() => document.fonts.status))
}

/**
 * Amène la page dans un état final reproductible : chaque section est passée dans la fenêtre (animations d'entrée
 * jouées jusqu'au bout), images chargées et décodées, boucles infinies gelées à leur position de repos.
 * Repris de l'outil de capture qui a servi aux références de production (même déroulé, mêmes durées).
 */
export async function stabiliser(page: Page) {
	const avancer = async (fois: number, ms = 250) => {
		for (let i = 0; i < fois; i++) await page.clock.fastForward(ms)
	}
	await repos(page)
	await avancer(12)

	// Défilement par paliers : sections animées et images paresseuses passent dans la fenêtre.
	for (let y = 0; ; y += 400) {
		const hauteur = await page.evaluate(v => {
			window.scrollTo({ top: v, behavior: 'instant' })
			return document.documentElement.scrollHeight
		}, y)
		await pause(150)
		await avancer(1)
		if (y >= hauteur) break
	}
	await repos(page)
	await page.evaluate(async () => {
		await Promise.all(
			[...document.images].map(i => {
				i.loading = 'eager'
				const charge = i.complete
					? Promise.resolve()
					: new Promise(r => {
							i.onload = r
							i.onerror = r
						})
				return charge.then(() => i.decode().catch(() => {}))
			})
		)
	})
	// Rattrapage : une section restée à opacité 0 a raté son passage dans la fenêtre.
	for (let passe = 0; passe < 3; passe++) {
		const restants = await page.evaluate(() => {
			const liste = [...document.querySelectorAll<HTMLElement>('main [style*="opacity"]')].filter(
				e => getComputedStyle(e).opacity === '0'
			)
			liste.forEach((e, i) => {
				e.setAttribute('data-e2e-rattrapage', String(i))
			})
			return liste.length
		})
		if (!restants) break
		for (let i = 0; i < restants; i++) {
			await page.evaluate(
				n => document.querySelector(`[data-e2e-rattrapage="${n}"]`)?.scrollIntoView({ block: 'center' }),
				i
			)
			await pause(150)
			await avancer(2)
		}
	}
	await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
	await pause(100)
	await avancer(12)
	await repos(page)
	await avancer(4)
	await pause(1200) // transitions CSS : elles suivent le temps réel, pas l'horloge simulée

	// Boucles sans fin (framer-motion, WAAPI) : on repère ce qui bouge encore et on le gèle à sa position de repos.
	const tour = () =>
		page.evaluate(() => {
			const w = window as unknown as {
				__vus?: Map<Element, string>
				__compte?: Map<Element, number>
				__tours?: number
				__bouge?: Set<Element>
			}
			w.__vus ??= new Map()
			w.__compte ??= new Map()
			const vus = w.__vus
			const compte = w.__compte
			w.__tours = (w.__tours ?? 0) + 1
			const changes: Element[] = []
			for (const e of document.querySelectorAll<HTMLElement>('[style]')) {
				if (vus.has(e) && vus.get(e) !== e.style.cssText) {
					compte.set(e, (compte.get(e) ?? 0) + 1)
					changes.push(e)
				}
				vus.set(e, e.style.cssText)
			}
			const seuil = w.__tours * 0.6
			w.__bouge = new Set([...compte].filter(([, n]) => n >= seuil).map(([e]) => e))
			for (const a of document.getAnimations()) {
				const effet = a.effect as KeyframeEffect | null
				if (effet?.getTiming().iterations === Number.POSITIVE_INFINITY && effet.target) w.__bouge.add(effet.target)
			}
			return changes.filter(e => !w.__bouge?.has(e)).length
		})
	for (let i = 0, calmes = 0; i < 40; i++) {
		const autres = await tour()
		calmes = autres === 0 ? calmes + 1 : 0
		if (i >= 10 && calmes >= 3) break
		await page.clock.fastForward(370)
		await pause(120)
	}
	await page.evaluate(() => {
		const bouge = (window as unknown as { __bouge?: Set<HTMLElement> }).__bouge ?? new Set()
		for (const e of bouge) {
			e.style.setProperty('transform', 'none', 'important')
			e.style.setProperty('opacity', '1', 'important')
			if (e.style.boxShadow) e.style.setProperty('box-shadow', 'none', 'important')
			if (e.style.filter) e.style.setProperty('filter', 'none', 'important')
		}
	})
	// Un calque composé garde l'arrondi de pixel de son animation : on le fait recomposer depuis l'état final.
	await page.evaluate(() => {
		document.body.style.display = 'none'
		void document.body.offsetHeight
		document.body.style.display = ''
	})
	await pause(300)
	// Le défilement programmé déplace aussi les conteneurs en overflow (carrousels) : tout revient à l'origine.
	await page.evaluate(() => {
		for (const e of document.querySelectorAll<HTMLElement>('body, body *')) {
			if (e.scrollLeft || e.scrollTop) {
				e.style.scrollBehavior = 'auto'
				e.scrollLeft = 0
				e.scrollTop = 0
			}
		}
		for (const a of document.getAnimations()) {
			const effet = a.effect as KeyframeEffect | null
			if (effet?.getTiming().iterations === Number.POSITIVE_INFINITY) a.cancel()
			else a.finish()
		}
	})
	await pause(1200)
}

/** Masques : éléments rendus non déterministes, cachés (visibility: hidden) ; le reste du cadre reste comparé. */
export async function masquer(page: Page, selecteurs: string[]) {
	await page.addStyleTag({
		content: `*{caret-color:transparent!important}${selecteurs.length ? `${selecteurs.join(',')}{visibility:hidden!important}` : ''}`,
	})
	await pause(200)
}
