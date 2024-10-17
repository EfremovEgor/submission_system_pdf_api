FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm i
COPY . .
RUN npm run build
RUN ls -la

CMD [ "node", "dist/server.js" ]