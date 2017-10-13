import { PubSub } from 'graphql-subscriptions';
import { withFilter } from 'graphql-subscriptions';

let globes = [];
let nextGlobeId = 1;
const pubsub = new PubSub();

export const resolvers = {
  Query: {
    globes: () => {
      return globes;
    }
  },
  Mutation: {
    addGlobe: (root, args) => {
      const newGlobe = { id: nextGlobeId++, type: args.type };
      globes.push(newGlobe);
      pubsub.publish('globeAdded', { globeAdded: newGlobe });
      return newGlobe;
    },
    deleteGlobe: (root, args) => {
      const globeIndex = globes.findIndex(g => g.id === args.id);
      if(globeIndex !== -1) {
          const globe = globes[globeIndex];
          globes.splice(globeIndex, 1);
          pubsub.publish('globeDeleted', { globeDeleted: globe });
          return globe;
      }
      return null;
    },
    newPlayer: (root, args) => {
      const newGlobe1 = { id: nextGlobeId++, type: 1 };
      const newGlobe2 = { id: nextGlobeId++, type: 2 };
      const newGlobe3 = { id: nextGlobeId++, type: 3 };
      const newGlobes = [newGlobe1, newGlobe2, newGlobe3];
      globes.push(newGlobe1);
      globes.push(newGlobe2);
      globes.push(newGlobe3);
      pubsub.publish('newPlayer', { newPlayer: newGlobes });
      return newGlobes;
    },
    clearGlobes: (root, args) => {
      globes = [];
      pubsub.publish('globesCleared', { globsCleared: globes });
      return globes;
    }
  },
  Subscription: {
    globeAdded: {
      subscribe: withFilter(() => pubsub.asyncIterator('globeAdded'), (payload, variables) => {
        //??
        return true;
      }),
    },
    globeDeleted: {
      subscribe: withFilter(() => pubsub.asyncIterator('globeDeleted'), (payload, variables) => {
        //??
        return true;
      }),
    },
    newPlayer: {
      subscribe: withFilter(() => pubsub.asyncIterator('newPlayer'), (payload, variables) => {
        //??
        return true;
      }),
    },
    globesCleared: {
      subscribe: withFilter(() => pubsub.asyncIterator('globesCleared'), (payload, variables) => {
        //??
        return true;
      }),
    }
  },
};
