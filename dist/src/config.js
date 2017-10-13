'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var clientOrigin = exports.clientOrigin = process.env.NODE_ENV === 'production' ? 'https://globesql.herokuapp.com' : 'http://localhost:3000';
var wsSubscriptionsEndpoint = exports.wsSubscriptionsEndpoint = process.env.NODE_ENV === 'production' ? 'wss://globesqlserver.herokuapp.com:5000/subscriptions' : 'ws://localhost:4000/subscriptions';