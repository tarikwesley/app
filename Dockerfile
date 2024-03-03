FROM node:20-alpine

EXPOSE 3333

RUN npm config set strict-ssl false

RUN npm i npm@latest -g

COPY package*.json ./

RUN npm install

COPY . . 

CMD npm start