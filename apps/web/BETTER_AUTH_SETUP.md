# Better Auth Setup Guide

Better Auth è stato configurato con successo nel progetto! 🎉

## 📋 Cosa è stato installato

- **better-auth**: Libreria di autenticazione per Next.js
- Integrazione con Drizzle ORM e PostgreSQL
- Tabelle del database per utenti, sessioni, account e verifiche

## 🗄️ Schema del Database

Le seguenti tabelle sono state aggiunte allo schema:

- `user`: Tabella degli utenti con email/password
- `session`: Gestione delle sessioni utente
- `account`: Per provider sociali (GitHub, Google, etc.)
- `verification`: Per la verifica delle email

## 🚀 Come utilizzare

### 1. Configura le variabili d'ambiente

Crea un file `.env` nella root del progetto con:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 2. Esegui le migrazioni del database

```bash
cd packages/db
bun run drizzle-kit push
```

Oppure applica la migrazione generata:

```bash
cd packages/db
bun run drizzle-kit migrate
```

### 3. Avvia l'applicazione

```bash
bun run dev
```

## 📝 Utilizzo nell'applicazione

### Login/Registrazione

Vai su `/login` per accedere o registrarti. La pagina include:
- Form di login con email/password
- Form di registrazione
- Gestione degli errori
- Reindirizzamento automatico alla dashboard dopo il login

### Dashboard Protetta

La dashboard (`/dashboard`) ora:
- Verifica la sessione dell'utente
- Mostra il nome/email dell'utente connesso
- Include un pulsante di logout
- Reindirizza al login se non autenticato

### Hook disponibili

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

## 🔐 API Routes

Better Auth espone automaticamente gli endpoint:

- `POST /api/auth/sign-in/email` - Login
- `POST /api/auth/sign-up/email` - Registrazione
- `POST /api/auth/sign-out` - Logout
- `GET /api/auth/session` - Ottieni sessione corrente

## 🌐 Provider Sociali (Opzionale)

Per abilitare provider sociali come GitHub o Google:

1. Aggiungi le credenziali in `.env`:

```env
GITHUB_CLIENT_ID="your_client_id"
GITHUB_CLIENT_SECRET="your_client_secret"
```

2. Abilita il provider in `src/lib/auth.ts`:

```ts
export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
```

3. Usa nel client:

```tsx
await signIn.social({ provider: "github" });
```

## 📚 Documentazione

- [Better Auth Docs](https://better-auth.com)
- [Next.js Integration](https://better-auth.com/docs/integrations/next)
- [Drizzle Adapter](https://better-auth.com/docs/adapters/drizzle)

## 🛠️ Personalizzazione

### Modificare le tabelle

Modifica `packages/db/src/schema.ts` e rigenera le migrazioni:

```bash
cd packages/db
bun run drizzle-kit generate
```

### Aggiungere campi personalizzati

Better Auth permette di estendere le tabelle con campi custom. Consulta la documentazione ufficiale.

## ⚠️ Note

- La vecchia tabella `users` è stata mantenuta per compatibilità
- Better Auth usa la tabella `user` (singolare) per l'autenticazione
- Le sessioni sono gestite automaticamente con token sicuri
- Le password sono hashate automaticamente

## 🐛 Troubleshooting

### Errore "Database not connected"

Verifica che `DATABASE_URL` sia corretto nel file `.env`.

### Errore "Session not found"

Assicurati di aver eseguito le migrazioni del database.

### Redirect loop

Controlla che `NEXT_PUBLIC_APP_URL` sia configurato correttamente.

