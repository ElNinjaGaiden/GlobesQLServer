'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _graphqlTools = require('graphql-tools');

var _resolvers = require('./resolvers');

var typeDefs = '\n  type Globe {\n    id: Int!                # "!" denotes a required field\n    type: Int! # 3 types: 1, 2 or 3\n  }\n  \n  input GlobeInput {\n    type: Int\n  }\n   \n  # This type specifies the entry points into our API\n  type Query {\n    globes: [Globe]    # "[]" means this is a list of channels\n  }\n  \n  # The mutation root type, used to define all mutations\n  type Mutation {\n    addGlobe(type: Int!): Globe\n    deleteGlobe(id: Int!): Globe\n    newPlayer: [Globe]\n    clearGlobes: [Globe]\n  }\n  \n  # The subscription root type, specifying what we can subscribe to\n  type Subscription {\n    globeAdded: Globe,\n    globeDeleted: Globe,\n    newPlayer: [Globe]\n    globesCleared: [Globe]\n  }\n  ';

var schema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs: typeDefs, resolvers: _resolvers.resolvers });
exports.schema = schema;