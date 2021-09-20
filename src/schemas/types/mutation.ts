
import { GraphQLObjectType } from 'graphql';

import addPokemonMutation from '../mutations/addPokemonMutation';
import modifyPokemonMutation from '../mutations/modify.Pokemon.mutation';
import deletePokemonMutation from '../mutations/delete.Pokemon.mutation';


export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPokemon: addPokemonMutation,
    modifyPokemon: modifyPokemonMutation,
    deletePokemon: deletePokemonMutation
  },
});