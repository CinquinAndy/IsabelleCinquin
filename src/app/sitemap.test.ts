import { beforeEach, describe, expect, it, vi } from 'vitest'

const payload = { findGlobal: vi.fn(), find: vi.fn() }
vi.mock('@payload-config', () => ({ default: {} }))
vi.mock('payload', () => ({ getPayload: vi.fn(async () => payload) }))

const { default: sitemap } = await import('./sitemap')

const BASE = 'https://isabelle-cinquin.fr'

describe('sitemap', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		vi.spyOn(console, 'error').mockImplementation(() => {})
	})

	it('liste les pages publiques puis les articles publiés, avec leurs vraies dates', async () => {
		payload.findGlobal.mockResolvedValue({ updatedAt: '2026-10-01T10:00:00.000Z' })
		payload.find.mockResolvedValue({
			docs: [
				{ slug: 'recent', updatedAt: '2026-10-20T08:00:00.000Z', publishedAt: '2026-10-19T08:00:00.000Z' },
				{ slug: 'ancien', updatedAt: null, publishedAt: '2023-12-20T15:00:00.000Z' },
			],
		})

		const entrees = await sitemap()

		expect(entrees.map(e => e.url)).toEqual([
			BASE,
			`${BASE}/blog`,
			`${BASE}/contact`,
			`${BASE}/mentions-legales`,
			`${BASE}/blog/recent`,
			`${BASE}/blog/ancien`,
		])
		expect(entrees[0].lastModified).toEqual(new Date('2026-10-01T10:00:00.000Z'))
		// Le blog prend la date de son article le plus récent
		expect(entrees[1].lastModified).toEqual(new Date('2026-10-20T08:00:00.000Z'))
		expect(entrees[2].lastModified).toBeUndefined()
		expect(entrees[5].lastModified).toEqual(new Date('2023-12-20T15:00:00.000Z'))
		expect(entrees.some(e => e.url.includes('/admin'))).toBe(false)

		expect(payload.find).toHaveBeenCalledWith(
			expect.objectContaining({ collection: 'posts', where: { status: { equals: 'published' } } })
		)
	})

	it('garde les pages statiques si Payload ne répond pas', async () => {
		payload.findGlobal.mockRejectedValue(new Error('base indisponible'))
		payload.find.mockRejectedValue(new Error('base indisponible'))

		const entrees = await sitemap()

		expect(entrees.map(e => e.url)).toEqual([BASE, `${BASE}/blog`, `${BASE}/contact`, `${BASE}/mentions-legales`])
	})
})
