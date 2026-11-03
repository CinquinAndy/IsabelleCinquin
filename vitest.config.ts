import path from 'node:path'
import { defineConfig } from 'vitest/config'

const alias = {
	'@payload-config': path.resolve(import.meta.dirname, 'src/payload.config.ts'),
	'@': path.resolve(import.meta.dirname, 'src'),
}

// Deux projets :
// - unitaires : logique pure et routes API, sans base ni réseau (bun run test:unit) ;
// - integration : Payload réel sur la base jetable semée avec l'instantané (bun run test:integration, lancé par
//   e2e/ci.sh dans le conteneur, après le semis). Jamais sur la base de production.
export default defineConfig({
	resolve: { alias },
	test: {
		projects: [
			{
				resolve: { alias },
				test: { name: 'unitaires', include: ['src/**/*.test.ts'], environment: 'node' },
			},
			{
				resolve: { alias },
				test: {
					name: 'integration',
					include: ['tests/integration/**/*.int.test.ts'],
					environment: 'node',
					testTimeout: 60_000,
					hookTimeout: 120_000,
					fileParallelism: false,
				},
			},
		],
	},
})
