import config from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

/**
 * Réservé aux personnes connectées à l'admin Payload (cookie de session envoyé par l'admin, même origine).
 * Renvoie une réponse 401 à retourner telle quelle, ou null si l'appel est autorisé.
 * Sans ce contrôle, n'importe quel robot pouvait lancer les générations ForVoyez et Gemini (crédits payants)
 * et réécrire les textes alternatifs des médias.
 */
export async function requireAdmin(headers: Headers): Promise<NextResponse | null> {
	const payload = await getPayload({ config })
	const { user } = await payload.auth({ headers })
	if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	return null
}
