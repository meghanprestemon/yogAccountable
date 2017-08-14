FROM node:8.1.2-alpine

WORKDIR app

RUN npm install

COPY . .
