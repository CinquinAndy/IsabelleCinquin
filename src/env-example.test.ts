import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

// Le dépôt est public : .env.example ne doit contenir que des valeurs d'exemple.
// Les vraies valeurs vivent dans Coolify.
const fichier = readFileSync(path.resolve(import.meta.dirname, '../.env.example'), 'utf8')

const variables = fichier
	.split('\n')
	.filter(ligne => /^[A-Z0-9_]+=/.test(ligne))
	.map(ligne => {
		const i = ligne.indexOf('=')
		return { cle: ligne.slice(0, i), valeur: ligne.slice(i + 1) }
	})

// Clés sensibles : seule la valeur d'exemple « a-remplir » est admise.
const SENSIBLES = [
	'PAYLOAD_SECRET',
	'S3_ACCESS_KEY_ID',
	'S3_SECRET_ACCESS_KEY',
	'RESEND_API_KEY',
	'FORVOYEZ_TOKEN',
	'GEMINI_API_KEY',
	'REVALIDATE_SECRET',
]

describe('.env.example', () => {
	it('déclare toutes les clés sensibles', () => {
		const cles = variables.map(v => v.cle)
		for (const cle of SENSIBLES) expect(cles).toContain(cle)
	})

	it.each(SENSIBLES)('%s porte une valeur d’exemple', cle => {
		const variable = variables.find(v => v.cle === cle)
		// Comparaison booléenne : en cas d'échec, la valeur n'apparaît pas dans les logs de CI.
		expect(variable?.valeur === 'a-remplir', `${cle} doit valoir « a-remplir »`).toBe(true)
	})

	it('ne contient aucune chaîne hexadécimale longue (clé R2/S3, identifiant de compte)', () => {
		// Message volontairement sans la valeur trouvée, pour ne pas la recopier dans les logs de CI.
		const fautives = variables.filter(v => /[0-9a-f]{24,}/i.test(v.valeur)).map(v => v.cle)
		expect(fautives).toEqual([])
	})

	it('pointe la base vers un hôte local', () => {
		const base = variables.find(v => v.cle === 'DATABASE_URI')?.valeur ?? ''
		expect(new URL(base).hostname).toBe('localhost')
	})
})
