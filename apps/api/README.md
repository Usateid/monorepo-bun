# 🔥 Hono API

API backend costruita con Hono e Bun.

## 🚀 Quick Start

### Sviluppo Locale

```bash
# Dalla root del monorepo
bun run api

# Oppure da questa directory
cd apps/api
bun run dev
```

### Variabili d'Ambiente

Crea un file `.env` nella root del progetto:

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
FRONTEND_URL=http://localhost:3000
PORT=3001
```

## 📦 Deploy

Vedi [DEPLOYMENT.md](../../DEPLOYMENT.md) nella root del progetto per istruzioni complete sul deploy su Render.

### Test Docker Build Locale

Per testare il build Docker localmente prima del deploy:

```bash
# Dalla root del monorepo
bun run docker:build

# Esegui il container (assicurati di avere un DATABASE_URL valido nel .env)
bun run docker:run

# Oppure build + run in un comando
bun run docker:test

# Test manuale
docker build -f apps/api/Dockerfile -t hono-api .
docker run -p 3001:3001 --env-file .env hono-api

# Test dell'endpoint (in un altro terminale)
curl http://localhost:3001/
```

> ⚠️ **Nota**: Il Dockerfile deve essere eseguito dalla root del monorepo perché ha bisogno di accedere al package `@repo/db`.

### Deploy su Render

Vedi il file `RENDER_SETUP.md` in questa directory per istruzioni dettagliate sulla configurazione di Render.

**⚠️ IMPORTANTE**: Su Render, assicurati che il campo "Root Directory" sia **VUOTO** o contenga solo `.` - NON impostarlo su `apps/api`!

## 🛠️ Stack Tecnologico

- **Runtime**: Bun
- **Framework**: Hono
- **Database**: PostgreSQL (Drizzle ORM)
- **Deploy**: Render (con Docker)

## 📝 Endpoints

- `GET /` - Health check
- `GET /users` - Lista tutti gli utenti

## 🔒 Sicurezza

- CORS configurato per accettare solo richieste dal frontend
- Variabili d'ambiente per configurazione sensibile
