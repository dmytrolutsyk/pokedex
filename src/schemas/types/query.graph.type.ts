import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import  PokemonGraph from './pokemon.graph.type';
import TalentGraph from './talent.graph.type';
import { PokemonServices, PokeapiServices, TalentServices, SyncServices,  } from '../../services';

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
  }
});

const getPokemonById = mutationWithClientMutationId({
  name: 'getPokemonById',
  description: 'Returns a Pokemon',
  inputFields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  outputFields: {
    pokemon: {
      type: PokemonGraph,
    },
  },
  mutateAndGetPayload: (input, context) => {
    console.log(
      'Mutation.addLike called with input: ' + JSON.stringify(input, null, 2)
    );
    const { id } = input;
    console.log(`pokemon id: ${id}`);
    return {
      id
    };
    // const { likableId } = input;
    // const likable = likables.find((l) => l.id === likableId);
    // if (!likable) return { likable: null };
    // likable.likesCount = likable.likesCount + 1;
    // return {
    //   likable,
    // };

  },
});

/**
 *  type Mutation {
 *    addLike(input: AddLikeInput!): AddLikePayload
 *  }
 */
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    data: getPokemonById,
  },
});

export const schema = new GraphQLSchema({ query: queryType, mutation: mutationType });

