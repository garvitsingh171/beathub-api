FROM node:18-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

FROM node:18-alpine AS runner

ENV NODE_ENV=production

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --chown=appuser:appgroup package*.json ./
COPY --chown=appuser:appgroup src ./src
COPY --chown=appuser:appgroup models ./models
COPY --chown=appuser:appgroup db ./db

USER appuser

EXPOSE 3000

CMD ["node", "src/server.js"]
