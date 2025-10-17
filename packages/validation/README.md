# @repo/validation

Package condiviso per gli schemi di validazione usando Zod.

## Utilizzo

```typescript
import { signInSchema, signUpSchema } from "@repo/validation";

// Validare i dati
const result = signInSchema.safeParse(data);
if (!result.success) {
  console.error(result.error);
}
```

## Schemi disponibili

- `signInSchema` - Validazione per login
- `signUpSchema` - Validazione per registrazione

## Aggiungere nuovi schemi

1. Crea un nuovo file in `src/` (es. `src/user.ts`)
2. Definisci gli schemi con Zod
3. Esporta gli schemi e i tipi TypeScript derivati
4. Aggiungi l'export in `src/index.ts`

