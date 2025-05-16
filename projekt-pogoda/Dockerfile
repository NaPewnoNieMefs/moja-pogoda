FROM node:20-slim

WORKDIR /app

COPY package.json ./
RUN npm install --production && apt-get update && apt-get install -y curl

COPY app.js ./
COPY public ./public

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl --fail http://localhost:3000/ || exit 1

CMD [ "npm", "start" ]
