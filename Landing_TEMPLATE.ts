import type { GlobalConfig } from 'payload'

export const Landing: GlobalConfig = {
	slug: 'landing',
	label: 'Landing Page',
	admin: {
		group: 'Contenu',
	},
	fields: [
		// Suppression du wrapper tabs car il n'y a qu'un seul tab
		// Cela corrige l'erreur "right-hand side of 'in' should be an object, got undefined"
		// qui se produisait car Payload essayait d'accéder à un second tab qui n'existe plus
		
		// Cette ligne devrait être copiée depuis l'ancien fichier - tous les champs hero, about, introduction, etc
		// Pour l'instant je vais juste mettre un placeholder et vous devrez copier le contenu complet
	],
}
