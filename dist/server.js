'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _graphqlServerExpress = require('graphql-server-express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _schema = require('./src/schema');

var _config = require('./src/config');

var _graphql = require('graphql');

var _http = require('http');

var _subscriptionsTransportWs = require('subscriptions-transport-ws');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 4000;
var server = (0, _express2.default)();

//Compress all routes
server.use((0, _compression2.default)());
server.use((0, _helmet2.default)());

server.use('*', (0, _cors2.default)({ origin: _config.clientOrigin }));

server.use('/graphql', _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)({
  schema: _schema.schema
}));

server.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({
  endpointURL: '/graphql',
  subscriptionsEndpoint: 'ws://localhost:4000/subscriptions'
}));

// We wrap the express server so that we can attach the WebSocket for subscriptions
var ws = (0, _http.createServer)(server);

ws.listen(PORT, function () {
  console.log('GraphQL Server is now running');

  // Set up the WebSocket for handling GraphQL subscriptions
  new _subscriptionsTransportWs.SubscriptionServer({
    execute: _graphql.execute,
    subscribe: _graphql.subscribe,
    schema: _schema.schema
  }, {
    server: ws,
    path: '/subscriptions'
  });
});