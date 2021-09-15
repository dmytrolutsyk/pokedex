import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat
  } from 'graphql';

import Category from '../enums/Category';
import PokeType from '../enums/PokeType';

  export default new GraphQLObjectType({
    name: 'Capacity',
    fields: {
      Id: {
        type: GraphQLID
      },
      Name: {
        type: GraphQLString
      },
      Type: {
        type: PokeType
      },
      Category: {
        type: Category,
      },
      Power: {
        type: GraphQLInt
      },
      Precision: {
        type: GraphQLFloat,
      },
      PowerPoint: {
        type: GraphQLInt
      },
      Target: {
        type: GraphQLInt,
      },
    }
  });
  