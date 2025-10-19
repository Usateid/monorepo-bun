# 🔍 JWT Verification Debug Guide

## Problema Attuale

Errore: `JWT verification failed: no applicable key found in the JSON Web Key Set`

Questo significa che il JWT token non può essere verificato con le chiavi presenti nel database.

## 📊 Come Debuggare

### Passo 1: Avvia il server e osserva i log

```bash
cd apps/api
bun run src/index.ts
```

**Nota**: I log di debug usano `process.stderr.write()` direttamente invece di `console.log` per evitare completamente l'elision di Bun. Questo garantisce che **tutti i log** vengano mostrati.

### Passo 2: Fai una richiesta autenticata

Dal frontend, fai login e poi prova ad accedere a `/users`.

### Passo 3: Controlla i log nel terminale del server

Dovresti vedere (output su stderr - in rosso/grigio):
```
📋 Found X keys in JWKS database
🔑 Processing key 1: { id: '...', publicKeyPreview: '...' }
✅ Parsed public key 1: { kty: '...', ... }
✨ Formatted X keys for JWKS
🎫 JWT Header: { alg: '...', kid: '...', ... }
```

## 🔧 Possibili Soluzioni

### Soluzione 1: Verifica il formato delle chiavi

Le chiavi nel database devono essere nel formato JWK (JSON Web Key). Esempio:

```json
{
  "kty": "RSA",
  "kid": "unique-key-id",
  "use": "sig",
  "alg": "RS256",
  "n": "...",
  "e": "AQAB"
}
```

### Soluzione 2: Controlla che l'issuer corrisponda

Il JWT deve essere emesso dal tuo Better Auth con l'issuer corretto.

Verifica che `NEXT_PUBLIC_APP_URL` sia impostato correttamente in `.env`:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Soluzione 3: Rigenera le chiavi JWKS

Se le chiavi sono corrotte, puoi rigenerarle:

1. Cancella tutte le sessioni e chiavi esistenti:
```sql
DELETE FROM session;
DELETE FROM jwks;
```

2. Riavvia Better Auth - genererà nuove chiavi automaticamente

3. Fai un nuovo login

### Soluzione 4: Usa l'algoritmo corretto

Se Better Auth usa un algoritmo specifico (es. RS256), assicurati che sia specificato nelle opzioni:

```typescript
// In lib/auth.ts, potresti dover specificare l'algoritmo
const { payload } = await jwtVerify(token, JWKS, {
  issuer: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  algorithms: ["RS256"], // Specifica l'algoritmo
});
```

## 🐛 Debug Avanzato

### Ispeziona il database direttamente

```bash
cd packages/db
bun --eval "
import { db, jwks } from './src/index';
const keys = await db.select().from(jwks);
console.log('Keys:', JSON.stringify(keys, null, 2));
"
```

### Decodifica il JWT manualmente

Puoi usare https://jwt.io per decodificare il token e vedere:
- L'header (algoritmo e kid)
- Il payload (issuer, exp, sub)
- La firma

### Confronta kid del JWT con kid nel database

Il `kid` (key id) nell'header del JWT deve corrispondere a una chiave nel database.

## ✅ Checklist

- [ ] Le chiavi JWKS esistono nel database?
- [ ] Le chiavi sono nel formato JSON valido?
- [ ] Il `kid` nel JWT corrisponde a una chiave nel database?
- [ ] L'algoritmo del JWT (es. RS256) è supportato?
- [ ] L'`issuer` nel JWT corrisponde a `NEXT_PUBLIC_APP_URL`?
- [ ] Better Auth sta generando JWT (non solo session cookies)?

## 💡 Nota Importante

Better Auth può usare sia session cookies che JWT. Assicurati di:
1. Aver configurato il plugin JWT in Better Auth
2. Usare `token()` nel frontend per ottenere il JWT
3. Inviare il JWT nell'header Authorization

Se i log mostrano informazioni utili, possiamo aggiustare il codice di conseguenza!

