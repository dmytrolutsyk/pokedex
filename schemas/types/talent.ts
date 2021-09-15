import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat
  } from 'graphql';

  export default new GraphQLObjectType({
    name: 'Talent',
    fields: {
      id: {
        type: GraphQLID
      },
      name: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString,
      },
    }
  });
  