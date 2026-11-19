/**
 * Vérification côté serveur d'un jeton Cloudflare Turnstile (widget « isabelle-cinquin.fr contact »).
 * Doc : https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export interface TurnstileResult {
	success: boolean
	/** Codes d'erreur de Cloudflare (journalisés, jamais montrés au visiteur). */
	errorCodes?: string[]
}

/**
 * Valide un jeton Turnstile.
 * Sans `TURNSTILE_SECRET_KEY` : refus en production (une variable oubliée ne doit pas couper la protection
 * en silence), vérification ignorée en développement.
 */
export async function verifyTurnstile(token: unknown): Promise<TurnstileResult> {
	const secret = process.env.TURNSTILE_SECRET_KEY

	if (!secret) {
		if (process.env.NODE_ENV === 'production') {
			console.error('[Turnstile] TURNSTILE_SECRET_KEY absent en production : envoi refusé.')
			return { success: false, errorCodes: ['missing-secret'] }
		}
		return { success: true }
	}

	if (typeof token !== 'string' || !token || token.length > 2048) {
		return { success: false, errorCodes: ['missing-input-response'] }
	}

	try {
		const res = await fetch(VERIFY_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({ secret, response: token }),
			signal: AbortSignal.timeout(10_000),
		})
		const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] }
		return { success: data.success === true, errorCodes: data['error-codes'] }
	} catch (error) {
		console.error('[Turnstile] Vérification impossible :', error instanceof Error ? error.message : error)
		return { success: false, errorCodes: ['internal-error'] }
	}
}
