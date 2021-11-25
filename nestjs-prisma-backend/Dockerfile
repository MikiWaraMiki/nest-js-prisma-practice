FROM node:14-slim as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --non-interactive --frozen-lockfile

COPY . .

RUN yarn build

#=======================================================
# Package install
FROM node:14-slim as node_modules

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --non-interactive --frozen-lockfile --prod


#=======================================================
# Run
FROM gcr.io/distroless/nodejs:14

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/dist /app/dist
COPY --from=node_modules /app/node_modules /app/node_modules

CMD ["dist/main"]
