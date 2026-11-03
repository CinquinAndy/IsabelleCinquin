#!/usr/bin/env bash
# Lance e2e/ci.sh en local dans les mêmes conditions que la CI : image officielle de Playwright (version de
# @playwright/test), Postgres 17 jetable (hôte « postgres ») et faux S3 (hôte « s3 »), sur un réseau Docker dédié.
#   bun run test:e2e                         tous les tests
#   bun run test:e2e -- --grep accueil       arguments transmis à Playwright
#   bun run test:e2e:maj-captures            régénère les captures de référence (à relire avant de committer)
# Prérequis : Docker, et les dépendances installées (bun install) : node_modules est monté dans le conteneur.
set -euo pipefail
cd "$(dirname "$0")/.."

VERSION=$(node -p "require('./package.json').devDependencies['@playwright/test']")
IMAGE="mcr.microsoft.com/playwright:v${VERSION}-noble"
ID="isabelle-e2e-$$"
BUN=$(command -v bun)

nettoyer() { docker rm -f "$ID-db" "$ID-s3" > /dev/null 2>&1 || true; docker network rm "$ID" > /dev/null 2>&1 || true; }
trap nettoyer EXIT

docker network create "$ID" > /dev/null
docker run -d --rm --name "$ID-db" --network "$ID" --network-alias postgres \
	-e POSTGRES_PASSWORD=e2e -e POSTGRES_DB=e2e postgres:17-alpine > /dev/null
docker run -d --rm --name "$ID-s3" --network "$ID" --network-alias s3 \
	-e COM_ADOBE_TESTING_S3MOCK_STORE_INITIAL_BUCKETS=isabelle-e2e adobe/s3mock:4.11.0 > /dev/null

until docker exec "$ID-db" pg_isready -U postgres -d e2e > /dev/null 2>&1; do sleep 1; done

docker run --rm --network "$ID" --ipc=host \
	--user "$(id -u):$(id -g)" -e HOME=/tmp -e CI="${CI:-}" -e E2E_WORKERS="${E2E_WORKERS:-}" \
	-v "$PWD:/app" -w /app -v "$BUN:/usr/local/bin/bun:ro" \
	"$IMAGE" bash e2e/ci.sh "$@"
