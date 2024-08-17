FROM node:20.14.0-alpine

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080