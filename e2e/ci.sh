#!/usr/bin/env bash
# Chaîne complète des tests de bout en bout, à lancer DANS le conteneur Playwright (CI, ou en local via e2e/docker.sh).
# Prérequis : une base Postgres vide (hôte « postgres ») et un faux S3 (hôte « s3 », port 9090) joignables.
#   1. semis de la base jetable avec l'instantané du contenu (e2e/instantane/semer.ts)
#   2. build de production (migrations comprises, sur cette base jetable)
#   3. Playwright (fonctionnel + visuel), arguments transmis tels quels (ex. --update-snapshots)
set -euo pipefail
cd "$(dirname "$0")/.."

export TZ=Europe/Paris
export NEXT_TELEMETRY_DISABLED=1
# Aucune vraie valeur : base, stockage et secret n'existent que le temps des tests.
export DATABASE_URI="${DATABASE_URI:-postgres://postgres:e2e@postgres:5432/e2e}"
export PAYLOAD_SECRET=e2e-secret-jetable-sans-valeur-reelle
export NEXT_PUBLIC_SERVER_URL=http://localhost:3000
export S3_BUCKET=isabelle-e2e S3_ACCESS_KEY_ID=e2e S3_SECRET_ACCESS_KEY=e2e S3_REGION=us-east-1
export S3_ENDPOINT="${S3_ENDPOINT:-http://s3:9090}" S3_FORCE_PATH_STYLE=true
# Aucun appel externe pendant les tests (hooks Forvoyez, revalidation, Gemini, envoi d'emails).
unset FORVOYEZ_TOKEN REVALIDATE_SECRET GEMINI_API_KEY GOOGLE_GENERATIVE_AI_API_KEY RESEND_API_KEY

echo "▶ Attente du faux S3"
node -e '
const fin = Date.now() + 120000
const essai = () => fetch(process.env.S3_ENDPOINT).then(() => process.exit(0), () => Date.now() > fin ? process.exit(1) : setTimeout(essai, 1000))
essai()'

echo "▶ Semis de la base jetable"
NODE_ENV=development bun x tsx e2e/instantane/semer.ts < /dev/null

echo "▶ Tests d'intégration (Payload réel sur la base jetable)"
bun x vitest run --project integration

echo "▶ Build de production"
bun run build

# Clé factice : la route /api/contact valide la requête avant tout envoi ; les tests n'envoient rien de valide.
export RESEND_API_KEY=re_e2e_factice

echo "▶ Playwright"
bun x playwright test "$@"
