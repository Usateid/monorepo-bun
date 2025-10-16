# 🚀 Guida al Deployment

Questa guida ti aiuterà a deployare il tuo monorepo su Vercel (frontend) e Render (API).

## 📋 Prerequisiti

- Account [Vercel](https://vercel.com)
- Account [Render](https://render.com)
- Database PostgreSQL (consigliato: [Neon](https://neon.tech) o [Supabase](https://supabase.com))
- Repository Git (GitHub, GitLab, o Bitbucket)

---

## 🎨 Deploy Frontend su Vercel

### Passo 1: Prepara il progetto

1. Assicurati che il codice sia pushato su GitHub/GitLab/Bitbucket
2. Verifica che il file `vercel.json` sia presente in `apps/web/`

### Passo 2: Deploy su Vercel

1. Vai su [vercel.com](https://vercel.com) e fai login
2. Click su **"Add New..."** → **"Project"**
3. Importa il tuo repository
4. Configura il progetto:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `bun run build`
   - **Output Directory**: `.next`
   - **Install Command**: `bun install`

### Passo 3: Variabili d'ambiente su Vercel

Aggiungi queste variabili d'ambiente nel dashboard Vercel:

```
NEXT_PUBLIC_API_URL=https://tua-api.onrender.com
```

> ⚠️ **Nota**: Aggiungerai l'URL reale delle API dopo averle deployate su Render (vedi sotto)

### 🚀 Build Ottimizzato per Monorepo

Il progetto include uno script intelligente (`check-build.sh`) che **skippa il build su Vercel** quando le modifiche sono solo in altre parti del monorepo (es. `apps/api`).

**Come funziona:**
- ✅ Builda se modifichi `apps/web/`
- ✅ Builda se modifichi `packages/db/` (web dipende da questo)
- ✅ Builda se modifichi file root come `package.json`, `bun.lock`
- ⏭️ **Skippa** se modifichi solo `apps/api/`
- ⏭️ **Skippa** se modifichi solo README o altri file non rilevanti

Questo ti fa risparmiare:
- ⚡ Tempo di build
- 💰 Build minutes su Vercel
- 🌍 Consumi energetici

### Passo 4: Deploy

Click su **"Deploy"** e aspetta che Vercel completi il build!

---

## 🔥 Deploy API su Render

### Metodo 1: Deploy con Dockerfile (Consigliato)

#### Passo 1: Prepara il progetto

I file necessari sono già stati creati:
- `apps/api/Dockerfile`
- `apps/api/.dockerignore`
- `apps/api/render.yaml` (opzionale, per blueprint)

#### Passo 2: Crea Web Service su Render

1. Vai su [render.com](https://render.com) e fai login
2. Click su **"New +"** → **"Web Service"**
3. Connetti il tuo repository Git
4. Configura il servizio:
   - **Name**: `hono-api` (o il nome che preferisci)
   - **Region**: Europe (Frankfurt) o la più vicina
   - **Branch**: `main` (o il tuo branch principale)
   - **Root Directory**: ⚠️ **LASCIA VUOTO** o metti solo `.` (root del progetto)
   - **Dockerfile Path**: `apps/api/Dockerfile`
   - **Runtime**: Docker
   - **Plan**: Free (o superiore se necessario)

> ⚠️ **CRITICO**: Il campo "Root Directory" deve essere **VUOTO** o contenere solo `.`  
> **NON** impostare `apps/api` come Root Directory o il build fallirà con l'errore "not found"!  
> Il Docker context deve essere la root del progetto per permettere l'accesso al package `@repo/db` del monorepo.

> 💡 **Alternativa**: Usa il Blueprint caricando il file `apps/api/render.yaml` che configurerà tutto automaticamente.

📖 Vedi `apps/api/RENDER_SETUP.md` per istruzioni dettagliate e troubleshooting.

### 🚀 Build Ottimizzato per Monorepo

Il file `render.yaml` include un **Build Filter** che evita deploy inutili su Render:

**Come funziona:**
- ✅ Deploya se modifichi `apps/api/` o `packages/db/`
- ⏭️ **Skippa** se modifichi solo `apps/web/` (nessun impatto sull'API)
- ⏭️ **Skippa** se modifichi solo documentazione (`.md`)

Questo risparmia:
- ⚡ Tempo di build (~3-5 minuti per deploy)
- 💰 Build hours su Render (750h/mese nel free tier)
- 🌍 Risorse computazionali

> 💡 **Raccomandazione**: Usa il **Blueprint** (opzione in `render.yaml`) per attivare automaticamente il Build Filter!

#### Passo 3: Variabili d'ambiente su Render

Aggiungi queste variabili d'ambiente nel dashboard Render:

```
DATABASE_URL=postgresql://user:password@host:5432/dbname
PORT=3001
```

> 💡 **Tip**: Se usi Neon.tech, copia il connection string dal loro dashboard

#### Passo 4: Deploy

Click su **"Create Web Service"** e aspetta il deploy!

#### Passo 5: Aggiorna Vercel con l'URL delle API

1. Dopo che Render ha completato il deploy, copia l'URL del servizio (es. `https://hono-api.onrender.com`)
2. Torna su Vercel → Settings → Environment Variables
3. Aggiorna `NEXT_PUBLIC_API_URL` con il nuovo URL
4. Redeploy il frontend su Vercel

---

### Metodo 2: Deploy diretto con Bun (Alternativo)

Se preferisci non usare Docker:

1. Seleziona **Runtime**: Native
2. **Build Command**: `bun install`
3. **Start Command**: `bun run start`
4. Aggiungi variabile d'ambiente:
   ```
   BUN_VERSION=latest
   ```

---

## 🗄️ Setup Database (Neon consigliato)

### Opzione 1: Neon (Consigliato - Free tier generoso)

1. Vai su [neon.tech](https://neon.tech)
2. Crea un nuovo progetto
3. Copia il **Connection String**
4. Aggiungi la variabile d'ambiente su Render:
   ```
   DATABASE_URL=postgresql://...
   ```

### Opzione 2: Supabase

1. Vai su [supabase.com](https://supabase.com)
2. Crea un nuovo progetto
3. Vai su Settings → Database → Connection string
4. Copia la connection string e aggiungila su Render

### Migrazione Database

Per eseguire le migrazioni su produzione:

```bash
# Opzione 1: Da locale con DATABASE_URL di produzione
DATABASE_URL=your_production_url bun run db:push

# Opzione 2: Aggiungi script nel package.json
"db:migrate": "drizzle-kit push"
```

---

## 🔒 Sicurezza e Best Practices

### CORS Configuration

Aggiorna `apps/api/src/index.ts` per permettere richieste solo dal tuo dominio Vercel:

```typescript
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use('/*', cors({
  origin: [
    'https://tuo-dominio.vercel.app',
    'http://localhost:3000' // per sviluppo locale
  ],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ... resto del codice
```

Installa il middleware CORS:
```bash
bun add hono/cors
```

### Variabili d'ambiente sensibili

- ❌ **MAI** committare file `.env` nel repository
- ✅ **SEMPRE** usare `.env.example` per documentare le variabili necessarie
- ✅ Configura variabili sensibili solo nei dashboard di Vercel e Render

---

## 🧪 Testing del Deploy

### Test delle API

```bash
# Test endpoint base
curl https://tua-api.onrender.com/

# Test endpoint users
curl https://tua-api.onrender.com/users
```

### Test del Frontend

Visita il tuo dominio Vercel e verifica che tutto funzioni correttamente.

---

## 📊 Monitoring

### Render
- Dashboard → Web Service → Logs per vedere i log in tempo reale
- Metrics per monitorare CPU, memoria, e richieste

### Vercel
- Dashboard → Analytics per vedere traffico e performance
- Logs per debug dei problemi

---

## 🐛 Troubleshooting

### Problema: "Cannot find module '@repo/db'"

**Soluzione**: ✅ Questo problema è già risolto! Il `Dockerfile` e `render.yaml` sono configurati correttamente per gestire il monorepo.

Se riscontri ancora questo errore, verifica che:
1. Il Docker context sia impostato a `.` (root del progetto)
2. Il Dockerfile path sia `./apps/api/Dockerfile`
3. Il file `.dockerignore` nella root non escluda cartelle necessarie come `packages/db`

### Problema: "Database connection failed"

**Soluzione**:
- Verifica che `DATABASE_URL` sia configurato correttamente su Render
- Assicurati che il database sia accessibile pubblicamente
- Per Neon, usa il connection string "pooled"

### Problema: "Free tier su Render dorme dopo 15 minuti"

**Soluzione**:
- Upgrade al piano Starter ($7/mese)
- Oppure usa un servizio di "keep-alive" per pinger l'API ogni 10 minuti

---

## 💰 Costi

### Free Tier

- **Vercel**: Free (100 GB bandwidth/mese, deploy illimitati)
- **Render**: Free (750 ore/mese, si spegne dopo 15 min di inattività)
- **Neon**: Free (3 GB storage, 500 MB database, autosleep dopo 5 min)

### Per Produzione

- **Vercel Pro**: $20/mese (team collaboration, analytics avanzate)
- **Render Starter**: $7/mese (sempre attivo, più risorse)
- **Neon Scale**: Pay-as-you-go (da $19/mese)

---

## 📊 Riepilogo Deployment Intelligente

Grazie ai **Build Filter** configurati, il sistema deploya solo dove necessario:

| Scenario | Render (API) | Vercel (Frontend) | Risparmio |
|----------|--------------|-------------------|-----------|
| 🔧 Push solo `apps/api/` | ✅ Deploy | ⏭️ Skip | ~2-3 min |
| 🎨 Push solo `apps/web/` | ⏭️ Skip | ✅ Build | ~3-5 min |
| 📦 Push `packages/db/` | ✅ Deploy | ✅ Build | - |
| 📝 Push solo `*.md` | ⏭️ Skip | ⏭️ Skip | ~5-8 min |
| 🚀 Push entrambi | ✅ Deploy | ✅ Build | - |

**Vantaggi:**
- ⚡ **Deploy più veloci** - Solo ciò che serve viene ribuildata
- 💰 **Risparmio risorse** - Meno build minutes consumati
- 🌍 **Sostenibilità** - Meno energia sprecata
- 📊 **Log più puliti** - Deploy solo quando rilevante

---

## 🎉 Congratulazioni!

Hai deployato con successo il tuo monorepo! 

### Prossimi passi:

1. ✅ Configura un dominio custom su Vercel
2. ✅ Imposta CI/CD per deploy automatici
3. ✅ Aggiungi monitoring e error tracking (es. Sentry)
4. ✅ Implementa rate limiting e autenticazione sulle API

---

## 📚 Risorse Utili

- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Hono Docs](https://hono.dev)
- [Next.js Docs](https://nextjs.org/docs)
- [Bun Docs](https://bun.sh/docs)

---

**Problemi o domande?** Apri un issue nel repository! 🚀

