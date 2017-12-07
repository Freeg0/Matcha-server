docker-machine start Cama
eval $(docker-machine env Cama)
docker rm -f $(docker ps -aq)
docker-compose up -d
docker-machine ip Cama