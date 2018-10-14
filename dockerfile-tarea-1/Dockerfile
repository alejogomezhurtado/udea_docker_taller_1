FROM node:6-alpine
LABEL maintainer="alejo.gomez.h@gmail.com"
RUN apk add --update tini
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
RUN npm cache clean --force
COPY . /usr/src/app
EXPOSE 80
ENTRYPOINT ["/sbin/tini", "--", "./bin/www"]