#!/usr/bin/env bash
# Deploy ONLY to Kohlkat's Vercel account. Refuse Zaraa / Skyscrapersax teams.
set -euo pipefail
cd "$(dirname "$0")/.."

TOKEN="${KOHLKAT_VERCEL_TOKEN:-${VERCEL_TOKEN:-}}"
if [[ -z "${TOKEN}" ]]; then
  echo "Missing Kohlkat Vercel token."
  echo "Set KOHLKAT_VERCEL_TOKEN (preferred) or VERCEL_TOKEN from Kohlkat's Vercel account,"
  echo "then re-run: npm run deploy:kohlkat"
  exit 2
fi

WHO=$(VERCEL_TOKEN="$TOKEN" vercel whoami 2>/dev/null || true)
echo "vercel whoami => ${WHO}"

case "${WHO}" in
  *zaraa*|*Zaraa*|*skyscraper*|*Skyscraper*|*zaraagoddess*)
    echo "Refusing deploy: authenticated as Zaraa/Skyscrapersax (${WHO})."
    echo "Use Kohlkat's Vercel token instead."
    exit 3
    ;;
esac

# Prefer explicit Kohlkat project name
PROJECT_NAME="${VERCEL_PROJECT_NAME:-kohlkat-interactive-resume}"
SCOPE_ARGS=()
if [[ -n "${VERCEL_ORG_ID:-}" ]]; then
  SCOPE_ARGS+=(--scope "$VERCEL_ORG_ID")
fi

echo "Deploying project=${PROJECT_NAME} (prod test site)…"
VERCEL_TOKEN="$TOKEN" vercel pull --yes --environment=production "${SCOPE_ARGS[@]}" || true
VERCEL_TOKEN="$TOKEN" vercel deploy --prod --yes --name "$PROJECT_NAME" "${SCOPE_ARGS[@]}"
