FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN apk add --no-cache python3 make g++

RUN npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source

CMD [ "npm", "start" ]