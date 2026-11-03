#!/usr/bin/env node
// Refait l'instantané du contenu (e2e/instantane/contenu.json et medias/) à partir du site PUBLIC de production.
//
//   node e2e/instantane/rafraichir.mjs [https://isabelle-cinquin.fr]
//
// Lecture seule, sans identifiant : uniquement ce que n'importe quel visiteur peut lire.
// - Le global « landing » n'est pas lisible par l'API publique : il est relu dans le flux RSC de la page /blog,
//   qui le transmet en entier (profondeur 2) au composant client de la page.
// - Articles, catégories et fichiers des médias viennent de l'API REST publique de Payload.
// - Les médias de plus de 600 Ko sont réencodés en WebP qualité 90 (mêmes dimensions) pour garder le dépôt léger :
//   next/image les réencode de toute façon à l'affichage.
//
// Après un rafraîchissement, les captures de référence changent : les régénérer (bun run test:e2e:maj-captures)
// et relire les écarts avant de les committer.
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, parse } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const BASE = (process.argv[2] || 'https://isabelle-cinquin.fr').replace(/\/$/, '')
const ICI = dirname(fileURLToPath(import.meta.url))
const DOSSIER_MEDIAS = join(ICI, 'medias')
const SEUIL_WEBP = 600 * 1024

async function lire(url, type = 'json') {
	const reponse = await fetch(url)
	if (!reponse.ok) throw new Error(`${url} : HTTP ${reponse.status}`)
	return type === 'json' ? reponse.json() : type === 'texte' ? reponse.text() : Buffer.from(await reponse.arrayBuffer())
}

// Flux RSC d'une page HTML : concaténation des self.__next_f.push([1, "..."]), puis une ligne par élément "id:json".
function fluxRsc(html) {
	const morceaux = []
	const self = { __next_f: { push: a => a[0] === 1 && morceaux.push(a[1]) } }
	for (const m of html.matchAll(/<script>(self\.__next_f\.push\([\s\S]*?\))<\/script>/g))
		new Function('self', m[1])(self)
	const lignes = new Map()
	for (const ligne of morceaux.join('').split('\n')) {
		const m = /^([0-9a-f]+):([[{"].*)$/.exec(ligne)
		if (!m) continue
		try {
			lignes.set(m[1], JSON.parse(m[2]))
		} catch {
			// ligne de texte (T...), d'import (I...) ou d'indice : sans intérêt ici
		}
	}
	return lignes
}

function resoudre(lignes, valeur, profondeur = 0) {
	if (profondeur > 64) throw new Error('flux RSC trop profond')
	if (typeof valeur === 'string' && valeur.startsWith('$')) {
		if (valeur.startsWith('$$')) return valeur.slice(1)
		if (valeur === '$undefined') return undefined
		if (valeur.startsWith('$D')) return valeur.slice(2)
		const m = /^\$([0-9a-f]+)((?::[^:]+)*)$/.exec(valeur)
		if (!m) return valeur
		let cible = lignes.get(m[1])
		for (const cle of m[2].split(':').filter(Boolean)) cible = cible?.[cle]
		if (cible === undefined) throw new Error(`référence RSC introuvable : ${valeur}`)
		return resoudre(lignes, cible, profondeur + 1)
	}
	if (Array.isArray(valeur)) return valeur.map(v => resoudre(lignes, v, profondeur + 1))
	if (valeur && typeof valeur === 'object') {
		return Object.fromEntries(Object.entries(valeur).map(([k, v]) => [k, resoudre(lignes, v, profondeur + 1)]))
	}
	return valeur
}

function chercherProp(valeur, cle) {
	if (Array.isArray(valeur)) {
		for (const v of valeur) {
			const r = chercherProp(v, cle)
			if (r) return r
		}
	} else if (valeur && typeof valeur === 'object') {
		if (cle in valeur && valeur[cle] && typeof valeur[cle] === 'object') return valeur[cle]
		for (const v of Object.values(valeur)) {
			const r = chercherProp(v, cle)
			if (r) return r
		}
	}
	return undefined
}

const estMedia = v => v && typeof v === 'object' && typeof v.filename === 'string' && typeof v.mimeType === 'string'

// Remplace chaque média peuplé par "media:<id>" et chaque catégorie peuplée par "categorie:<id>".
function references(valeur, medias) {
	if (Array.isArray(valeur)) return valeur.map(v => references(v, medias))
	if (estMedia(valeur)) {
		medias.set(valeur.id, valeur)
		return `media:${valeur.id}`
	}
	if (valeur && typeof valeur === 'object') {
		return Object.fromEntries(Object.entries(valeur).map(([k, v]) => [k, references(v, medias)]))
	}
	return valeur
}

const sansMeta = ({ id, createdAt, updatedAt, globalType, ...reste }) => reste

const html = await lire(`${BASE}/blog`, 'texte')
const lignes = fluxRsc(html)
let landing
for (const valeur of lignes.values()) {
	landing = chercherProp(valeur, 'landing')
	if (landing) break
}
if (!landing) throw new Error('global « landing » introuvable dans le flux RSC de /blog')
landing = resoudre(lignes, landing)

const posts = (await lire(`${BASE}/api/posts?limit=1000&depth=1&sort=id`)).docs
const categories = (await lire(`${BASE}/api/categories?limit=1000&depth=0&sort=id`)).docs

const medias = new Map()
const landingRef = references(sansMeta(landing), medias)
const postsRef = posts.map(p => ({
	...references(sansMeta(p), medias),
	categories: (p.categories ?? []).map(c => `categorie:${typeof c === 'object' ? c.id : c}`),
}))

rmSync(DOSSIER_MEDIAS, { recursive: true, force: true })
mkdirSync(DOSSIER_MEDIAS, { recursive: true })
const listeMedias = []
for (const media of [...medias.values()].sort((a, b) => a.id - b.id)) {
	const octets = await lire(`${BASE}/api/media/file/${encodeURIComponent(media.filename)}`, 'octets')
	let fichier = media.filename
	if (octets.length > SEUIL_WEBP && media.mimeType !== 'image/svg+xml') {
		fichier = `${parse(media.filename).name}.webp`
		await sharp(octets).rotate().webp({ quality: 90 }).toFile(join(DOSSIER_MEDIAS, fichier))
	} else {
		writeFileSync(join(DOSSIER_MEDIAS, fichier), octets)
	}
	listeMedias.push({ id: media.id, fichier, alt: media.alt ?? null, original: media.filename })
}

const contenu = {
	source: `${BASE} (pages et API publiques)`,
	date: new Date().toISOString().slice(0, 10),
	medias: listeMedias,
	categories: categories.map(c => ({ id: c.id, ...sansMeta(c) })),
	posts: postsRef.map((p, i) => ({ id: posts[i].id, ...p })),
	landing: landingRef,
}
writeFileSync(join(ICI, 'contenu.json'), `${JSON.stringify(contenu, null, '\t')}\n`)
console.log(
	`Instantané écrit : ${listeMedias.length} médias, ${categories.length} catégories, ${posts.length} article(s), global landing.`
)
