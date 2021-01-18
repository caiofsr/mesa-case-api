FROM node:alpine

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package.json yarn.lock ./

RUN apk add --no-cache git

COPY . /home/node/app/

RUN chown -R node:node /home/node

RUN yarn

USER node

EXPOSE 3333

ENTRYPOINT ["yarn","dev"]
