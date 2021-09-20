
import { GraphQLObjectType } from 'graphql';

import addPokemonMutation from '../mutations/addPokemonMutation';
import modifyPokemonMutation from '../mutations/modify.Polemon.mutation';


export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPokemon: addPokemonMutation,
    modifyPokemon: modifyPokemonMutation,
  },
});