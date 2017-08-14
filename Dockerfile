FROM node:8.1.2-alpine

WORKDIR app

COPY package.json .
RUN npm install

COPY . .
