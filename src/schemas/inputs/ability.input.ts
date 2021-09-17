import {
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat
  } from 'graphql';

import PokemonTypeGraph from '../enums/pokemon.type.graph.enum'
import AbilityTypeGraph from '../enums/ability.types.graph.enum';

export default new GraphQLInputObjectType({
  name: 'AbilityInput',
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
    abilityType: {
      type: AbilityTypeGraph,
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