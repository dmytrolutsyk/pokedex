import {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList
} from 'graphql';

import PokemonTypeGraph from '../enums/pokemon.type.graph.enum'
import MoveInput from '../inputs/move.input';
import PokemonGraph from '../types/pokemon.graph.type';
import { mutationWithClientMutationId } from 'graphql-relay';
import { PokemonServices } from '../../services';
import PokemonInput from '../inputs/pokemon.input'
import { IPokemonDocument } from '../../models';


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
             type: GraphQLInt,
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