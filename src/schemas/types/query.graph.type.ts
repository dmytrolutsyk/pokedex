import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import  PokemonGraph from './pokemon.graph.type';
import { PokemonServices } from '../../services';
import { BaseError } from '../../utils';


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

