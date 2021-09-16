import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import  PokemonGraph from './pokemon.graph.type';
import { PokemonServices } from '../../services';
import { BaseError } from '../../utils';

import  Mutation from './mutation';



const pokemonServices = new PokemonServices();

export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    helloworld: {
      type: GraphQLString,
      resolve: () => "hello world !"
    },
    pokemons: {
      type: new GraphQLList(GraphQLNonNull(PokemonGraph)),
      description: 'Get all Pokemons ',
      resolve: async ()  => {
        const found = await pokemonServices.getAll();
        if (found.error) { 
          // handle error
        }
        const pokemons = found.message;
        return pokemons;
      }
    },
    pokemon: {
       type: PokemonGraph,
       description: 'Find a Pokemon with its Id',
       args: {
        id: {
          type: GraphQLID,
          description: 'The ID of a `Human`.',
        }
      },
       resolve: async(obj, args) => {
        
        if (!args.id) {
          return null
        } else {
          const Id  = args.id;
          console.log(
            'Pokemon got by id: ' + args.id
          );
          const found = await pokemonServices.getById(Id);
          const pokemon = found.message;
        console.log(
         'Pokemon got by id: ' + found.message
       );
        return pokemon;
        }     
        
      }
     },
     insertPokemon: {
      type: PokemonGraph,
      description: 'Insert a Pokemon in db.',
     }
  }
});


export const schema = new GraphQLSchema({ query: queryType, mutation: Mutation });

