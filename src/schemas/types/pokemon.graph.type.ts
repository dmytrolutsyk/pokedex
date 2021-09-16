import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat,
    GraphQLList
  } from 'graphql';

import PokemonTypeGraph from '../enums/pokemon.type.graph.enum'
import AbilityGraph from './ability.graph.type';
import TalentGraph from './talent.graph.type';


let PokemonGraph :GraphQLObjectType = new GraphQLObjectType({
  name: 'Pokemon',
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    pokenum: {
      type: GraphQLInt,
    },
    type: {
      // type: new GraphQLList(PokemonTypeGraph),
      // resolve: obj => {
      //       return obj.PokeType;
      // }
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
    abilities: {
      type: new GraphQLList(AbilityGraph),
    },
    evolutions: {
      type: new GraphQLList(PokemonGraph),
    },
    description: {
      type: GraphQLString,
    },
    sprite: {
      type: GraphQLString,
    }
  })
});

export default PokemonGraph;