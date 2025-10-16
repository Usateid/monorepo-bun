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
docker build -f apps/api/Dockerfile -t hono-api .

# Esegui il container (assicurati di avere un DATABASE_URL valido)
docker run -p 3001:3001 -e DATABASE_URL="postgresql://..." hono-api

# Test dell'endpoint
curl http://localhost:3001/
```

> ⚠️ **Nota**: Il Dockerfile deve essere eseguito dalla root del monorepo perché ha bisogno di accedere al package `@repo/db`.

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
