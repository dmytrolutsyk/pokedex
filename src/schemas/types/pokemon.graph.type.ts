import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat
  } from 'graphql';

import { PokemonTypeGraph } from '../enums';
import { TalentGraph } from '.';

export const PokemonGraph = new GraphQLObjectType({
  name: 'Pokemon',
  fields: {
    Id: {
      type: GraphQLID
    },
    Name: {
      type: GraphQLString
    },
    Pokenum: {
      type: GraphQLInt,
    },
    // Type: {
    //   type: PokemonTypeGraph
    // },
    Height: {
      type: GraphQLInt,
    },
    Weight: {
      type: GraphQLFloat,
    },
    Color: {
      type: GraphQLString,
    },
    /*Location: {
      type: GraphQLString,
    },*/
    // Talents: {
    //   type: TalentGraph,
    // },
    // Evolutions: {
    //   type: GraphQLString,
    // },
    // Description: {
    //   type: GraphQLString,
    // },
    // Sprite: {
    //   type: GraphQLString,
    // }
  }
});
