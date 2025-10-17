# Middleware Session Debug Guide

## 🔧 Modifiche Applicate

### 1. Configurazione Better Auth (`src/lib/auth.ts`)
- ✅ Aggiunto schema esplicito per Drizzle Adapter
- ✅ Aggiunto `baseURL` e `secret` per Better Auth
- ✅ Schema include: `user`, `session`, `account`, `verification`

### 2. Middleware (`src/middleware.ts`)
- ✅ Creazione di una Request standard per Better Auth
- ✅ Passaggio corretto degli headers
- ✅ Verifica robusta della sessione con `session?.session`
- ✅ Logging migliorato per debugging

## 🧪 Come Testare

### Passo 1: Verifica le Variabili d'Ambiente

Assicurati che il file `.env` nella root del progetto contenga:

```env
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=your-secret-key-min-32-characters-long
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Passo 2: Test del Login

1. Apri http://localhost:3000
2. Vai su http://localhost:3000/login
3. Registrati o effettua il login con:
   - Email: test@example.com
   - Password: password123

### Passo 3: Verifica la Sessione nel Database

```bash
# Connettiti al database
psql $DATABASE_URL

# Verifica le sessioni
SELECT id, "userId", "expiresAt", "createdAt" FROM session;

# Verifica gli utenti
SELECT id, name, email FROM "user";
```

### Passo 4: Verifica i Log

Apri la console del server Next.js e cerca:

```
Session in middleware: { session: {...}, user: {...} }
Valid session found for user: test@example.com
```

Se vedi errori:

```
Error checking session in middleware: [error details]
No valid session found, redirecting to /login
```

## 🐛 Troubleshooting

### Errore: "No valid session found"

**Causa:** La sessione non viene salvata o letta correttamente

**Soluzioni:**
1. Verifica che `BETTER_AUTH_SECRET` sia configurato
2. Controlla che le tabelle esistano nel database:
   ```bash
   cd packages/db
   bun run db:push
   ```
3. Cancella i cookies del browser e riprova

### Errore: "Error checking session in middleware"

**Causa:** Problema nella comunicazione tra middleware e Better Auth

**Soluzioni:**
1. Verifica che `DATABASE_URL` sia corretto
2. Controlla i log completi dell'errore
3. Verifica che il database sia raggiungibile

### Redirect Loop

**Causa:** Il middleware sta bloccando anche le route pubbliche

**Soluzioni:**
1. Verifica che `/login` e `/api/auth` siano in `publicRoutes`
2. Cancella la cache del browser
3. Usa una finestra in incognito

## 📊 Struttura della Risposta di getSession

Better Auth restituisce:

```typescript
{
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    token: string;
    // ...
  },
  user: {
    id: string;
    email: string;
    name: string;
    // ...
  }
} | null
```

Il middleware verifica:
- `session` non è `null`
- `session.session` esiste (oggetto della sessione)

## 🔍 Debug Avanzato

### Verifica Cookie di Sessione

Apri DevTools → Application → Cookies → http://localhost:3000

Cerca un cookie chiamato `better-auth.session_token` o simile.

### Test con curl

```bash
# Login
curl -X POST http://localhost:3000/api/auth/sign-in/email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -c cookies.txt

# Verifica sessione
curl http://localhost:3000/api/auth/session \
  -b cookies.txt
```

### Verifica Headers nel Middleware

Se i log mostrano `Session in middleware: null`, aggiungi più logging:

```typescript
console.log("Cookies:", request.cookies.getAll());
console.log("Headers:", Object.fromEntries(request.headers.entries()));
```

## ✅ Segni di Successo

Quando tutto funziona correttamente, vedrai:

1. ✅ Login reindirizza alla dashboard
2. ✅ Record nella tabella `session` del database
3. ✅ Log nel middleware: `Valid session found for user: email@example.com`
4. ✅ Cookie di sessione nel browser
5. ✅ Utente autenticato può accedere alle pagine protette

## 📝 Route Pubbliche Attuali

Le seguenti route NON richiedono autenticazione:
- `/` - Homepage
- `/login` - Pagina di login
- `/api/auth/*` - Endpoint di autenticazione
- `/dashboard` - Dashboard (pubblico per testing)
- `/blog` - Blog

Se vuoi proteggere `/dashboard` e `/blog`, rimuovile da `publicRoutes` nel middleware.

