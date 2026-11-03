import type { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const cache = vi.hoisted(() => ({ revalidatePath: vi.fn(), revalidateTag: vi.fn() }))
vi.mock('next/cache', () => cache)

const { POST } = await import('./route')

const requete = (corps: unknown) =>
	new Request('http://localhost/api/revalidate', {
		method: 'POST',
		body: JSON.stringify(corps),
	}) as unknown as NextRequest

describe('POST /api/revalidate', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		vi.spyOn(console, 'log').mockImplementation(() => {})
		vi.spyOn(console, 'error').mockImplementation(() => {})
		process.env.REVALIDATE_SECRET = 'secret-de-test'
	})

	it('refuse un mauvais secret (401) sans rien invalider', async () => {
		const reponse = await POST(requete({ secret: 'faux', collection: 'posts' }))
		expect(reponse.status).toBe(401)
		expect(cache.revalidatePath).not.toHaveBeenCalled()
		expect(cache.revalidateTag).not.toHaveBeenCalled()
	})

	it('invalide la collection, l’article et tout le site avec le bon secret', async () => {
		const reponse = await POST(requete({ secret: 'secret-de-test', collection: 'posts', slug: 'peinturemagique' }))
		expect(reponse.status).toBe(200)
		expect(cache.revalidateTag).toHaveBeenCalledWith('collection-posts')
		expect(cache.revalidateTag).toHaveBeenCalledWith('collection-posts-peinturemagique')
		expect(cache.revalidatePath).toHaveBeenCalledWith('/', 'layout')
	})

	it('invalide un global', async () => {
		await POST(requete({ secret: 'secret-de-test', global: 'landing' }))
		expect(cache.revalidateTag).toHaveBeenCalledWith('global-landing')
	})

	it('répond 500 sur un corps illisible', async () => {
		const reponse = await POST(
			new Request('http://localhost/api/revalidate', { method: 'POST', body: '{' }) as unknown as NextRequest
		)
		expect(reponse.status).toBe(500)
	})
})
