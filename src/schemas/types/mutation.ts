
import { GraphQLObjectType } from 'graphql';
import addPokemonMutation from '../mutations/addPokemonMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPokemon: addPokemonMutation,
  },
});