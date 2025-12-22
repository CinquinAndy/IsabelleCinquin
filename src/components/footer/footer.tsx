import Link from 'next/link'

interface FooterProps {
	settings?: {
		email?: string | null
		phone?: string | null
	} | null
}

export function Footer({ settings }: FooterProps) {
	const currentYear = new Date().getFullYear()

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
							<a href={`mailto:${settings.email}`} className="hover:opacity-80 transition-opacity">
								{settings.email}
							</a>
						)}
						{settings?.phone && (
							<a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hover:opacity-80 transition-opacity">
								{settings.phone}
							</a>
						)}
					</div>
				</div>

				<div className="mt-6 pt-6 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-70">
					<p>
						&copy; {currentYear} Nounou Sciez - Site développé par{' '}
						<a
							href="https://andy-cinquin.fr"
							target="_blank"
							rel="noopener noreferrer"
							className="underline hover:opacity-80"
						>
							Cinquin Andy
						</a>
					</p>
					<Link href="/mentions-legales" className="hover:opacity-80 transition-opacity">
						Mentions légales
					</Link>
				</div>
			</div>
		</footer>
	)
}
