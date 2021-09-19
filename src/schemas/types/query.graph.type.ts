import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
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
      args: {
        id: {
          type: GraphQLID,
          description: 'The ID of a `Pokemon`.',
        }
      },
      resolve: async (obj, args) => {
        const { id } = args;
        if (!id) return null;

        const found = await pokeapiServices.pokemon(args.id);
        if (found.error) { 
          // handle error
        }
        const pokemon = found.message;
        return found.message;
      },
      
    },
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
      resolve: async (obj, args) => {
        const { min, max } = args;
        if (!min || !max) return null;

        const sync = await syncServices.syncTalents(min, max);
        return sync.message;
      }
    },
    syncPokemons: {
      type: GraphQLList(GraphQLNonNull(PokemonGraph)),
      args: {
        min: { type: GraphQLInt },
        max: { type: GraphQLInt }
      },
      resolve: async (obj, args) => {
        const { min, max } = args;
        if (!min || !max) return null;

        const sync = await syncServices.syncPokemons(min, max);
        return sync.message;
      }
    },
    fetchPkmnName: {
      type: GraphQLString,
      args: {
        id: {
          type: GraphQLID,
          description: 'The ID of a `Pokemon`.',
        }
      },
      resolve: async (obj, args) => {
        const { id } = args;
        if (!id) return null;

        const fetch = await pokeapiServices.pokemonName(id);
        return fetch.message;
      }
    }    ,
    pokemon: {
      type: PokemonGraph,
      description: 'Find a Pokemon with its Id',
      args: {
        id: {
          type: GraphQLID,
          description: 'The ID of a `Pokemon`.',
        }
      },
      resolve: async(obj, args) => {
        if (!args.id) {
          return null
        } else {
          const id  = args.id;
          const found = await pokemonServices.getByField("pokenum", id);
          const pokemon = found.message;
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

