import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

/**
 * Fonction utilitaire pour appeler l'API de revalidation
 */
async function triggerRevalidation(params: { collection?: string; slug?: string; global?: string }) {
	const revalidateUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/revalidate`
	const revalidateSecret = process.env.REVALIDATE_SECRET

	if (!revalidateUrl || !revalidateSecret) {
		console.warn('[Revalidate Hook] Missing NEXT_PUBLIC_SERVER_URL or REVALIDATE_SECRET')
		return
	}

	try {
		const response = await fetch(revalidateUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				secret: revalidateSecret,
				...params,
			}),
		})

		if (!response.ok) {
			const error = await response.json()
			console.error('[Revalidate Hook] Failed to revalidate:', error)
			return
		}

		console.log('[Revalidate Hook] Successfully revalidated')
	} catch (error) {
		console.error('[Revalidate Hook] Error calling revalidate API:', error)
	}
}

/**
 * Hook afterChange
 */
export const revalidateAfterChange: CollectionAfterChangeHook = async ({ doc, collection }) => {
	// Déclencher la revalidation en arrière-plan (non-bloquant)
	triggerRevalidation({
		collection: collection.slug,
		slug: doc.slug || undefined,
	}).catch(error => {
		console.error('[Revalidate Hook] Async error:', error)
	})

	return doc
}

/**
 * Hook afterDelete
 */
export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc, collection }) => {
	// Déclencher la revalidation en arrière-plan (non-bloquant)
	triggerRevalidation({
		collection: collection.slug,
		slug: doc.slug || undefined,
	}).catch(error => {
		console.error('[Revalidate Hook] Async error:', error)
	})

	return doc
}

/**
 * Hook afterChange pour les globals
 */
export const revalidateGlobalAfterChange: GlobalAfterChangeHook = async ({ doc, global }) => {
	// Déclencher la revalidation en arrière-plan (non-bloquant)
	triggerRevalidation({
		global: global.slug,
	}).catch(error => {
		console.error('[Revalidate Hook] Async error:', error)
	})

	return doc
}
