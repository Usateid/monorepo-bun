#!/bin/bash

# Script per decidere se Vercel deve buildare o no
# Exit 1 = Procedi con il build
# Exit 0 = Skippa il build

echo "🔍 Checking if build is needed..."

# Se non siamo su Vercel, builda sempre (per sviluppo locale)
if [ -z "$VERCEL" ]; then
  echo "✅ Not on Vercel, proceeding with build"
  exit 1
fi

# Se è il primo deploy o non ci sono commit precedenti, builda sempre
if [ -z "$VERCEL_GIT_PREVIOUS_SHA" ]; then
  echo "✅ First deploy or no previous commit, proceeding with build"
  exit 1
fi

echo "📊 Comparing $VERCEL_GIT_PREVIOUS_SHA...$VERCEL_GIT_COMMIT_SHA"

# Verifica i file cambiati tra il commit precedente e quello attuale
# Filtriamo solo i path rilevanti per apps/web
CHANGED_FILES=$(git diff --name-only $VERCEL_GIT_PREVIOUS_SHA $VERCEL_GIT_COMMIT_SHA)

echo "Changed files:"
echo "$CHANGED_FILES"

# Path che triggano il build di apps/web
RELEVANT_PATHS=(
  "apps/web/"
  "packages/db/"         # web dipende da @repo/db
  "package.json"         # root package.json (workspace)
  "bun.lock"             # lockfile
  "tsconfig.json"        # root tsconfig
)

# Controlla se ci sono modifiche nei path rilevanti
for path in "${RELEVANT_PATHS[@]}"; do
  if echo "$CHANGED_FILES" | grep -q "^$path"; then
    echo "✅ Changes detected in $path - proceeding with build"
    exit 1
  fi
done

echo "⏭️  No relevant changes detected - skipping build"
exit 0

