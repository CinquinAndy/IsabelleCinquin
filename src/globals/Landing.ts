import type { GlobalConfig } from 'payload'

export const Landing: GlobalConfig = {
	slug: 'landing',
	label: 'Landing Page',
	admin: {
		group: 'Contenu',
	},
	fields: [
		// ==================== SECTION INTRODUCTION ====================
		{
			name: 'introduction',
			type: 'group',
			label: 'Introduction',
			fields: [
				{
					name: 'title',
					type: 'text',
					label: 'Titre',
					defaultValue: "Livret d'Accueil de Nounou",
				},
				{
					name: 'content',
					type: 'richText',
					label: 'Contenu',
				},
				{
					name: 'image',
					type: 'upload',
					relationTo: 'media',
					label: 'Photo',
				},
			],
		},

		// ==================== SECTION PRESENTATION ====================
		{
			name: 'presentation',
			type: 'group',
			label: 'Présentation',
			fields: [
				{
					name: 'content',
					type: 'richText',
					label: 'Contenu',
				},
				{
					name: 'agreementInfo',
					type: 'textarea',
					label: "Informations d'agrément",
				},
			],
		},

		// ==================== SECTION FAMILLE ====================
		{
			name: 'familyMembers',
			type: 'array',
			label: 'Membres de la famille',
			labels: {
				singular: 'Membre',
				plural: 'Membres',
			},
			fields: [
				{
					name: 'image',
					type: 'upload',
					relationTo: 'media',
					label: 'Photo',
					required: true,
				},
				{
					name: 'firstName',
					type: 'text',
					label: 'Prénom',
					required: true,
				},
				{
					name: 'lastName',
					type: 'text',
					label: 'Nom',
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'Description',
					required: true,
				},
				{
					name: 'link',
					type: 'text',
					label: 'Lien (optionnel)',
					admin: {
						description: 'Lien vers un site ou réseau social',
					},
				},
			],
		},

		// ==================== SECTION FORMATIONS ====================
		{
			name: 'trainings',
			type: 'array',
			label: 'Formations',
			labels: {
				singular: 'Formation',
				plural: 'Formations',
			},
			fields: [
				{
					name: 'title',
					type: 'text',
					label: 'Titre',
					required: true,
				},
				{
					name: 'period',
					type: 'text',
					label: 'Période',
					admin: {
						description: 'Ex: 2018 - 2020',
					},
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'Description',
				},
			],
		},

		// ==================== SECTION SOMMEIL ====================
		{
			name: 'sleep',
			type: 'group',
			label: 'Sommeil',
			fields: [
				{
					name: 'content',
					type: 'richText',
					label: 'Contenu',
				},
			],
		},

		// ==================== SECTION LIEU DE VIE ====================
		{
			name: 'livingPlace',
			type: 'group',
			label: 'Lieu de vie',
			fields: [
				{
					name: 'content',
					type: 'richText',
					label: 'Contenu',
				},
				{
					name: 'images',
					type: 'array',
					label: 'Images',
					fields: [
						{
							name: 'image',
							type: 'upload',
							relationTo: 'media',
							required: true,
						},
					],
				},
			],
		},

		// ==================== SECTION EQUIPEMENTS ====================
		{
			name: 'equipment',
			type: 'array',
			label: 'Équipements',
			labels: {
				singular: 'Équipement',
				plural: 'Équipements',
			},
			fields: [
				{
					name: 'name',
					type: 'text',
					label: 'Nom',
					required: true,
				},
				{
					name: 'quantity',
					type: 'number',
					label: 'Quantité',
					admin: {
						description: 'Optionnel',
					},
				},
			],
		},

		// ==================== SECTION OBJECTIFS ====================
		{
			name: 'objectives',
			type: 'array',
			label: 'Objectifs',
			labels: {
				singular: 'Objectif',
				plural: 'Objectifs',
			},
			fields: [
				{
					name: 'title',
					type: 'text',
					label: 'Titre',
					required: true,
				},
				{
					name: 'icon',
					type: 'select',
					label: 'Icône',
					options: [
						{ label: 'Bébé', value: 'baby' },
						{ label: 'Mains qui aident', value: 'hand-helping' },
						{ label: 'Ustensiles', value: 'utensils' },
						{ label: 'Cœur', value: 'heart-pulse' },
						{ label: 'Bouclier', value: 'shield-check' },
						{ label: 'Étoile', value: 'star' },
						{ label: 'Soleil', value: 'sun' },
						{ label: 'Maison', value: 'home' },
						{ label: 'Livre', value: 'book-open' },
						{ label: 'Palette', value: 'palette' },
					],
					defaultValue: 'star',
				},
				{
					name: 'content',
					type: 'richText',
					label: 'Contenu',
				},
			],
		},

		// ==================== SECTION ADAPTATION ====================
		{
			name: 'adaptation',
			type: 'group',
			label: "Période d'adaptation",
			fields: [
				{
					name: 'content',
					type: 'richText',
					label: 'Contenu',
				},
			],
		},

		// ==================== SECTION ORGANISATION ====================
		{
			name: 'organization',
			type: 'group',
			label: 'Organisation des affaires',
			fields: [
				{
					name: 'bagItems',
					type: 'array',
					label: 'Dans le sac à langer',
					fields: [
						{
							name: 'item',
							type: 'text',
							required: true,
						},
					],
				},
				{
					name: 'bagImage',
					type: 'upload',
					relationTo: 'media',
					label: 'Image sac à langer',
				},
				{
					name: 'nounouItems',
					type: 'array',
					label: 'Chez nounou',
					fields: [
						{
							name: 'item',
							type: 'text',
							required: true,
						},
					],
				},
				{
					name: 'nounouImage',
					type: 'upload',
					relationTo: 'media',
					label: 'Image chez nounou',
				},
			],
		},

		// ==================== SECTION JOURNEE TYPE ====================
		{
			name: 'dailySchedule',
			type: 'array',
			label: 'Journée type',
			labels: {
				singular: 'Moment',
				plural: 'Moments',
			},
			fields: [
				{
					name: 'time',
					type: 'text',
					label: 'Heure',
					admin: {
						description: 'Ex: 7h30, Matin, Après-midi...',
					},
				},
				{
					name: 'activity',
					type: 'textarea',
					label: 'Activité',
					required: true,
				},
			],
		},

		// ==================== SECTION CHARTE ====================
		{
			name: 'charter',
			type: 'array',
			label: 'Charte de vie',
			labels: {
				singular: 'Règle',
				plural: 'Règles',
			},
			fields: [
				{
					name: 'ruleNumber',
					type: 'number',
					label: 'Numéro',
					required: true,
				},
				{
					name: 'title',
					type: 'text',
					label: 'Titre',
					admin: {
						description: 'Ex: 1ère règle de Nounou',
					},
				},
				{
					name: 'content',
					type: 'richText',
					label: 'Contenu',
				},
			],
		},

		// ==================== SITE SETTINGS ====================
		{
			name: 'settings',
			type: 'group',
			label: 'Paramètres du site',
			fields: [
				{
					name: 'isAvailable',
					type: 'checkbox',
					label: 'Nounou disponible',
					defaultValue: true,
					admin: {
						description: "Décocher pour afficher le message d'indisponibilité",
					},
				},
				{
					name: 'unavailableMessage',
					type: 'textarea',
					label: "Message d'indisponibilité",
					defaultValue: 'Nounou actuellement indisponible, merci de votre compréhension.',
					admin: {
						condition: (_, siblingData) => !siblingData?.isAvailable,
					},
				},
				{
					name: 'returnDate',
					type: 'text',
					label: 'Date de retour',
					admin: {
						description: 'Ex: 2026',
						condition: (_, siblingData) => !siblingData?.isAvailable,
					},
				},
				{
					name: 'email',
					type: 'email',
					label: 'Email',
					defaultValue: 'andorma@gmail.com',
				},
				{
					name: 'phone',
					type: 'text',
					label: 'Téléphone portable',
					defaultValue: '06 03 28 69 06',
				},
				{
					name: 'landline',
					type: 'text',
					label: 'Téléphone fixe',
					defaultValue: '04 50 72 81 92',
				},
				{
					name: 'address',
					type: 'textarea',
					label: 'Adresse',
					defaultValue: '1250 Chemin de la Renouillère, 74140 Sciez',
				},
				{
					name: 'nounouTopLink',
					type: 'text',
					label: 'Lien Nounou Top',
					defaultValue: 'https://aide-au-top.fr/assistante-maternelle-sciez-74140-19',
				},
				{
					name: 'openingHours',
					type: 'text',
					label: "Horaires d'accueil",
					defaultValue: '7h - 19h',
				},
				{
					name: 'mapLat',
					type: 'number',
					label: 'Latitude',
					defaultValue: 46.349104,
					admin: {
						step: 0.000001,
					},
				},
				{
					name: 'mapLng',
					type: 'number',
					label: 'Longitude',
					defaultValue: 6.397748,
					admin: {
						step: 0.000001,
					},
				},
			],
		},
	],
}
