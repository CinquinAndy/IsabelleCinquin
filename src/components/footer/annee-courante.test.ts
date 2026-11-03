import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { AnneeCourante, anneeCourante } from './annee-courante'

describe('année du pied de page', () => {
	afterEach(() => {
		vi.useRealTimers()
	})

	it("le rendu serveur (HTML prérendu) garde l'année du build", () => {
		vi.useFakeTimers({ now: new Date('2031-06-01T12:00:00Z') })
		expect(renderToString(createElement(AnneeCourante, { anneeServeur: 2026 }))).toBe('2026')
	})

	it("le navigateur affiche l'année en cours, y compris le 1er janvier", () => {
		vi.useFakeTimers({ now: new Date(2027, 0, 1, 0, 0, 1) })
		expect(anneeCourante()).toBe(2027)
		vi.setSystemTime(new Date(2026, 11, 31, 23, 59, 59))
		expect(anneeCourante()).toBe(2026)
	})
})
