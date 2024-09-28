# Stage 1: Build the Client
FROM node:19-bullseye AS client-builder

WORKDIR /usr/src/client

COPY client/package*.json ./

RUN npm install

COPY client/ .

RUN npm run build

# Stage 2: Build the API
FROM node:19-bullseye AS api-builder

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install

COPY . .
COPY --from=client-builder /usr/src/client/dist /usr/src/api/client/dist

CMD ["sh", "-c", "npm run start"]