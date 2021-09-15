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
      id: {
        type: GraphQLID
      },
      name: {
        type: GraphQLString
      },
      type: {
        type: PokeType
      },
      category: {
        type: Category,
      },
      power: {
        type: GraphQLInt
      },
      precision: {
        type: GraphQLFloat,
      },
      powerPoint: {
        type: GraphQLInt
      },
      target: {
        type: GraphQLInt,
      },
    }
  });
  