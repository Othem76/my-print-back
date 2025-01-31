FROM node:20.17

WORKDIR /app

COPY package*.json ./

RUN npm install @swc/core-linux-x64-gnu && npm ci

COPY . .

RUN chmod +x /app/entrypoint.sh

EXPOSE 3333

ENTRYPOINT ["sh", "/app/entrypoint.sh"]
