import { defineConfig, devices } from '@playwright/test'

// Tests de bout en bout contre un site déjà lancé (`bun run build` puis `bun run start`).
// Le build a besoin d'une base Postgres avec du contenu : ne jamais viser la base de production.
// Adresse du site testé : E2E_BASE_URL (par défaut http://localhost:3000).
export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	reporter: 'list',
	use: {
		baseURL: process.env.E2E_BASE_URL || 'http://localhost:3000',
		locale: 'fr-FR',
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
