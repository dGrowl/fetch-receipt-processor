# Build Stage
FROM node:22-alpine AS builder

USER node

WORKDIR /app

COPY --chown=node:node package*.json .
RUN npm ci

COPY tsconfig.json .
COPY src src
RUN npm run build
RUN npm prune --omit=dev

# Run Stage
FROM node:22-alpine

ENV NODE_ENV=production
ENV API_SERVER_HOST=0.0.0.0
ENV API_SERVER_PORT=3000

USER node

WORKDIR /app

COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/dist dist
COPY meta meta
COPY package*.json .

EXPOSE 3000

CMD ["npm", "run", "start"]
