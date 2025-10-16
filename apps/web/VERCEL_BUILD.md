# 🚀 Vercel Build Optimization

## Build Intelligente per Monorepo

Questo progetto usa un **Ignored Build Step** per evitare build inutili su Vercel quando le modifiche non riguardano il frontend.

## Come Funziona

Lo script `check-build.sh` viene eseguito **prima di ogni build** su Vercel e decide se procedere o meno:

### ✅ Build Attivato Quando Modifichi:

- `apps/web/**` - Qualsiasi file nel frontend
- `packages/db/**` - Il package database (web dipende da `@repo/db`)
- `package.json` - Root workspace config
- `bun.lock` - Lockfile dipendenze
- `tsconfig.json` - TypeScript config root

### ⏭️ Build Skippato Quando Modifichi:

- `apps/api/**` - Solo backend
- `*.md` - File di documentazione
- Altri file non rilevanti per il frontend

## Esempio Pratico

```bash
# ❌ Questo NON triggera build su Vercel
git add apps/api/src/index.ts
git commit -m "fix: API endpoint"
git push origin main
# → Vercel skippa il build

# ✅ Questo triggera build su Vercel
git add apps/web/src/app/page.tsx
git commit -m "feat: new homepage"
git push origin main
# → Vercel builda

# ✅ Anche questo triggera build (web dipende da db)
git add packages/db/src/schema.ts
git commit -m "feat: add user table"
git push origin main
# → Vercel builda
```

## Configurazione

### vercel.json
```json
{
  "ignoreCommand": "bash check-build.sh"
}
```

### check-build.sh
Script che verifica i file cambiati usando:
- `VERCEL_GIT_PREVIOUS_SHA` - Commit precedente
- `VERCEL_GIT_COMMIT_SHA` - Commit attuale
- `git diff` - Per ottenere i file modificati

## Benefici

- ⚡ **Tempo**: Skippa build inutili (risparmio ~2-3 minuti per deploy API)
- 💰 **Costi**: Risparmia build minutes su Vercel
- 🌍 **Sostenibilità**: Meno risorse consumate
- 📊 **Chiarezza**: Log più puliti, solo build rilevanti

## Test Locale

Puoi testare lo script localmente (eseguirà sempre il build senza variabili Vercel):

```bash
cd apps/web
bash check-build.sh
echo $? # 1 = builda, 0 = skippa
```

## Troubleshooting

### Script non viene eseguito

Verifica che lo script sia eseguibile:
```bash
chmod +x apps/web/check-build.sh
```

### Build sempre skippato/sempre eseguito

Controlla i log su Vercel per vedere l'output dello script:
- Dashboard → Deployment → Build Logs → Cerca "Checking if build is needed"

### Modificare i path rilevanti

Edita la variabile `RELEVANT_PATHS` in `check-build.sh`:

```bash
RELEVANT_PATHS=(
  "apps/web/"
  "packages/db/"
  "package.json"
  "bun.lock"
  "tsconfig.json"
  # Aggiungi altri path qui
)
```

## Disabilitare Feature

Se vuoi disabilitare questa ottimizzazione:

1. Rimuovi `"ignoreCommand"` da `vercel.json`
2. Oppure modifica lo script per ritornare sempre `exit 1`

---

**Nota**: Questa feature funziona solo su Vercel. In sviluppo locale o altri ambienti, il build viene sempre eseguito.

