import type React from 'react'

export default function TutorialsPage(): React.JSX.Element {
	return (
		<div style={{ padding: '1.5rem' }}>
			<h1 style={{ marginBottom: '0.5rem', marginTop: 0, fontSize: '1.5rem', fontWeight: 600 }}>
				Tutoriels &amp; Guides
			</h1>
			<p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--theme-elevation-600)' }}>
				Apprenez à utiliser Payload, gérer le contenu et opérer le site efficacement.
			</p>

			<div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
				<div style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--theme-elevation-150)', background: 'var(--theme-elevation-50)' }}>
					<h3 style={{ marginTop: 0, fontSize: '1.125rem', fontWeight: 500 }}>Premiers pas avec Payload</h3>
					<p style={{ fontSize: '0.875rem', color: 'var(--theme-elevation-600)' }}>
						Vue d&apos;ensemble des collections, champs et brouillons.
					</p>
					<ul style={{ fontSize: '0.875rem', paddingLeft: '1.25rem', margin: '0.5rem 0' }}>
						<li>Collections : Users, Media, Posts, Categories</li>
						<li>Global : Landing Page (page d&apos;accueil)</li>
						<li>Sauvegardez en brouillon avant de publier</li>
					</ul>
				</div>

				<div style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--theme-elevation-150)', background: 'var(--theme-elevation-50)' }}>
					<h3 style={{ marginTop: 0, fontSize: '1.125rem', fontWeight: 500 }}>Blog &amp; Médias</h3>
					<p style={{ fontSize: '0.875rem', color: 'var(--theme-elevation-600)' }}>
						Création d&apos;articles, upload de médias et bonnes pratiques SEO.
					</p>
					<ul style={{ fontSize: '0.875rem', paddingLeft: '1.25rem', margin: '0.5rem 0' }}>
						<li>Remplissez toujours le texte alternatif des images</li>
						<li>Utilisez des titres descriptifs pour le SEO</li>
						<li>Prévisualisez avant de publier</li>
					</ul>
				</div>

				<div style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--theme-elevation-150)', background: 'var(--theme-elevation-50)' }}>
					<h3 style={{ marginTop: 0, fontSize: '1.125rem', fontWeight: 500 }}>Analytics (Umami)</h3>
					<p style={{ fontSize: '0.875rem', color: 'var(--theme-elevation-600)' }}>
						Lecture des tableaux de bord et métriques clés.
					</p>
					<ul style={{ fontSize: '0.875rem', paddingLeft: '1.25rem', margin: '0.5rem 0' }}>
						<li>Visiteurs uniques vs pages vues</li>
						<li>Sources de trafic (référents)</li>
						<li>Pages les plus consultées</li>
					</ul>
					<a
						href="https://umami.wadefade.fr/share/8WhySQrFsmBwyGnf"
						target="_blank"
						rel="noreferrer noopener"
						style={{ fontSize: '0.875rem', color: 'var(--theme-success-500)', textDecoration: 'none' }}
					>
						Ouvrir Umami →
					</a>
				</div>
			</div>

			<div style={{ marginTop: '1.5rem' }}>
				<a
					href="/admin"
					style={{ fontSize: '0.875rem', color: 'var(--theme-elevation-600)', textDecoration: 'none' }}
				>
					← Retour au Dashboard
				</a>
			</div>
		</div>
	)
}
