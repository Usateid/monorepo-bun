# 🚀 Next.js + Hono Monorepo con Bun

Monorepo full-stack moderno con Next.js 15, Hono, PostgreSQL, e Bun.

## 📦 Struttura del Progetto

```
.
├── apps/
│   ├── web/          # Frontend Next.js 15 + React 19
│   └── api/          # Backend Hono API
├── packages/
│   └── db/           # Database condiviso (Drizzle ORM)
└── package.json      # Root workspace
```

## 🚀 Quick Start

### 1. Installa le dipendenze

```bash
bun install
```

### 2. Configura le variabili d'ambiente

Crea un file `.env` nella root del progetto:

```env
# Database (Neon, Supabase, o altro PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# API
FRONTEND_URL=http://localhost:3000
PORT=3001

# Next.js
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Esegui le migrazioni del database

```bash
cd packages/db
bun run db:push
```

### 4. Avvia il progetto

```bash
# Avvia solo il frontend
bun run web

# Avvia solo le API
bun run api

# Oppure avvia entrambi in terminali separati
```

- Frontend: http://localhost:3000
- API: http://localhost:3001

## 🛠️ Stack Tecnologico

### Frontend
- **Next.js 15** - Framework React con App Router
- **React 19** - Libreria UI
- **Tailwind CSS 4** - Styling
- **TypeScript** - Type safety

### Backend
- **Hono** - Framework web veloce e leggero
- **Bun** - Runtime JavaScript/TypeScript
- **Drizzle ORM** - Type-safe database ORM

### Database
- **PostgreSQL** - Database relazionale
- **Neon/Supabase** - Hosting database (consigliato)

## 📚 Comandi Utili

```bash
# Sviluppo
bun run web          # Avvia frontend
bun run api          # Avvia API

# Database
cd packages/db
bun run db:push      # Push schema al database
bun run db:studio    # Apri Drizzle Studio (UI per DB)

# Build (frontend)
cd apps/web
bun run build
```

## 🚀 Deploy

Vedi [DEPLOYMENT.md](./DEPLOYMENT.md) per istruzioni complete su come deployare su:
- **Frontend**: Vercel
- **API**: Render
- **Database**: Neon o Supabase

## 📖 Documentazione

- [Deploy Guide](./DEPLOYMENT.md) - Guida completa al deployment
- [Frontend README](./apps/web/README.md)
- [API README](./apps/api/README.md)
- [Database README](./packages/db/README.md)

## 🤝 Contributing

Questo è un template/starter kit. Sentiti libero di forkarlo e modificarlo per le tue esigenze!

## 📝 Note

- Questo progetto usa **Bun** come runtime. Assicurati di averlo installato: https://bun.sh
- Per produzione, Bun è stabile ma più giovane di Node.js - testa accuratamente!
- Il monorepo usa Bun workspaces per gestire le dipendenze condivise

## 🔗 Link Utili

- [Bun Docs](https://bun.sh/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Hono Docs](https://hono.dev)
- [Drizzle ORM Docs](https://orm.drizzle.team)

---

Made with ❤️ using Bun
