import { describe, expect, it } from 'vitest'
import { cn, formatMediaUrl } from './utils'

describe('cn', () => {
	it('fusionne les classes et laisse gagner la dernière classe Tailwind en conflit', () => {
		expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
		expect(cn('text-sm', false && 'hidden', undefined, ['font-bold'])).toBe('text-sm font-bold')
	})
})

describe('formatMediaUrl', () => {
	it('rend relative une adresse de média locale (localhost ou 127.0.0.1, port compris)', () => {
		expect(formatMediaUrl('http://localhost:3000/api/media/file/panda.png')).toBe('/api/media/file/panda.png')
		expect(formatMediaUrl('https://127.0.0.1/api/media/file/a.jpg')).toBe('/api/media/file/a.jpg')
	})

	it('laisse intactes les adresses du site en production', () => {
		const url = 'https://isabelle-cinquin.fr/api/media/file/peinture%20magique.webp'
		expect(formatMediaUrl(url)).toBe(url)
	})

	it('renvoie null sans adresse', () => {
		expect(formatMediaUrl(null)).toBeNull()
		expect(formatMediaUrl(undefined)).toBeNull()
		expect(formatMediaUrl('')).toBeNull()
	})
})
