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
