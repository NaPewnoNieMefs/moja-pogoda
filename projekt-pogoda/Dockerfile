# Używamy oficjalnego obrazu Node.js
FROM node:20-alpine3.20 AS runtime

# Ustawiamy katalog roboczy
WORKDIR /app

# Kopiujemy zależności
COPY package*.json ./
RUN apk add --no-cache curl && npm install --omit=dev --no-audit --no-fund

# Kopiujemy pliki aplikacji
COPY app.js ./
COPY public ./public

# Udostępniamy port 3000
EXPOSE 3000

# Healthcheck - sprawdza czy aplikacja odpowiada na GET /
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl --fail http://localhost:3000/ || exit 1

# Domyślna komenda uruchamiająca aplikację
CMD [ "npm", "start" ]
