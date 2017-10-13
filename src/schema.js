import {
    makeExecutableSchema,
    addMockFunctionsToSchema,
  } from 'graphql-tools';
  
  import { resolvers } from './resolvers';
  
  const typeDefs = `
  type Globe {
    id: Int!                # "!" denotes a required field
    type: Int! # 3 types: 1, 2 or 3
  }
  
  input GlobeInput {
    type: Int
  }
   
  # This type specifies the entry points into our API
  type Query {
    globes: [Globe]    # "[]" means this is a list of channels
  }
  
  # The mutation root type, used to define all mutations
  type Mutation {
    addGlobe(type: Int!): Globe
    deleteGlobe(id: Int!): Globe
    newPlayer: [Globe]
    clearGlobes: [Globe]
  }
  
  # The subscription root type, specifying what we can subscribe to
  type Subscription {
    globeAdded: Globe,
    globeDeleted: Globe,
    newPlayer: [Globe]
    globesCleared: [Globe]
  }
  `;
  
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  export { schema };
  