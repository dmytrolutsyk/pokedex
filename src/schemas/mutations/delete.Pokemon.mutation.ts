import { GraphQLInt, GraphQLString, GraphQLFloat, GraphQLList } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { IPokemonDocument } from '../../models';
import { PokemonGraph } from '../../graphs';
import { PokemonServices } from '../../services';


const modifyPokemonMutation = mutationWithClientMutationId({
    name: 'ModifyPokemon',
    description: 'Modify a pokemon',
    inputFields: {
        _id: {
            type: GraphQLString!
        },
    },
    outputFields: {
        _id: {
            type: GraphQLString!
        }
    },
    mutateAndGetPayload: async (input) => {
        const pokemonServices = new PokemonServices();        
        const remove = await pokemonServices.remove(input._id);
        const pokemonId = remove as String;
        return { pokemonId };  
    },
  });
  
  export default modifyPokemonMutation;