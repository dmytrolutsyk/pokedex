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
        name: {
            type: GraphQLString
        },
        height: {
            type: GraphQLInt,
        },
        weight: {
            type: GraphQLFloat,
        },
        color: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        sprite: {
            type: GraphQLString,
        },
        spriteSmall: {
            type: GraphQLString,
        }
    },
    outputFields: {
        pokemon: {
            type: PokemonGraph
        }
    },
    mutateAndGetPayload: async (input) => {
        const pokemonServices = new PokemonServices();        
        const insert = await pokemonServices.update(input._id, input);
        const pokemon = insert.message as IPokemonDocument;
        return { pokemon };  
    },
  });
  
  export default modifyPokemonMutation;