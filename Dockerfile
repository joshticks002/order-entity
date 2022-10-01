FROM node:16.15.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 5000

CMD ["yarn", "serve"]