/**
 * Repérage des envois de robots sur le formulaire de contact.
 *
 * Les robots observés en novembre 2026 remplissent le nom et le message avec une suite de lettres au hasard
 * (« FzEwOOmxoOoDAyMmIDdgBtPG », « oKcQzvnDkccQlIuC »…). Les règles restent prudentes : un vrai visiteur ne
 * doit jamais être écarté. Un envoi écarté reçoit la réponse habituelle de succès, pour que le robot ne
 * cherche pas à contourner le filtre.
 */

/** Nom du champ piège, caché aux visiteurs : seul un robot le remplit. */
export const HONEYPOT_FIELD = 'website'

/**
 * Un « mot » au hasard : au moins 10 lettres sans espace ni ponctuation, avec au moins 3 majuscules
 * après la première lettre. Aucun nom ni message réel n'a cette forme (« McDonald », « DUPONT » ou
 * « Jean-Pierre » ne la remplissent pas).
 */
export function isRandomLetters(value: unknown): boolean {
	if (typeof value !== 'string') return false
	const text = value.trim()
	if (text.length < 10 || !/^[A-Za-z]+$/.test(text)) return false
	if (text === text.toUpperCase()) return false
	const innerCapitals = text.slice(1).replace(/[^A-Z]/g, '').length
	return innerCapitals >= 3
}

/** true si le champ piège est rempli. */
export function isHoneypotFilled(value: unknown): boolean {
	return typeof value === 'string' && value.trim() !== ''
}

/**
 * true si le nom ET le message sont des suites de lettres au hasard (cas de tous les robots observés).
 * Les deux sont exigés : un nom collé comme « MarieDUPONT » ressemble à du hasard, et un vrai visiteur
 * écarté recevrait quand même le message de succès sans que personne ne le voie.
 */
export function looksLikeBotText(fields: { name?: unknown; message?: unknown }): boolean {
	return isRandomLetters(fields.name) && isRandomLetters(fields.message)
}

/** true si le message contient un lien (signalé dans l'objet du mail : c'est le cas des arnaques reçues). */
export function containsLink(value: unknown): boolean {
	return typeof value === 'string' && /(https?:\/\/|www\.)\S+/i.test(value)
}
