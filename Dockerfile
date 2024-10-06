FROM node:20
WORKDIR /UblisYogaBackend
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build
CMD node build/server.js