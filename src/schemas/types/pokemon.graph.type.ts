import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat,
    GraphQLList
  } from 'graphql';
import { PokeapiServices } from '../../services';

import PokemonTypeGraph from '../enums/pokemon.type.graph.enum'
import MoveGraph from './move.graph.type';
import TalentGraph from './talent.graph.type';

const pokeapiServices = new PokeapiServices();


let PokemonGraph :GraphQLObjectType = new GraphQLObjectType({
  name: 'Pokemon',
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString,
      resolve: async (obj) => {
        if (obj?.name != null) return obj.name;
        const fetch = await pokeapiServices.pokemonName(obj?.pokenum);
        if (fetch.error) return null
        return fetch.message
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
    /*Location: {
      type: GraphQLString,
    },*/
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
    },
    sprite: {
      type: GraphQLString,
    },
    species: {
      type: GraphQLString,
    }
  })
});

export default PokemonGraph;