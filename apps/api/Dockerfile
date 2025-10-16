# Usa l'immagine ufficiale di Bun
FROM oven/bun:latest

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file di workspace configuration
COPY package.json bun.lock* ./

# Copia i package.json di tutti i workspace per permettere a Bun di risolvere le dipendenze
COPY apps/api/package.json ./apps/api/package.json
COPY packages/db/package.json ./packages/db/package.json

# Installa le dipendenze (Bun risolve i workspace automaticamente)
RUN bun install

# Copia il resto del codice sorgente
COPY apps/api ./apps/api
COPY packages/db ./packages/db

# Esponi la porta 3001 (o quella configurata)
EXPOSE 3001

# Avvia l'applicazione API dalla directory corretta
WORKDIR /app/apps/api
CMD ["bun", "run", "start"]

