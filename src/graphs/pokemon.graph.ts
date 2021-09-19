import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLList } from 'graphql';

import { PokeapiServices } from '../services';
import { MoveGraph, TalentGraph } from '.';
import PokemonTypeGraph from './pokemon.type.graph'
import { IPokemonDetails } from '../interfaces';


const pokeapiServices = new PokeapiServices();

export let PokemonGraph: GraphQLObjectType = new GraphQLObjectType({
  name: 'Pokemon',
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString,
      resolve: async (obj) => {
        if (obj?.name != null) return obj.name;
        const fetch = await pokeapiServices.pokemonDetails(obj?.pokenum);
        if (fetch.error) return null
        return fetch.message.name;
      }
    },
    pokenum: {
      type: GraphQLInt,
    },
    type: {
      type: new GraphQLList(PokemonTypeGraph),
      resolve: obj => {
          return obj.type;
      }
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
      type: new GraphQLList(TalentGraph),
    },
    moves: {
      type: new GraphQLList(MoveGraph),
    },
    evolutions: {
      type: new GraphQLList(PokemonGraph),
    },
    description: {
      type: GraphQLString,
      resolve: async (obj) => {
        if (obj?.description != null) return obj.description;
        const fetch = await pokeapiServices.pokemonDetails(obj?.pokenum);
        if (fetch.error) return null
        return (fetch.message as IPokemonDetails).description;
      }
    },
    sprite: {
      type: GraphQLString,
    },
    species: {
      type: GraphQLString,
      resolve: async (obj) => {
        if (obj?.description != null) return obj.description;
        const fetch = await pokeapiServices.pokemonDetails(obj?.pokenum);
        if (fetch.error) return null
        return (fetch.message as IPokemonDetails).species;
      }
    }
  })
});