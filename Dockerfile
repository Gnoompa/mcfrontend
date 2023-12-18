ARG NODE_VERSION=16.16.0

FROM node:${NODE_VERSION}-alpine as build
WORKDIR /app

COPY package.json tsconfig.json tsconfig.paths.json config-overrides.js ./

COPY ./src ./src
COPY ./public ./public 

RUN apk add git
RUN npm install

ENV NODE_ENV development

CMD ["npm", "run", "start"]
