import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Année du build, inlinée à l'identique dans les bundles serveur et client : c'est l'année du HTML prérendu,
	// que le pied de page remplace par l'année en cours après l'hydratation (src/components/footer/annee-courante.tsx).
	env: {
		ANNEE_BUILD: String(new Date().getFullYear()),
	},
	outputFileTracingRoot: import.meta.dirname,
	webpack: webpackConfig => {
		webpackConfig.resolve.extensionAlias = {
			'.cjs': ['.cts', '.cjs'],
			'.js': ['.ts', '.tsx', '.js', '.jsx'],
			'.mjs': ['.mts', '.mjs'],
		}

		return webpackConfig
	},
	async headers() {
		await Promise.resolve()
		return [
			{
				source: '/(.*)',
				headers: [
					{
						value: 'nosniff',
						key: 'X-Content-Type-Options',
					},
					{
						value: 'strict-origin-when-cross-origin',
						key: 'Referrer-Policy',
					},
					{
						value: '1; mode=block',
						key: 'X-XSS-Protection',
					},
				],
			},
		]
	},
	trailingSlash: false,
	images: {
		remotePatterns: [
			{ protocol: 'http', hostname: 'localhost' },
			{ protocol: 'http', hostname: '127.0.0.1' },
			{ protocol: 'https', hostname: '*.isabelle-cinquin.fr' },
			{ protocol: 'https', hostname: 'isabelle-cinquin.fr' },
			{ protocol: 'https', hostname: '*.unsplash.com' },
		],
		qualities: [75, 90, 100],
	},
	experimental: {
		// TypeScript 7 (compilateur natif) n'a plus l'API JavaScript : Next vérifie les types en lançant tsc.
		useTypeScriptCli: true,
		serverActions: {
			bodySizeLimit: '10mb',
		},
	},
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
