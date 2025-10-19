# 🗄️ Database Commands

Comandi rapidi per gestire il database con Drizzle ORM.

## 🚀 Comandi dalla Root del Monorepo

Puoi eseguire tutti i comandi dalla root del progetto:

### Generare Migrazioni
Crea un file SQL di migrazione basato sulle modifiche allo schema:

```bash
bun run db:generate
```

Questo comando:
- Confronta lo schema in `packages/db/src/schema.ts` con il database
- Genera un file SQL in `packages/db/migrations/`
- Non applica le modifiche al database

### Push delle Modifiche
Applica direttamente le modifiche dello schema al database (senza migrazioni):

```bash
bun run db:push
```

Questo comando:
- Applica immediatamente le modifiche al database
- Ideale per sviluppo locale
- Non genera file di migrazione

### Applicare Migrazioni
Esegue i file di migrazione SQL sul database:

```bash
bun run db:migrate
```

Questo comando:
- Applica le migrazioni nella cartella `packages/db/migrations/`
- Usa questa in produzione
- Traccia quali migrazioni sono state applicate

### Drizzle Studio
Apri l'interfaccia visuale per esplorare e modificare i dati:

```bash
bun run db:studio
```

Questo comando:
- Apre un browser con Drizzle Studio
- Permette di visualizzare e modificare i dati
- Utile per debugging

## 📝 Workflow Consigliato

### Durante lo Sviluppo

1. **Modifica lo schema** in `packages/db/src/schema.ts`

2. **Pusha le modifiche** (più veloce):
   ```bash
   bun run db:push
   ```

### Per la Produzione

1. **Modifica lo schema** in `packages/db/src/schema.ts`

2. **Genera la migrazione**:
   ```bash
   bun run db:generate
   ```

3. **Verifica il file SQL** generato in `packages/db/migrations/`

4. **Committa** il file di migrazione

5. **In produzione, applica la migrazione**:
   ```bash
   bun run db:migrate
   ```

## 🔧 Configurazione

Il file di configurazione è in `packages/db/drizzle.config.ts` e usa:
- **DATABASE_URL** dal file `.env` nella root del monorepo
- **Schema**: `packages/db/src/schema.ts`
- **Migrazioni**: `packages/db/migrations/`
- **Dialect**: PostgreSQL

## 📚 Comandi Alternativi

Se preferisci eseguire i comandi direttamente dalla cartella `packages/db`:

```bash
cd packages/db

# Genera migrazioni
bun run db:generate

# Push modifiche
bun run db:push

# Applica migrazioni
bun run db:migrate

# Apri Drizzle Studio
bun run db:studio
```

## ⚙️ Variabili d'Ambiente

Assicurati che il file `.env` nella root contenga:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

Bun carica automaticamente il file `.env`, quindi non serve `dotenv` manualmente.

## 🆘 Troubleshooting

### Errore: "Either connection url or host, database are required"
- Verifica che il file `.env` esista nella root
- Controlla che `DATABASE_URL` sia configurato correttamente

### Errore: "Schema not found"
- Assicurati di essere nella directory corretta
- Verifica che `packages/db/src/schema.ts` esista

### Migrazioni non applicate
- Usa `bun run db:push` per sviluppo locale
- Usa `bun run db:migrate` per applicare migrazioni tracciabili

