# ---- Stage 1: Install dependencies ----
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci

# ---- Stage 2: Build the application ----
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- Stage 3: Production runner ----
FROM node:22-alpine AS runner
WORKDIR /app

# Install Chromium for puppeteer-core (screenshot capture)
RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates ttf-freefont

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Copy standalone server and static files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy puppeteer-core and its dependencies (serverExternalPackages not bundled in standalone)
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/puppeteer-core ./node_modules/puppeteer-core
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@puppeteer ./node_modules/@puppeteer
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/chromium-bidi ./node_modules/chromium-bidi
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/devtools-protocol ./node_modules/devtools-protocol
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/webdriver-bidi-protocol ./node_modules/webdriver-bidi-protocol
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/ws ./node_modules/ws
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/debug ./node_modules/debug
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/typed-query-selector ./node_modules/typed-query-selector
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/ms ./node_modules/ms

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
