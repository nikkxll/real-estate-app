FROM node:19-bullseye

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install

COPY . .

CMD ["sh", "-c", "npm run start"]