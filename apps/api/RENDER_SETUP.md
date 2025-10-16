# 🚀 Configurazione Render per apps/api

## ⚠️ IMPORTANTE: Configurazione Docker Context

Per questo monorepo, è **fondamentale** che il Docker context sia impostato alla **root del progetto**, non alla directory `apps/api`.

## 📝 Configurazione Manuale su Render

Quando crei o modifichi il Web Service su Render, usa queste impostazioni:

### Settings Base
- **Name**: `hono-api` (o il nome che preferisci)
- **Region**: `Frankfurt (EU Central)` o la più vicina
- **Branch**: `main`
- **Runtime**: `Docker`

### 🔴 SETTINGS CRITICI - Docker

**Opzione 1: Root Directory vuota (RACCOMANDATO)**
- **Root Directory**: Lascia **VUOTO** o metti solo un punto `.`
- **Dockerfile Path**: `apps/api/Dockerfile`

**Opzione 2: Usando il render.yaml**
- Usa il blueprint: seleziona il file `apps/api/render.yaml`
- Render leggerà automaticamente le configurazioni corrette

### Environment Variables

Aggiungi queste variabili d'ambiente nel dashboard:

```
DATABASE_URL=postgresql://user:password@host:5432/dbname
PORT=3001
FRONTEND_URL=https://tuo-frontend.vercel.app
```

## 🐛 Troubleshooting

### Errore: "failed to compute cache key: '/apps/api': not found"

**Causa**: Il Docker context è impostato su `apps/api` invece della root del progetto.

**Soluzione**:
1. Vai su Settings del tuo Web Service su Render
2. Trova il campo **"Root Directory"**
3. **CANCELLA** il valore o metti solo `.`
4. Assicurati che **"Dockerfile Path"** sia `apps/api/Dockerfile`
5. Salva e rideploy

### Verifica Configurazione Corretta

Nelle impostazioni del servizio su Render, dovresti vedere:
- ✅ Root Directory: vuoto o `.`
- ✅ Dockerfile Path: `apps/api/Dockerfile`
- ✅ Runtime: Docker

Se vedi:
- ❌ Root Directory: `apps/api`

Allora **DEVI** cambiarlo!

## 📸 Screenshot Configurazione Corretta

```
┌─────────────────────────────────────────┐
│ Root Directory:                          │
│ [________________] ← vuoto o solo "."   │
│                                          │
│ Dockerfile Path:                         │
│ [apps/api/Dockerfile]                   │
│                                          │
│ Docker Build Context Path:               │
│ [.] ← root del progetto                 │
└─────────────────────────────────────────┘
```

## 🎯 Come Funziona il Build

1. Render clona l'intero repository
2. Usa il Dockerfile in `apps/api/Dockerfile`
3. Il build context è la root (così può accedere a `packages/db`)
4. Copia l'intero monorepo nel container
5. Installa tutte le dipendenze (incluso `@repo/db`)
6. Avvia l'app dalla directory `apps/api`

## 🔄 Deploy con Blueprint (Raccomandato)

**Usa il file `render.yaml` per configurazione automatica con Build Filter!**

1. Su Render, click su **"New +"** → **"Blueprint"**
2. Connetti il repository
3. Seleziona il file `apps/api/render.yaml`
4. Render configurerà automaticamente tutto, incluso il **Build Filter**
5. Aggiungi le variabili d'ambiente e deploy!

### 🚀 Build Filter (Ottimizzazione Monorepo)

Il `render.yaml` include un **Build Filter** che evita deploy inutili:

- ✅ **Deploya** se modifichi `apps/api/` o `packages/db/`
- ⏭️ **Skippa** se modifichi solo `apps/web/`
- ⏭️ **Skippa** se modifichi solo file `.md` o documentazione

Questo risparmia:
- ⚡ Tempo di build (evita build di ~3-5 minuti)
- 💰 Build hours su Render Free tier (750h/mese)
- 🌍 Risorse computazionali

### Configurazione Manuale del Build Filter

Se hai già creato il servizio senza Blueprint, puoi aggiungere il Build Filter manualmente:

1. Dashboard Render → tuo Web Service
2. **Settings** → **Build & Deploy**
3. Cerca **"Auto-Deploy"** o **"Build Filter"** (dipende dal piano)
4. Aggiungi questi path:

**Include Paths** (deploya solo se cambiano):
```
apps/api/**
packages/db/**
package.json
bun.lock
apps/api/Dockerfile
```

**Ignore Paths** (non deployare se cambiano solo questi):
```
apps/web/**
**.md
```

5. Salva le impostazioni

> ⚠️ **Nota**: Build Filter potrebbe non essere disponibile su tutti i piani. Se non vedi l'opzione, considera:
> - Usare il Blueprint con `render.yaml` (raccomandato)
> - Disabilitare Auto-Deploy e triggare deploy manualmente via webhook solo quando necessario

## ✅ Test del Deploy

Dopo il deploy, testa gli endpoint:

```bash
# Health check
curl https://tua-api.onrender.com/

# Dovrebbe restituire:
# {"message":"Alice"}

# Test database
curl https://tua-api.onrender.com/users
```

## 📞 Hai Ancora Problemi?

Se continui ad avere l'errore dopo aver verificato la configurazione:

1. Controlla i logs su Render Dashboard
2. Verifica che il branch su GitHub sia aggiornato
3. Prova a ricreare il servizio da zero usando il render.yaml
4. Contatta il supporto Render mostrando questo errore specifico

---

💡 **Tip**: Salva queste configurazioni come Blueprint su Render per riutilizzarle facilmente in futuro!

