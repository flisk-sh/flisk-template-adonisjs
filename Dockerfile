# A real create-adonisjs app (slim starter kit, no database): the scaffolder runs at build time.
FROM node:26-alpine@sha256:6bd9ab43c0ec0190ca7b2d193906cb8b7edf6e7f4afa43ddeccd6452710bffb5
RUN apk add --no-cache git
WORKDIR /work
RUN npm create adonisjs@3.4.0 app -- --kit=github:adonisjs/slim-starter-kit --pkg=npm --skip-migrations </dev/null
WORKDIR /work/app
# The app reads PORT and HOST from the environment; HOST must be beyond loopback.
ENV HOST=0.0.0.0
RUN chown -R node:node .
USER node
HEALTHCHECK --interval=10s --timeout=3s --start-period=10s --retries=3 CMD nc -z 127.0.0.1 ${PORT:-3333} || exit 1
CMD ["npm", "run", "dev"]
