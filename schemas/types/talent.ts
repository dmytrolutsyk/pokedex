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
      Id: {
        type: GraphQLID
      },
      Name: {
        type: GraphQLString
      },
      Description: {
        type: GraphQLString,
      },
    }
  });
  