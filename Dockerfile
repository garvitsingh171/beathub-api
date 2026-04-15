# Stage 1: Builder
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .


# Stage 2: Runner (secure)
FROM node:18-alpine AS runner

# Create non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

USER appuser

WORKDIR /home/appuser/app

# Copy only required files
COPY --from=builder --chown=appuser:appgroup /app/package*.json ./
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/src ./src
COPY --from=builder --chown=appuser:appgroup /app/models ./models
COPY --from=builder --chown=appuser:appgroup /app/db ./db

EXPOSE 3000

CMD ["node", "src/server.js"]
