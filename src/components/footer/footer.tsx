import Link from 'next/link'
import { AnneeCourante } from './annee-courante'

interface FooterProps {
	settings?: {
		email?: string | null
		phone?: string | null
	} | null
}

// Même valeur côté serveur et côté client (next.config.mjs, env.ANNEE_BUILD) : pas d'écart à l'hydratation.
const ANNEE_BUILD = Number(process.env.ANNEE_BUILD) || new Date().getFullYear()

export function Footer({ settings }: FooterProps) {
	return (
		<footer className="section-dark py-8 px-4">
			<div className="max-w-5xl mx-auto">
				<div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
					<div>
						<h2 className="text-xl font-bold">Nounou Sciez</h2>
						<p className="text-sm opacity-80 mt-1">Isabelle Cinquin - Assistante Maternelle</p>
					</div>

					<div className="flex flex-col md:flex-row items-center gap-4 text-sm">
						{settings?.email && (
							<Link href={`mailto:${settings.email}`} className="hover:opacity-80 transition-opacity">
								{settings.email}
							</Link>
						)}
						{settings?.phone && (
							<Link href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hover:opacity-80 transition-opacity">
								{settings.phone}
							</Link>
						)}
					</div>
				</div>

				<div className="mt-6 pt-6 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-70">
					<p>
						&copy; <AnneeCourante anneeServeur={ANNEE_BUILD} /> Nounou Sciez - Site développé par{' '}
						<Link
							href="https://andy-cinquin.fr"
							target="_blank"
							rel="noopener noreferrer"
							className="underline hover:opacity-80"
						>
							Cinquin Andy
						</Link>
					</p>
					<Link href="/mentions-legales" className="hover:opacity-80 transition-opacity">
						Mentions légales
					</Link>
				</div>
			</div>
		</footer>
	)
}
