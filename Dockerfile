FROM node:13
WORKDIR /home/node/app
COPY ./dist/ ./dist/
COPY ./lib/ ./lib/
COPY ./package.json ./package.json
EXPOSE 80
