'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = undefined;

var _graphqlSubscriptions = require('graphql-subscriptions');

var _globes = [];
var nextGlobeId = 1;
var pubsub = new _graphqlSubscriptions.PubSub();

var resolvers = exports.resolvers = {
  Query: {
    globes: function globes() {
      return _globes;
    }
  },
  Mutation: {
    addGlobe: function addGlobe(root, args) {
      var newGlobe = { id: nextGlobeId++, type: args.type };
      _globes.push(newGlobe);
      pubsub.publish('globeAdded', { globeAdded: newGlobe });
      return newGlobe;
    },
    deleteGlobe: function deleteGlobe(root, args) {
      var globeIndex = _globes.findIndex(function (g) {
        return g.id === args.id;
      });
      if (globeIndex !== -1) {
        var globe = _globes[globeIndex];
        _globes.splice(globeIndex, 1);
        pubsub.publish('globeDeleted', { globeDeleted: globe });
        return globe;
      }
      return null;
    },
    newPlayer: function newPlayer(root, args) {
      var newGlobe1 = { id: nextGlobeId++, type: 1 };
      var newGlobe2 = { id: nextGlobeId++, type: 2 };
      var newGlobe3 = { id: nextGlobeId++, type: 3 };
      var newGlobes = [newGlobe1, newGlobe2, newGlobe3];
      _globes.push(newGlobe1);
      _globes.push(newGlobe2);
      _globes.push(newGlobe3);
      pubsub.publish('newPlayer', { newPlayer: newGlobes });
      return newGlobes;
    },
    clearGlobes: function clearGlobes(root, args) {
      _globes = [];
      pubsub.publish('globesCleared', { globsCleared: _globes });
      return _globes;
    }
  },
  Subscription: {
    globeAdded: {
      subscribe: (0, _graphqlSubscriptions.withFilter)(function () {
        return pubsub.asyncIterator('globeAdded');
      }, function (payload, variables) {
        //??
        return true;
      })
    },
    globeDeleted: {
      subscribe: (0, _graphqlSubscriptions.withFilter)(function () {
        return pubsub.asyncIterator('globeDeleted');
      }, function (payload, variables) {
        //??
        return true;
      })
    },
    newPlayer: {
      subscribe: (0, _graphqlSubscriptions.withFilter)(function () {
        return pubsub.asyncIterator('newPlayer');
      }, function (payload, variables) {
        //??
        return true;
      })
    },
    globesCleared: {
      subscribe: (0, _graphqlSubscriptions.withFilter)(function () {
        return pubsub.asyncIterator('globesCleared');
      }, function (payload, variables) {
        //??
        return true;
      })
    }
  }
};