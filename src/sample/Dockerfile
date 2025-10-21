FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY dist .

EXPOSE 8080

CMD [ "node", "server.js" ]
