import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import  PokemonGraph from './pokemon.graph.type';
import TalentGraph from './talent.graph.type';
import { PokemonServices, PokeapiServices, TalentServices, SyncServices,  } from '../../services';

import  Mutation from './mutation';



const pokemonServices = new PokemonServices();
const pokeapiServices = new PokeapiServices();
const talentServices = new TalentServices();
const syncServices = new SyncServices();


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
    talents: {
      type: new GraphQLList(GraphQLNonNull(TalentGraph)),
      description: 'Get all Talents ',
      resolve: async ()  => {
        const found = await talentServices.getAll();
        if (found.error) { 
          // handle error
        }
        const talents = found.message;
        return talents;
      }
    },
    fetchPokemon: {
      type: PokemonGraph,
      resolve: async () => {
        const found = await pokeapiServices.pokemon(6);
        if (found.error) { 
          // handle error
        }
        const pokemon = found.message;
        return found.message;
      },
      
    },
    // fetchTalents: {
    //   type: GraphQLList(GraphQLNonNull(TalentGraph)),
    //   resolve: async () => {
    //     const fetch = await pokeapiServices.talents();
    //     if (fetch.error) { 
    //       // handle error
    //     }
    //     return fetch.message;
    //   }
    // },
    fetchTalent: {
      type: TalentGraph,
      resolve: async () => {
        const found = await pokeapiServices.talent(1);
        if (found.error) { 
          // handle error
        }
        return found.message;
      }
    },
    syncTalents: {
      type: GraphQLList(GraphQLNonNull(TalentGraph)),
      resolve: async () => {
        const sync = await syncServices.syncTalents(204, 207);
        return sync.message;
      }
    },
    syncPokemons: {
      type: GraphQLList(GraphQLNonNull(PokemonGraph)),
      resolve: async () => {
        const sync = await syncServices.syncPokemons(3, 6);
        return sync.message;
      }
    },
    fetchPkmnName: {
      type: GraphQLString,
      resolve: async () => {
        const fetch = await pokeapiServices.pokemonName(6);
        return fetch.message;
      }
    }
    // pokemon: {
    //   type: PokemonGraph,
    //   description: 'Find a Pokemon with its Id',
    //   resolve: async(obj, { input }) => {
    //     const { Id } = input;
    //     const found = await pokemonServices.getById(Id);
    //     if (found.error) { 
    //       // handle error
    //     }
    //     const pokemon = found.message;
    //     return pokemon;
    //   }
    // }
    ,
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

