import type { GlobalConfig } from 'payload'

export const Landing: GlobalConfig = {
	slug: 'landing',
	label: 'Landing Page',
	admin: {
		group: 'Contenu',
	},
	fields: [
		// ==================== SECTION HERO ====================
		{
			name: 'hero',
			type: 'group',
			label: 'Hero',
			fields: [
				{
					name: 'title',
					type: 'text',
					label: 'Titre principal',
					defaultValue: 'Isabelle Cinquin',
					required: true,
				},
				{
					name: 'subtitle',
					type: 'text',
					label: 'Sous-titre',
					defaultValue: 'Assistante Maternelle au bord du Lac Léman',
				},
				{
					name: 'buttons',
					type: 'array',
					label: 'Boutons',
					maxRows: 2,
					fields: [
						{ name: 'text', type: 'text', label: 'Texte', required: true },
						{ name: 'url', type: 'text', label: 'URL', required: true },
						{
							name: 'variant',
							type: 'select',
							label: 'Style',
							options: [
								{ label: 'Primaire (Blanc)', value: 'primary' },
								{ label: 'Secondaire (Transparent)', value: 'secondary' },
							],
							defaultValue: 'primary',
						},
					],
				},
			],
		},

		// ==================== SECTION ABOUT (À propos) ====================
		{
			name: 'about',
			type: 'group',
			label: 'À propos',
			fields: [
				{
					name: 'badge',
					type: 'text',
					label: 'Badge',
					defaultValue: 'À propos',
				},
				{
					name: 'title',
					type: 'text',
					label: 'Titre',
					defaultValue: 'Nounou sur Sciez',
				},
				{
					name: 'titleAccent',
					type: 'text',
					label: 'Titre accent (coloré)',
					defaultValue: 'depuis 2003',
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
				{
					name: 'stats',
					type: 'array',
					label: 'Statistiques',
					labels: { singular: 'Statistique', plural: 'Statistiques' },
					fields: [
						{ name: 'value', type: 'number', label: 'Valeur', required: true },
						{ name: 'suffix', type: 'text', label: 'Suffixe (ex: +)' },
						{ name: 'label', type: 'text', label: 'Label', required: true },
					],
				},
			],
		},

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
					name: 'title',
					type: 'text',
					label: 'Titre',
					defaultValue: 'Ma présentation',
				},
				{
					name: 'content',
					type: 'richText',
					label: 'Contenu',
				},
				{
					name: 'agreementInfo',
					type: 'textarea',
					label: "Informations d'agrément",
					defaultValue:
						"Mon agrément me permet d'accueillir 3 enfants le jour de 7h à 19h et un enfant la nuit de 18h à 7h.",
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
			name: 'trainingsSection',
			type: 'group',
			label: 'Section Formations',
			fields: [
				{
					name: 'title',
					type: 'text',
					label: 'Titre de section',
					defaultValue: 'Mes formations',
				},
				{
					name: 'items',
					type: 'array',
					label: 'Formations',
					labels: { singular: 'Formation', plural: 'Formations' },
					fields: [
						{ name: 'title', type: 'text', label: 'Titre', required: true },
						{ name: 'period', type: 'text', label: 'Période', admin: { description: 'Ex: 2018 - 2020' } },
						{ name: 'description', type: 'textarea', label: 'Description' },
					],
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
					name: 'title',
					type: 'text',
					label: 'Titre de section',
					defaultValue: 'Le sommeil',
				},
				{
					name: 'subtitle',
					type: 'text',
					label: 'Sous-titre',
					defaultValue: 'Les siestes',
				},
				{
					name: 'content',
					type: 'richText',
					label: 'Contenu',
				},
				{
					name: 'tags',
					type: 'array',
					label: 'Tags flottants',
					labels: { singular: 'Tag', plural: 'Tags' },
					fields: [{ name: 'text', type: 'text', label: 'Texte', required: true }],
				},
			],
		},

		// ==================== SECTION LIEU DE VIE ====================
		{
			name: 'livingPlace',
			type: 'group',
			label: 'Lieu de vie',
			fields: [
				{ name: 'title', type: 'text', label: 'Titre de section', defaultValue: 'Lieu de vie' },
				{
					name: 'description',
					type: 'textarea',
					label: 'Description',
					defaultValue:
						"J'accueille vos enfants dans une maison clôturée avec jardin qui se situe au bord du Lac Léman.",
				},
				{ name: 'content', type: 'richText', label: 'Contenu' },
				{
					name: 'images',
					type: 'array',
					label: 'Images',
					fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
				},
			],
		},

		// ==================== SECTION EQUIPEMENTS ====================
		{
			name: 'equipmentSection',
			type: 'group',
			label: 'Section Équipements',
			fields: [
				{ name: 'title', type: 'text', label: 'Titre de section', defaultValue: 'Les équipements' },
				{
					name: 'subtitle',
					type: 'text',
					label: 'Sous-titre',
					defaultValue: 'Tout le matériel nécessaire pour accueillir vos enfants',
				},
				{
					name: 'items',
					type: 'array',
					label: 'Équipements',
					labels: { singular: 'Équipement', plural: 'Équipements' },
					fields: [
						{ name: 'name', type: 'text', label: 'Nom', required: true },
						{ name: 'quantity', type: 'number', label: 'Quantité', admin: { description: 'Optionnel' } },
						{
							name: 'icon',
							type: 'text',
							label: 'Icône (chemin)',
							admin: { description: 'Ex: /icons/scribbbles/7/SVG/Fichier 1.svg' },
						},
					],
				},
			],
		},

		// ==================== SECTION OBJECTIFS ====================
		{
			name: 'objectivesSection',
			type: 'group',
			label: 'Section Objectifs',
			fields: [
				{ name: 'title', type: 'text', label: 'Titre de section', defaultValue: 'Mes objectifs' },
				{
					name: 'subtitle',
					type: 'text',
					label: 'Sous-titre',
					defaultValue: "Ce qui est important pour moi dans l'accompagnement de vos enfants",
				},
				{
					name: 'items',
					type: 'array',
					label: 'Objectifs',
					labels: { singular: 'Objectif', plural: 'Objectifs' },
					fields: [
						{ name: 'title', type: 'text', label: 'Titre', required: true },
						{ name: 'description', type: 'text', label: 'Description' },
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
						{ name: 'content', type: 'richText', label: 'Contenu' },
					],
				},
			],
		},

		// ==================== SECTION ADAPTATION ====================
		{
			name: 'adaptation',
			type: 'group',
			label: "Période d'adaptation",
			fields: [
				{ name: 'title', type: 'text', label: 'Titre de section', defaultValue: "Période d'adaptation" },
				{
					name: 'subtitle',
					type: 'textarea',
					label: 'Sous-titre',
					defaultValue:
						"Une période importante pour permettre à l'enfant, aux parents, et à nounou de faire connaissance en douceur.",
				},
				{ name: 'image', type: 'upload', relationTo: 'media', label: 'Image' },
				{
					name: 'keyMessage',
					type: 'textarea',
					label: 'Message clé',
					defaultValue:
						"La clé d'un accueil réussi : une confiance mutuelle et un dialogue permanent entre les parents et la nounou.",
				},
				{
					name: 'badges',
					type: 'array',
					label: 'Badges',
					labels: { singular: 'Badge', plural: 'Badges' },
					fields: [
						{ name: 'text', type: 'text', label: 'Texte', required: true },
						{
							name: 'color',
							type: 'select',
							label: 'Couleur',
							options: [
								{ label: 'Rose', value: 'pink' },
								{ label: 'Violet', value: 'violet' },
								{ label: 'Orange', value: 'amber' },
								{ label: 'Vert', value: 'emerald' },
							],
							defaultValue: 'pink',
						},
					],
				},
				{ name: 'content', type: 'richText', label: 'Contenu' },
			],
		},

		// ==================== SECTION ORGANISATION ====================
		{
			name: 'organization',
			type: 'group',
			label: 'Organisation des affaires',
			fields: [
				{ name: 'title', type: 'text', label: 'Titre de section', defaultValue: 'Organisation des affaires' },
				{
					name: 'subtitle',
					type: 'text',
					label: 'Sous-titre',
					defaultValue: "Glissez pour comparer ce qu'il faut apporter et ce qui est fourni",
				},
				{
					name: 'bagItems',
					type: 'array',
					label: 'Dans le sac à langer',
					fields: [{ name: 'item', type: 'text', required: true }],
				},
				{ name: 'bagImage', type: 'upload', relationTo: 'media', label: 'Image sac à langer' },
				{
					name: 'nounouItems',
					type: 'array',
					label: 'Chez nounou',
					fields: [{ name: 'item', type: 'text', required: true }],
				},
				{ name: 'nounouImage', type: 'upload', relationTo: 'media', label: 'Image chez nounou' },
			],
		},

		// ==================== SECTION JOURNEE TYPE ====================
		{
			name: 'dailyScheduleSection',
			type: 'group',
			label: 'Section Journée type',
			fields: [
				{ name: 'title', type: 'text', label: 'Titre de section', defaultValue: "Organisation d'une journée" },
				{
					name: 'subtitle',
					type: 'text',
					label: 'Sous-titre',
					defaultValue: 'Comment se déroule une journée type chez nounou',
				},
				{
					name: 'items',
					type: 'array',
					label: 'Moments de la journée',
					labels: { singular: 'Moment', plural: 'Moments' },
					fields: [
						{ name: 'time', type: 'text', label: 'Heure', admin: { description: 'Ex: 7h30, Matin, Après-midi...' } },
						{ name: 'activity', type: 'textarea', label: 'Activité', required: true },
					],
				},
			],
		},

		// ==================== SECTION CHARTE ====================
		{
			name: 'charterSection',
			type: 'group',
			label: 'Section Charte de vie',
			fields: [
				{ name: 'title', type: 'text', label: 'Titre de section', defaultValue: 'Charte de vie' },
				{
					name: 'subtitle',
					type: 'text',
					label: 'Sous-titre',
					defaultValue: 'Les règles de vie chez nounou, écrites du point de vue de votre enfant 💜',
				},
				{
					name: 'items',
					type: 'array',
					label: 'Règles',
					labels: { singular: 'Règle', plural: 'Règles' },
					fields: [
						{ name: 'ruleNumber', type: 'number', label: 'Numéro', required: true },
						{ name: 'title', type: 'text', label: 'Titre', admin: { description: 'Ex: 1ère règle de Nounou' } },
						{ name: 'content', type: 'textarea', label: 'Contenu' },
					],
				},
			],
		},

		// ==================== SECTION CONTACT PREVIEW ====================
		{
			name: 'contactSection',
			type: 'group',
			label: 'Section Contact',
			fields: [
				{
					name: 'title',
					type: 'text',
					label: 'Titre',
					defaultValue: 'Envie de me rencontrer ?',
				},
				{
					name: 'content',
					type: 'textarea',
					label: 'Texte',
					defaultValue: "N'hésitez pas à me contacter pour discuter de l'accueil de votre enfant",
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
