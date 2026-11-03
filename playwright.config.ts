import { defineConfig, devices } from '@playwright/test'

// Tests de bout en bout et non-régression visuelle, sur le site construit avec l'instantané du contenu
// (e2e/instantane/), jamais sur la production.
//
// Toujours lancés dans l'image Docker officielle de Playwright, en local comme en CI, pour que les captures de
// référence soient produites au pixel près dans le même environnement :
//   bun run test:e2e               → e2e/docker.sh (base, faux S3, semis, build, tests)
//   bun run test:e2e:maj-captures  → idem avec --update-snapshots, à relire avant de committer
// L'image suit la version de @playwright/test (voir e2e/docker.sh et .github/workflows/ci.yml).
const PORT = Number(process.env.PORT || 3000)

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: 0,
	workers: process.env.E2E_WORKERS ? Number(process.env.E2E_WORKERS) : 2,
	timeout: 180_000,
	reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
	snapshotPathTemplate: '{testDir}/__captures__/{projectName}/{arg}{ext}',
	expect: {
		toHaveScreenshot: { maxDiffPixels: 0, threshold: 0, animations: 'disabled', caret: 'hide', scale: 'css' },
	},
	use: {
		baseURL: `http://localhost:${PORT}`,
		locale: 'fr-FR',
		timezoneId: 'Europe/Paris',
		colorScheme: 'light',
		serviceWorkers: 'block',
		trace: 'retain-on-failure',
		launchOptions: {
			// Rendu le plus stable possible d'un lancement à l'autre (WebGL logiciel, pas de lissage sous-pixel).
			args: [
				'--enable-unsafe-swiftshader',
				'--use-angle=swiftshader',
				'--ignore-gpu-blocklist',
				'--font-render-hinting=none',
				'--force-color-profile=srgb',
				'--disable-lcd-text',
				'--disable-threaded-animation',
				'--disable-threaded-scrolling',
				'--disable-checker-imaging',
				'--disable-partial-raster',
				'--disable-gpu-rasterization',
			],
		},
	},
	projects: [
		{
			name: 'bureau',
			use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
		},
		{
			name: 'telephone',
			// Fonctionnel complet sur bureau ; sur téléphone, le visuel et la navigation mobile.
			testMatch: ['visuel.spec.ts', 'navigation.spec.ts'],
			use: {
				...devices['Desktop Chrome'],
				viewport: { width: 390, height: 844 },
				deviceScaleFactor: 1,
				isMobile: true,
				hasTouch: true,
			},
		},
	],
	webServer: {
		command: `bun x next start --port ${PORT}`,
		url: `http://localhost:${PORT}/robots.txt`,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
		stdout: 'ignore',
		stderr: 'pipe',
	},
})
