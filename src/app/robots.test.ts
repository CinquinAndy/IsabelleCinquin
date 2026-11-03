import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

// public/robots.txt est servi tel quel : un seul groupe pour tous les robots.
const robots = readFileSync(path.resolve(import.meta.dirname, '../../public/robots.txt'), 'utf8')
const directives = robots
	.split('\n')
	.map(l => l.trim())
	.filter(l => l && !l.startsWith('#'))

describe('robots.txt', () => {
	it('a un seul groupe, pour tous les robots', () => {
		expect(directives.filter(d => d.startsWith('User-agent:'))).toEqual(['User-agent: *'])
	})

	it('laisse lire les images et ferme l’administration et l’API', () => {
		expect(directives).toEqual(
			expect.arrayContaining(['Allow: /api/media/file/', 'Disallow: /admin/', 'Disallow: /api/'])
		)
		expect(directives.indexOf('Allow: /api/media/file/')).toBeLessThan(directives.indexOf('Disallow: /api/'))
	})

	it('donne l’adresse du sitemap', () => {
		expect(directives).toContain('Sitemap: https://isabelle-cinquin.fr/sitemap.xml')
	})
})
