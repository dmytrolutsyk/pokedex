import {
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat
  } from 'graphql';

import PokemonTypeGraph from '../../graphs/pokemon.type.graph'
import MoveTypeGraph from '../../graphs/move.types.graph';


export default new GraphQLInputObjectType({
  name: 'MoveInput',
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    type: {
      type: PokemonTypeGraph
    },
    moveType: {
      type: MoveTypeGraph,
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