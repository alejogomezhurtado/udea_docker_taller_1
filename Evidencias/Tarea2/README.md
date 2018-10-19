# Task 2

docker pull openjdk:8u171-alpine3.8
docker pull mariadb
docker pull mysql:8.0.12
docker pull traefik:1.7.2-alpine
docker pull elasticsearch:5.6.12-alpine

docker volume create log

docker network create front_net
docker network create back_net


docker image build -t backend Tarea2/backend


docker run -itd -v log:/var/log --net back_net --name db mysql:8.0.12

docker image build -t frontend udea_docker_taller_1/dockerfile-tarea-2/frontend
docker create -it -v log:/var/log --net back_net --name frontend1 frontend
docker network connect front_net frontend1
docker start frontend1

docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -v log:/var/log --name logs elasticsearch:5.6.12-alpine

--------------------------------------------------------------------------------
# Certificate traefik
			 
openssl req \
			 -x509 -nodes -days 3600 \
			 -subj "/C=CO/ST=Antioquia/L=Medellin/O=Microservicios II/CN=localhost/emailAddress=alejo.gomez.h@gmail.com" \
       -newkey rsa:2048 -keyout tarea2.key -out tarea2.cert
-----------------------------------------------------------------------------------

defaultEntryPoints = ["http", "https"]

[entryPoints]
  [entryPoints.http]
  address = ":80"
    [entryPoints.http.redirect]
    entryPoint = "https"
  [entryPoints.https]
  address = ":443"
    [entryPoints.https.tls]
      [[entryPoints.https.tls.certificates]]
      certFile = "certificate/tarea2.cert"
      keyFile = "certificate/tarea2.key"




	nano counter-app/docker-compose.yml
  docker-compose ps
	docker-compose scale app=5
	docker run --memort="128m" -P --network frontend_net  --name tomcat01 tomcat:7.0.91-jre7

docker-compose.yml
	
version: "3.5"
services:
  web-fe:
    build: .
    command: python app.py
    ports:
      - target: 5000
        published: 5000
    networks:
      - counter-net
    volumes:
      - type: volume
        source: counter-vol
        target: /code
  redis:
    image: "redis:alpine"
    networks:
      counter-net:

networks:
  counter-net:

volumes:
  counter-vol: