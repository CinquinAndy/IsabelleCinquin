'use client'

import { useSyncExternalStore } from 'react'

// L'année du « © » du pied de page. Les pages sont prérendues : calculée côté serveur, elle resterait figée à
// l'année du build. Le HTML garde l'année du rendu serveur, puis le navigateur affiche l'année en cours juste après
// l'hydratation. useSyncExternalStore fait passer React de l'une à l'autre sans erreur d'hydratation.

const sAbonner = () => () => {}

export function anneeCourante(maintenant: Date = new Date()): number {
	return maintenant.getFullYear()
}

export function AnneeCourante({ anneeServeur }: { anneeServeur: number }) {
	const annee = useSyncExternalStore(sAbonner, anneeCourante, () => anneeServeur)
	return <>{annee}</>
}
