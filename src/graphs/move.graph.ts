import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLFloat } from 'graphql';

import PokemonTypeGraph from './pokemon.type.graph'
import MoveTypeGraph from './move.types.graph';


export const MoveGraph = new GraphQLObjectType({
  name: 'Move',
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    description: {
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
      type: GraphQLString,
    },
  }
});
