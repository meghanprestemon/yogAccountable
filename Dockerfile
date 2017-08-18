FROM node:8.1.2-alpine

RUN apk --no-cache add --virtual builds-deps build-base python

WORKDIR app

COPY package.json .
RUN npm install
RUN npm rebuild bcrypt --build-from-source

COPY . .
