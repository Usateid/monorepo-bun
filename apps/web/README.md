# 🎨 Next.js Frontend

Frontend costruito con Next.js 15, React 19, e Tailwind CSS.

## 🚀 Quick Start

### Sviluppo Locale

```bash
# Dalla root del monorepo
bun run web

# Oppure da questa directory
cd apps/web
bun run dev
```

L'app sarà disponibile su http://localhost:3000

### Variabili d'Ambiente

Crea un file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Per produzione, aggiorna con l'URL delle API su Render:
```env
NEXT_PUBLIC_API_URL=https://tua-api.onrender.com
```

## 📦 Deploy

Vedi [DEPLOYMENT.md](../../DEPLOYMENT.md) nella root del progetto per istruzioni complete sul deploy su Vercel.

## 🛠️ Stack Tecnologico

- **Framework**: Next.js 15 (con Turbopack)
- **UI**: React 19
- **Styling**: Tailwind CSS 4
- **Runtime**: Bun
- **Deploy**: Vercel

## 🏗️ Build

```bash
bun run build
```

## 🧪 Linting

```bash
bun run lint
```

## 🔒 Configurazione

- Vercel configurato per usare Bun come runtime
- Turbopack abilitato per build e dev server veloci
- Variabili d'ambiente pubbliche con prefisso `NEXT_PUBLIC_`
