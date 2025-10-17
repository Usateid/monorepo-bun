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
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Esegui le migrazioni del database

```bash
# Dalla root del progetto
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
- **Better Auth** - Autenticazione moderna

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
bun run web              # Avvia frontend (http://localhost:3000)
bun run api              # Avvia API (http://localhost:3001)

# Database (dalla root)
bun run db:generate      # Genera migrazioni SQL
bun run db:push          # Push schema al database (dev)
bun run db:migrate       # Applica migrazioni (prod)
bun run db:studio        # Apri Drizzle Studio (UI per DB)

# Build (frontend)
cd apps/web
bun run build
```

## 🔐 Autenticazione con Better Auth

Il progetto include **Better Auth** per l'autenticazione:

### Features
- ✅ Login/Registrazione con Email e Password
- ✅ Gestione Sessioni sicure
- ✅ Protezione route automatica con Middleware
- ✅ Hook React per gestire l'autenticazione
- ✅ Pronto per provider sociali (GitHub, Google, etc.)

### Utilizzo Base

```tsx
import { useSession, signIn, signUp, signOut } from "@/lib/auth-client";

// In un componente
const { data: session, isPending } = useSession();

// Login
await signIn.email({ email, password });

// Registrazione
await signUp.email({ email, password, name });

// Logout
await signOut();
```

### Route Disponibili
- `/login` - Pagina di login/registrazione
- `/dashboard` - Dashboard protetta (richiede autenticazione)

Per maggiori dettagli, vedi [apps/web/BETTER_AUTH_SETUP.md](./apps/web/BETTER_AUTH_SETUP.md)

## 🚀 Deploy

Vedi [DEPLOYMENT.md](./DEPLOYMENT.md) per istruzioni complete su come deployare su:
- **Frontend**: Vercel
- **API**: Render
- **Database**: Neon o Supabase

## 📖 Documentazione

- [Deploy Guide](./DEPLOYMENT.md) - Guida completa al deployment
- [Better Auth Setup](./apps/web/BETTER_AUTH_SETUP.md) - Guida all'autenticazione
- [Database Commands](./packages/db/DATABASE_COMMANDS.md) - Comandi database
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
