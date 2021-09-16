import { GraphQLObjectType, GraphQLString } from 'graphql';

import PokemonGraph from './pokemon.graph.type';
import {ivysaur, bulbasaur } from '../../utils/config/database.fake';
export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    helloworld: {
      type: GraphQLString,
      resolve: () => "hello world !"
    },
    poke1: {
      type: PokemonGraph,
      resolve: () => bulbasaur
    },
    poke2: {
      type: PokemonGraph,
      resolve: () => ivysaur
    }
  }
});
