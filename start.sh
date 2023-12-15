#!/bin/bash


# start mongodb container
# docker run -d --name mongodb -p 27017:27017 -v /data/mongodb:/data/db mongo:3.4.2

docker run -d --rm --name mongodb -p 27017:27017 mongo