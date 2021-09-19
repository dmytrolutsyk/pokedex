import { GraphQLID, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLList } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { IPokemonDocument } from '../../models';
import { PokemonGraph } from '../../graphs';
import { PokemonServices } from '../../services';
import PokemonTypeGraph from '../../graphs/pokemon.type.graph'
import MoveInput from '../inputs/move.input';
import PokemonInput from '../inputs/pokemon.input'


const addPokemonMutation = mutationWithClientMutationId({
    name: 'AddPokemon',
    description: 'Add a pokemon',
    inputFields: {
    _id: {
        type:  GraphQLID
      },
    name: {
      type: GraphQLString
    },
      pokenum: {
        type: GraphQLString,
      },
      type: {
        type: new GraphQLList(PokemonTypeGraph),
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
      talents: {
        type: new GraphQLList(GraphQLString),
      },
      moves: {
        type: new GraphQLList(MoveInput),
      },
      evolutions: {
        type: new GraphQLList(PokemonInput),
      },
      description: {
        type: GraphQLString,
      },
      sprite: {
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
        const insert = await pokemonServices.insert(input);
        const pokemon = insert.message as IPokemonDocument;
        return {pokemon};  
    },
  });
  
  export default addPokemonMutation;