import { describe, expect, test } from 'vitest'
import { containsLink, isHoneypotFilled, isRandomLetters, looksLikeBotText } from '@/lib/security/spam'

// Noms et messages reçus de robots en novembre 2026 (journaux Resend de cinquin-maeva.com, même formulaire).
const ROBOTS = [
	'FzEwOOmxoOoDAyMmIDdgBtPG',
	'DIIcuBUdTijuxupeyQZCu',
	'YTjgOendxRAwpRhFc',
	'lMNsKJWhgXBFKlpsReGMt',
	'kjkfFwDhDSTcWwksdcUkVWez',
	'jNWVzGoATRHXpeHWgDyL',
	'dOiMSpVTgnwqDehjNnDa',
	'oKcQzvnDkccQlIuC',
	'saDTzfCOvlrQLcyqpsF',
	'KNsdbXkdzJFzisWQ',
]

// Ce que de vrais visiteurs peuvent écrire : jamais écarté.
const VISITEURS = [
	'laura pillet',
	'Jean-Pierre Dupont',
	'McDonald',
	'DUPONTMARTIN',
	'Anne-SophieMcKenzie',
	'Bonjour',
	'Madame, Bonjour, je prends contact avec vous pour un mariage le 27 février 2027.',
	'Mariage',
	'MarieClaire',
]

describe('isRandomLetters', () => {
	test.each(ROBOTS)('repère le texte de robot %s', texte => {
		expect(isRandomLetters(texte)).toBe(true)
	})

	test.each(VISITEURS)('laisse passer %s', texte => {
		expect(isRandomLetters(texte)).toBe(false)
	})

	test('ignore ce qui n’est pas du texte', () => {
		expect(isRandomLetters(undefined)).toBe(false)
		expect(isRandomLetters({ toString: () => 'FzEwOOmxoOoDAyMmIDdgBtPG' })).toBe(false)
	})
})

describe('looksLikeBotText', () => {
	test('nom et message au hasard : robot', () => {
		expect(looksLikeBotText({ name: 'FzEwOOmxoOoDAyMmIDdgBtPG', message: 'oKcQzvnDkccQlIuC' })).toBe(true)
	})

	test('un seul des deux au hasard (nom collé, message réel) : pas un robot', () => {
		expect(looksLikeBotText({ name: 'MarieDUPONT', message: 'Bonjour, je me marie en juin.' })).toBe(false)
		expect(looksLikeBotText({ name: 'JeanPierreDUPONT', message: 'Un devis svp' })).toBe(false)
		expect(looksLikeBotText({ name: 'Laura', message: 'oKcQzvnDkccQlIuC' })).toBe(false)
	})

	test('vrai message : pas un robot', () => {
		expect(looksLikeBotText({ name: 'laura pillet', message: 'Bonjour, un essai est-il possible ?' })).toBe(false)
	})
})

describe('isHoneypotFilled', () => {
	test('vide ou absent : visiteur', () => {
		expect(isHoneypotFilled(undefined)).toBe(false)
		expect(isHoneypotFilled('')).toBe(false)
		expect(isHoneypotFilled('   ')).toBe(false)
	})
	test('rempli : robot', () => {
		expect(isHoneypotFilled('https://spam.example')).toBe(true)
	})
})

describe('containsLink', () => {
	test.each(['Voir : https://unpartage.online/fr/spo/cinquin-maeva', 'mon site www.exemple.fr'])('repère %s', texte => {
		expect(containsLink(texte)).toBe(true)
	})
	test('message sans lien', () => {
		expect(containsLink('Bonjour, je me marie le 27 février.')).toBe(false)
	})
})
