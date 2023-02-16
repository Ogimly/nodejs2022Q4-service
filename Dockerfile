FROM node:16-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm i && npm cache clean --force

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "run", "start:prisma"]