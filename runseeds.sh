#!/bin/bash


# run seeds inside app container
# get container id
container_id=$(docker ps -aqf "name=app")

# run seeds

docker exec -it $container_id node ./utilities/seeds.js