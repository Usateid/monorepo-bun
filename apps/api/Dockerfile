# Usa l'immagine ufficiale di Bun
FROM oven/bun:latest

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file package.json e bun.lockb
COPY package.json bun.lockb* ./

# Installa le dipendenze
RUN bun install --frozen-lockfile

# Copia il resto del codice
COPY . .

# Esponi la porta 3001 (o quella configurata)
EXPOSE 3001

# Avvia l'applicazione
CMD ["bun", "run", "start"]

