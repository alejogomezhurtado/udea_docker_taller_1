FROM node:6-alpine
LABEL maintainer="alejo.gomez.h@gmail.com"
RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install && npm cache clean --force 
ENTRYPOINT ["node", "app.js"]