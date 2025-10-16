# Usa l'immagine ufficiale di Bun
FROM oven/bun:latest

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file di configurazione del monorepo dalla root
COPY package.json bun.lock* ./
COPY apps/api/package.json ./apps/api/
COPY packages/db/package.json ./packages/db/

# Installa le dipendenze
RUN bun install --frozen-lockfile

# Copia il codice del database package
COPY packages/db ./packages/db

# Copia il codice dell'API
COPY apps/api ./apps/api

# Esponi la porta 3001 (o quella configurata)
EXPOSE 3001

# Avvia l'applicazione API
WORKDIR /app/apps/api
CMD ["bun", "run", "start"]

