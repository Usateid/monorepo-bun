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
   - **Root Directory**: `apps/api`
   - **Runtime**: Docker
   - **Plan**: Free (o superiore se necessario)

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

**Soluzione**: Nel monorepo, Render potrebbe non risolvere i workspace. Opzioni:

1. **Opzione A**: Build dalla root del monorepo
   - Root Directory: `.` (root del progetto)
   - Start Command: `cd apps/api && bun run start`

2. **Opzione B**: Converti il pacchetto `@repo/db` in un pacchetto npm pubblicato

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

