#!/bin/sh
if [ $NODE_ENV = "production" ]; then
    node dist/server;
else
    nodemon ./server.js --exec babel-node -e js;
fi