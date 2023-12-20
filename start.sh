#!/bin/bash

# check if docker service is installed
if ! [ -x "$(command -v docker)" ]; then
  echo 'Error: docker is not installed.' >&2
  exit 1
fi

# check if docker service is running
if ! [ "$(systemctl is-active docker)" = "active" ]; then
  echo 'Error: docker service is not running.' >&2
  exit 1
fi





# start compose file
docker-compose up -d
