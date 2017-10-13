#!/bin/sh
echo "NODE_ENV: $NODE_ENV"
if [ $NODE_ENV = "production" ]; then
  nodemon ./server.js --exec babel-node -e js;
else
  node dist/server;
fi