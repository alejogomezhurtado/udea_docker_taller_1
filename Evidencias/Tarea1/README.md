docker pull node:6-alpine
nano udea_docker_taller_1/dockerfile-tarea-1/Dockerfile

---------------------------------------------------------
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
----------------------------------------------------------

docker image build -t tarea1 udea_docker_taller_1/dockerfile-tarea-1
docker run -it -p 80:3000 tarea1

* Push image to Docker Hub
docker login -u alejandrogomezh -p xxxxxx
------------------------------------------------------------------------------------------
alejandro@alejandro-VirtualBox:~/docker$ docker images
REPOSITORY           TAG                 IMAGE ID            CREATED             SIZE
tarea1               latest              b344b863dac7        37 minutes ago      69MB
node                 6-alpine            ac75c1f95b80        4 weeks ago         55.2MB
------------------------------------------------------------------------------------------

docker tag b344b863dac7 alejandrogomezh/tarea1:latest
docker push alejandrogomezh/tarea1

https://hub.docker.com/r/alejandrogomezh/tarea1/
