FROM node:18-alpine

COPY ./package.json /client/package.json
COPY ./.env.local /client/.env.local

WORKDIR /client

# COPY package.json ./

RUN npm install

COPY . /client

CMD ["npm", "run", "dev"]