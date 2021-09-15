import { GraphQLObjectType, GraphQLString } from 'graphql';

import Pokemon from '../types/Pokemon';
import {ivysaur, bulbasaur } from '../../utils/fakeDatabase';
export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    helloworld: {
      type: GraphQLString,
      resolve: () => "hello world !"
    },
    poke1: {
      type: Pokemon,
      resolve: () => bulbasaur
    },
    poke2: {
      type: Pokemon,
      resolve: () => ivysaur
    }
  }
});
