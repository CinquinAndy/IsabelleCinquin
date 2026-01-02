'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SectionWrapper } from '@/components/ui/section-wrapper'

// Decorative icons for hero section
const decorativeIcons = [
	{ src: '/icons/scribbbles/7/SVG/Fichier 15.svg', position: 'top-20 left-8 md:left-16' },
	{ src: '/icons/scribbbles/7/SVG/Fichier 10.svg', position: 'top-32 right-4 md:right-20' },
	{ src: '/icons/scribbbles/7/SVG/Fichier 20.svg', position: 'bottom-32 left-12 md:left-24' },
	{ src: '/icons/scribbbles/7/SVG/Fichier 2.svg', position: 'bottom-20 right-8 md:right-16' },
]

export function TutoPageClient() {
	return (
		<main className="min-h-screen">
			{/* Hero Section */}
			<section className="relative min-h-[70vh] overflow-hidden bg-primary flex flex-col items-center justify-center">
				{/* Floating decorative icons */}
				{decorativeIcons.map((icon, index) => (
					<motion.div
						key={icon.src}
						className={`absolute ${icon.position} w-16 h-16 md:w-20 md:h-20 opacity-60`}
						initial={{ opacity: 0, y: 20 }}
						animate={{
							opacity: [0.4, 0.7, 0.4],
							y: [0, -12, 0],
							rotate: [0, 5, -5, 0],
						}}
						transition={{
							opacity: { duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 },
							y: { duration: 4 + index * 0.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' },
							rotate: { duration: 5 + index * 0.3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' },
						}}
					>
						<Image src={icon.src} alt="" width={80} height={80} className="drop-shadow-lg" />
					</motion.div>
				))}

				{/* Back link */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
				>
					<Link
						href="/admin"
						className="absolute top-24 left-6 md:left-12 inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors z-10 group"
					>
						<motion.div whileHover={{ x: -4 }} transition={{ duration: 0.3 }}>
							<ArrowLeft className="w-4 h-4" />
						</motion.div>
						<span className="hidden sm:inline">Retour au dashboard</span>
					</Link>
				</motion.div>

				{/* Content */}
				<div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 pt-32 md:pt-40 text-center">
					{/* Badge */}
					<motion.span
						className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium rounded-full mb-6"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
					>
						<BookOpen className="w-4 h-4" />
						Documentation CMS
					</motion.span>

					{/* Title */}
					<motion.h1
						className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
					>
						Guide{' '}
						<motion.span
							className="font-handwriting text-accent drop-shadow-md inline-block"
							initial={{ opacity: 0, rotate: -5 }}
							animate={{ opacity: 1, rotate: 0 }}
							transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 200 }}
						>
							d&apos;Utilisation
						</motion.span>
					</motion.h1>

					{/* Description */}
					<motion.p
						className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 0.8, y: 0 }}
						transition={{ duration: 0.7, delay: 0.4 }}
					>
						Apprends à gérer ton site : créer des <strong className="text-white">articles de blog</strong>,
						optimiser le <strong className="text-white">référencement</strong>, gérer les{' '}
						<strong className="text-white">photos</strong> et modifier la{' '}
						<strong className="text-white">page d&apos;accueil</strong>.
					</motion.p>

					{/* CTA button */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.6, type: 'spring', stiffness: 200 }}
					>
						<Link
							href="#contenu"
							className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-full font-semibold hover:bg-white/90 transition-all hover:scale-105 shadow-lg group"
						>
							Commencer la lecture
							<motion.div
								animate={{ x: [0, 4, 0] }}
								transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
							>
								<ArrowRight className="w-5 h-5" />
							</motion.div>
						</Link>
					</motion.div>
				</div>

				{/* Diagonal wave separator */}
				<motion.div
					className="absolute bottom-0 left-0 right-0"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.9 }}
				>
					<svg
						viewBox="0 0 1440 200"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="w-full h-auto"
						preserveAspectRatio="none"
					>
						<motion.path
							d="M0,160 C150,145 300,100 500,85 C700,70 900,55 1100,45 C1250,38 1350,35 1440,30 L1440,200 L0,200 Z"
							className="fill-secondary"
							initial={{ pathLength: 0 }}
							animate={{ pathLength: 1 }}
							transition={{ duration: 1.2, delay: 1, ease: 'easeInOut' }}
						/>
						<motion.path
							d="M0,160 C150,145 300,100 500,85 C700,70 900,55 1100,45 C1250,38 1350,35 1440,30"
							stroke="white"
							strokeWidth="2"
							strokeDasharray="12 8"
							fill="none"
							opacity="0.4"
							initial={{ pathLength: 0 }}
							animate={{ pathLength: 1 }}
							transition={{ duration: 1.5, delay: 1.2, ease: 'easeInOut' }}
						/>
					</svg>
				</motion.div>
			</section>

			{/* Content Section */}
			<SectionWrapper id="contenu" variant="secondary" className="pt-8 pb-16">
				<motion.article
					className="prose prose-lg prose-invert prose-isa max-w-none prose-headings:text-white prose-p:text-white/80 prose-li:text-white/80 prose-strong:text-white prose-a:text-accent hover:prose-a:text-accent/80 prose-code:bg-white/10 prose-code:text-white prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-black/30 prose-hr:border-white/20"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<h2>📖 Table des matières</h2>
					<ol>
						<li><a href="#concepts-importants">Concepts Importants</a></li>
						<li><a href="#connexion">Connexion à Payload</a></li>
						<li><a href="#blog">Gestion du Blog (Posts)</a></li>
						<li><a href="#categories">Catégories</a></li>
						<li><a href="#medias">Médias (Images)</a></li>
						<li><a href="#landing">Landing Page (Page d&apos;Accueil)</a></li>
						<li><a href="#bonnes-pratiques">Astuces et Bonnes Pratiques</a></li>
						<li><a href="#problemes">En cas de problème</a></li>
					</ol>

					<hr />

					<h2 id="concepts-importants">Concepts Importants</h2>

					<h3>🎯 Qu&apos;est-ce que le SEO ?</h3>
					<p>
						<strong>SEO</strong> signifie &quot;Search Engine Optimization&quot; (Optimisation pour les Moteurs de Recherche).
					</p>
					<p>
						<strong>En simple :</strong> C&apos;est ce qui permet de rendre ton site visible sur Google.
					</p>
					<p>Deux éléments clés :</p>
					<ul>
						<li><strong>Titre SEO :</strong> Le titre qui apparaît dans les résultats Google <strong>(maximum 60 caractères)</strong></li>
						<li><strong>Description SEO :</strong> Le texte sous le titre dans Google <strong>(maximum 155 caractères)</strong></li>
					</ul>
					<p><strong>Exemple :</strong></p>
					<pre><code>{`Titre : Assistante Maternelle Sciez | Isabelle Cinquin
Description : Nounou agréée à Sciez près du Lac Léman. 
Accueil chaleureux pour vos enfants. Plus de 20 ans d'expérience.`}</code></pre>

					<hr />

					<h3>🖼️ Qu&apos;est-ce que l&apos;Alt Text (Texte Alternatif) ?</h3>
					<p>
						<strong>Alt Text</strong> est une description textuelle d&apos;une image.
					</p>
					<p><strong>Pourquoi c&apos;est important ?</strong></p>
					<ol>
						<li><strong>Accessibilité :</strong> Les personnes malvoyantes utilisent des lecteurs d&apos;écran qui lisent cette description</li>
						<li><strong>SEO :</strong> Google ne &quot;voit&quot; pas les images, il lit l&apos;alt text pour comprendre ce qu&apos;elles représentent</li>
					</ol>
					<p><strong>Exemples :</strong></p>
					<ul>
						<li>❌ Mauvais : &quot;image1.jpg&quot; ou &quot;photo&quot;</li>
						<li>✅ Bon : &quot;Enfants jouant dans le jardin de la maison de nounou à Sciez&quot;</li>
					</ul>

					<hr />

					<h3>🤖 Les Outils IA de l&apos;Application</h3>

					<h4>Forvoyez - Génération automatique d&apos;Alt Text</h4>
					<p><strong>Qu&apos;est-ce que c&apos;est ?</strong></p>
					<p>Forvoyez est un service d&apos;intelligence artificielle qui analyse tes images et génère automatiquement une description en français.</p>
					<p><strong>Comment l&apos;utiliser ?</strong></p>
					<ol>
						<li>Télécharge ton image dans la bibliothèque Médias</li>
						<li>Clique sur le bouton <strong>&quot;✨ Générer alt text&quot;</strong></li>
						<li>Attends quelques secondes</li>
						<li>L&apos;IA génère une description automatique</li>
						<li><strong>Important :</strong> Vérifie toujours le résultat et ajuste si nécessaire</li>
					</ol>
					<p><strong>Note :</strong> La génération d&apos;alt text se lance automatiquement en arrière-plan lors du téléchargement. Si après 10 minutes tu n&apos;as toujours rien, tu peux réessayer manuellement.</p>

					<hr />

					<h4>Gemini - Génération automatique de SEO</h4>
					<p><strong>Qu&apos;est-ce que c&apos;est ?</strong></p>
					<p>Gemini est l&apos;IA de Google, utilisée ici pour générer automatiquement les titres et descriptions SEO.</p>
					<p><strong>Comment l&apos;utiliser ?</strong></p>
					<ol>
						<li>Ouvre n&apos;importe quel article de blog dans Payload</li>
						<li>Va dans l&apos;onglet <strong>&quot;SEO&quot;</strong></li>
						<li>Clique sur <strong>&quot;🤖 Générer SEO avec Gemini&quot;</strong></li>
						<li>L&apos;IA analyse le contenu et génère :
							<ul>
								<li>Un titre SEO optimisé (max 60 caractères)</li>
								<li>Une description SEO optimisée (max 155 caractères)</li>
							</ul>
						</li>
						<li><strong>Important :</strong> Vérifie et personnalise si besoin</li>
					</ol>

					<hr />

					<h2 id="connexion">Connexion à Payload</h2>

					<h3>🔐 Accéder à l&apos;interface d&apos;administration</h3>
					<p><strong>URL :</strong></p>
					<pre><code>https://isabelle-cinquin.fr/admin</code></pre>

					<h3>📝 Connexion</h3>
					<ol>
						<li>Ouvre l&apos;URL d&apos;administration dans ton navigateur</li>
						<li>Entre ton <strong>email</strong> et ton <strong>mot de passe</strong></li>
						<li>Clique sur <strong>&quot;Se connecter&quot;</strong></li>
					</ol>

					<h3>🗂️ Interface principale</h3>
					<p>Une fois connectée, tu verras le tableau de bord avec :</p>
					<ul>
						<li><strong>Collections</strong> (à gauche) : Users, Media, Posts, Categories</li>
						<li><strong>Contenu</strong> (à gauche) : Landing Page</li>
					</ul>
					<p><strong>Qu&apos;est-ce qu&apos;une Collection ?</strong></p>
					<p>Une collection est une liste d&apos;éléments multiples : plusieurs articles de blog, plusieurs images, plusieurs catégories.</p>
					<p><strong>Qu&apos;est-ce qu&apos;un Global ?</strong></p>
					<p>Un global est un élément unique : il n&apos;y a qu&apos;une seule Landing Page (page d&apos;accueil).</p>

					<hr />

					<h2 id="blog">Gestion du Blog (Posts)</h2>
					<p><strong>Où le trouver ?</strong></p>
					<p>Menu de gauche → <strong>Blog</strong> → <strong>Posts</strong></p>

					<h3>Créer un nouvel article</h3>
					<ol>
						<li>Clique sur <strong>&quot;Create New&quot;</strong> (en haut à droite)</li>
						<li>Remplis tous les champs (voir ci-dessous)</li>
						<li>Clique sur <strong>&quot;Save&quot;</strong> en haut à droite</li>
					</ol>

					<h3>Champs d&apos;un article de blog</h3>

					<h4>Titre</h4>
					<ul>
						<li>Le titre principal de ton article</li>
						<li><strong>Exemple :</strong> &quot;Les bienfaits des activités en plein air pour les tout-petits&quot;</li>
					</ul>

					<h4>Slug (identifiant URL)</h4>
					<ul>
						<li>Généré automatiquement depuis le titre</li>
						<li>Utilisé dans l&apos;adresse web</li>
						<li><strong>Exemple :</strong> <code>bienfaits-activites-plein-air-tout-petits</code></li>
						<li><strong>Important :</strong> Ne modifie pas le slug après la publication !</li>
					</ul>

					<h4>Extrait</h4>
					<ul>
						<li>Résumé court de l&apos;article (2-3 phrases)</li>
						<li>Apparaît dans les listes d&apos;articles</li>
					</ul>

					<h4>Contenu</h4>
					<p>L&apos;éditeur de texte enrichi permet d&apos;utiliser :</p>
					<ul>
						<li><strong>Titres (H2, H3, H4)</strong> : Structure ton contenu</li>
						<li><strong>Gras &amp; Italique</strong> : Mets en avant les points importants</li>
						<li><strong>Listes</strong> : À puces ou numérotées</li>
						<li><strong>Liens</strong> : Ajoute des liens internes ou externes</li>
						<li><strong>Images</strong> : Insère des photos dans ton contenu</li>
					</ul>

					<h4>Image mise en avant</h4>
					<ul>
						<li>L&apos;image principale qui représente ton article</li>
						<li>Apparaît en haut de l&apos;article et dans les listes</li>
						<li><strong>Recommandation :</strong> Photo de haute qualité (1920x1080 minimum)</li>
					</ul>

					<h4>Catégories</h4>
					<ul>
						<li>Sélectionne une ou plusieurs catégories</li>
						<li>Aide à organiser les articles</li>
					</ul>

					<h4>Article important (checkbox)</h4>
					<ul>
						<li>Cocher cette case affiche l&apos;article dans la section &quot;Activités&quot; de la page d&apos;accueil</li>
						<li>Utile pour mettre en avant tes meilleurs articles</li>
					</ul>

					<h4>Statut</h4>
					<ul>
						<li><strong>Brouillon :</strong> L&apos;article n&apos;est pas publié, toi seule peux le voir</li>
						<li><strong>Publié :</strong> L&apos;article est visible par tous</li>
					</ul>
					<p><strong>Conseil :</strong> Travaille en mode Brouillon, puis publie quand tu es satisfaite.</p>

					<h3>SEO d&apos;un article</h3>
					<ol>
						<li>Remplis d&apos;abord le titre, l&apos;extrait et le contenu</li>
						<li>Va dans l&apos;onglet <strong>&quot;SEO&quot;</strong></li>
						<li>Clique sur <strong>&quot;🤖 Générer SEO avec Gemini&quot;</strong></li>
						<li>Vérifie et ajuste si besoin</li>
						<li>Save</li>
					</ol>

					<hr />

					<h2 id="categories">Catégories</h2>
					<p><strong>Où les trouver ?</strong></p>
					<p>Menu de gauche → <strong>Blog</strong> → <strong>Categories</strong></p>

					<h3>Créer une catégorie</h3>
					<ol>
						<li>Clique sur <strong>&quot;Create New&quot;</strong></li>
						<li>Remplis le <strong>Nom</strong> (ex: &quot;Activités&quot;, &quot;Conseils parents&quot;, &quot;Vie quotidienne&quot;)</li>
						<li>Le <strong>Slug</strong> est généré automatiquement</li>
						<li>Clique sur <strong>&quot;Save&quot;</strong></li>
					</ol>

					<p><strong>Idées de catégories :</strong></p>
					<ul>
						<li>Activités</li>
						<li>Conseils parents</li>
						<li>Vie quotidienne</li>
						<li>Développement enfant</li>
						<li>Actualités</li>
					</ul>

					<hr />

					<h2 id="medias">Médias (Images)</h2>
					<p><strong>Où les trouver ?</strong></p>
					<p>Menu de gauche → <strong>Collections</strong> → <strong>Media</strong></p>

					<h3>Télécharger une nouvelle image</h3>
					<ol>
						<li>Clique sur <strong>&quot;Upload New&quot;</strong> ou <strong>&quot;Create New&quot;</strong></li>
						<li>Sélectionne ton image (ou glisse-dépose)</li>
						<li>Attends le téléchargement</li>
					</ol>
					<p><strong>Formats acceptés :</strong> JPG, PNG, WebP</p>
					<p><strong>Taille recommandée :</strong> Maximum 5 Mo par image</p>

					<h3>Alt Text</h3>
					<p><strong>Méthode automatique (Forvoyez) :</strong></p>
					<ol>
						<li>Ouvre l&apos;image dans la bibliothèque</li>
						<li>Clique sur <strong>&quot;✨ Générer alt text&quot;</strong></li>
						<li>Attends quelques secondes</li>
						<li><strong>Vérifie le résultat</strong> et ajuste si nécessaire</li>
						<li>Clique sur <strong>&quot;Save&quot;</strong></li>
					</ol>
					<p><strong>Note :</strong> Lors de l&apos;upload, l&apos;alt text est généré automatiquement en arrière-plan. Si après 10 minutes il n&apos;y a rien, utilise le bouton ou remplis manuellement.</p>

					<h3>Génération en masse</h3>
					<p>Dans la collection Media, tu peux générer l&apos;alt text pour plusieurs images :</p>
					<ol>
						<li>Coche les cases des images concernées</li>
						<li>Clique sur <strong>&quot;Bulk Alt Text&quot;</strong> en haut</li>
						<li>Attends que toutes les descriptions soient générées</li>
					</ol>

					<h3>Bonnes pratiques</h3>
					<h4>Avant de télécharger</h4>
					<ol>
						<li><strong>Optimise la taille :</strong> Compresse tes images avec <a href="https://tinypng.com/" target="_blank" rel="noopener noreferrer">TinyPNG</a> (gratuit)</li>
						<li><strong>Nomme correctement :</strong> <code>activite-peinture-enfants.jpg</code> au lieu de <code>IMG_1234.jpg</code></li>
						<li><strong>Vérifie la qualité :</strong> Image nette et bien cadrée</li>
					</ol>

					<hr />

					<h2 id="landing">Landing Page (Page d&apos;Accueil)</h2>
					<p><strong>Où la trouver ?</strong></p>
					<p>Menu de gauche → <strong>Contenu</strong> → <strong>Landing Page</strong></p>
					<p>C&apos;est ici que tu peux modifier tout le contenu de la page d&apos;accueil du site.</p>

					<h3>Sections disponibles</h3>

					<h4>Hero</h4>
					<ul>
						<li>Titre principal et sous-titre</li>
						<li>Boutons d&apos;action (texte, URL, style)</li>
					</ul>

					<h4>À propos</h4>
					<ul>
						<li>Badge, titre, titre accent (coloré)</li>
						<li>Contenu texte enrichi</li>
						<li>Photo</li>
						<li>Statistiques (ex: &quot;20+ années d&apos;expérience&quot;)</li>
					</ul>

					<h4>Introduction</h4>
					<ul>
						<li>Titre et contenu du livret d&apos;accueil</li>
					</ul>

					<h4>Membres de la famille</h4>
					<ul>
						<li>Photo, prénom, nom, description</li>
						<li>Lien optionnel (site web, réseau social)</li>
					</ul>

					<h4>Formations</h4>
					<ul>
						<li>Titre de section, sous-titre</li>
						<li>Liste des formations (titre, période, description)</li>
					</ul>

					<h4>Sommeil</h4>
					<ul>
						<li>Titre, sous-titre, contenu</li>
						<li>Tags flottants (ex: &quot;Sieste adaptée&quot;, &quot;Environnement calme&quot;)</li>
					</ul>

					<h4>Lieu de vie</h4>
					<ul>
						<li>Titre, description</li>
						<li>Image de la maison/jardin</li>
					</ul>

					<h4>Équipements</h4>
					<ul>
						<li>Titre de section, sous-titre</li>
						<li>Liste des équipements (nom, quantité, icône)</li>
					</ul>

					<h4>Objectifs</h4>
					<ul>
						<li>Titre de section, sous-titre</li>
						<li>Liste des objectifs (titre, description, icône)</li>
					</ul>

					<h4>Période d&apos;adaptation</h4>
					<ul>
						<li>Titre, sous-titre, image</li>
						<li>Message clé</li>
						<li>Badges (texte, icône, couleur)</li>
					</ul>

					<h4>Organisation des affaires</h4>
					<ul>
						<li>Ce qu&apos;il faut apporter (sac à langer)</li>
						<li>Ce qui est fourni chez nounou</li>
						<li>Images comparatives</li>
					</ul>

					<h4>Journée type</h4>
					<ul>
						<li>Titre de section, sous-titre</li>
						<li>Moments de la journée (heure + activité)</li>
					</ul>

					<h4>Charte de vie</h4>
					<ul>
						<li>Titre de section, sous-titre</li>
						<li>Règles (numéro, titre, contenu)</li>
					</ul>

					<h4>Contact</h4>
					<ul>
						<li>Titre et texte d&apos;accroche</li>
					</ul>

					<h4>Paramètres du site</h4>
					<ul>
						<li><strong>Nounou disponible :</strong> Décocher affiche un message d&apos;indisponibilité</li>
						<li><strong>Coordonnées :</strong> Email, téléphone portable, fixe, adresse</li>
						<li><strong>Lien Nounou Top :</strong> Profil sur le site aide-au-top.fr</li>
						<li><strong>Horaires d&apos;accueil</strong></li>
						<li><strong>Position carte :</strong> Latitude et longitude pour la carte</li>
					</ul>

					<hr />

					<h2 id="bonnes-pratiques">Astuces et Bonnes Pratiques</h2>

					<h3>Pour un meilleur référencement</h3>
					<ol>
						<li><strong>Utilise Gemini</strong> pour générer le SEO automatiquement</li>
						<li><strong>Inclus ta localisation</strong> : Sciez, Lac Léman, Thonon-les-Bains, Douvaine</li>
						<li><strong>Mets à jour régulièrement</strong> : Publie des articles, ajoute des photos</li>
					</ol>

					<h3>Pour des images parfaites</h3>
					<ol>
						<li><strong>Qualité avant tout :</strong> Photos nettes et bien exposées</li>
						<li><strong>Optimise le poids :</strong> Compresse avec TinyPNG (cible : 200-500 Ko) = pas obligatoire</li>
						<li><strong>Alt Text systématique :</strong> Utilise Forvoyez puis vérifie</li>
					</ol>

					<hr />

					<h2 id="problemes">En cas de problème</h2>

					<h4>Tu ne vois pas tes modifications sur le site</h4>
					<ol>
						<li>Assure-toi d&apos;avoir cliqué sur <strong>&quot;Save&quot;</strong></li>
						<li>Attends 2-3 minutes (le site met à jour le cache)</li>
						<li>Rafraîchis la page (Ctrl+F5 ou Cmd+Shift+R)</li>
					</ol>

					<h4>Une image ne s&apos;affiche pas</h4>
					<ol>
						<li>Vérifie que l&apos;image est bien téléchargée dans Media</li>
						<li>Vérifie que tu as bien sélectionné cette image dans le champ</li>
					</ol>

					<h4>Forvoyez ou Gemini ne fonctionne pas</h4>
					<ol>
						<li>Vérifie ta connexion internet</li>
						<li>Réessaie dans quelques minutes</li>
						<li>Utilise la méthode manuelle si le problème persiste</li>
					</ol>

					<h4>Tu as supprimé quelque chose par erreur</h4>
					<p><strong>Contacte-moi immédiatement</strong> pour voir si on peut récupérer. Des sauvegardes sont effectuées régulièrement.</p>

					<hr />

					<h2>🎉 Félicitations !</h2>
					<p>Tu sais maintenant comment gérer l&apos;intégralité du contenu de ton site web.</p>
					<p><strong>Rappelle-toi :</strong></p>
					<ul>
						<li>Sois régulière dans les mises à jour</li>
						<li>Ajoute du contenu au fil du temps</li>
						<li>Utilise Gemini et Forvoyez pour gagner du temps</li>
					</ul>
					<p><strong>Ton site est un outil vivant.</strong> Plus tu l&apos;alimentes, plus il attirera de familles !</p>
					<p>Bon courage ! 💜</p>
				</motion.article>

				{/* Back navigation */}
				<motion.div
					className="mt-12 pt-8 border-t border-white/20"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<Link
						href="/admin"
						className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors"
					>
						<ArrowLeft className="w-4 h-4" />
						Retour au dashboard
					</Link>
				</motion.div>
			</SectionWrapper>
		</main>
	)
}
