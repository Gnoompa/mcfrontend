ARG NODE_VERSION=16.16.0

FROM node:${NODE_VERSION}-alpine as build
WORKDIR /app

# COPY package.json tsconfig.json tsconfig.paths.json config-overrides.js .env ./

# COPY ./src ./src
COPY ./build ./build
COPY ./public ./public

RUN apk add git
RUN npm init -y
RUN npm install -g serve
# RUN npm run build-prod

CMD ["serve", "-s", "build", "-l", "80"]
