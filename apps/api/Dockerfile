# Usa l'immagine ufficiale di Bun
FROM oven/bun:latest

# Imposta la directory di lavoro
WORKDIR /app

# Copia l'intero monorepo (il build context deve essere la root del progetto)
COPY . .

# Installa le dipendenze dalla root
RUN bun install

# Esponi la porta 3001 (o quella configurata)
EXPOSE 3001

# Avvia l'applicazione API dalla directory corretta
WORKDIR /app/apps/api
CMD ["bun", "run", "start"]

