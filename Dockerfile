FROM node:16.20.0-alpine3.18

EXPOSE 3333

RUN npm i npm@latest -g

COPY package*.json ./

RUN npm install

COPY . . 

CMD npm start