import {
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLInputType,
    GraphQLFloat,
    GraphQLList
  } from 'graphql';

import PokemonTypeGraph from '../enums/pokemon.type.graph.enum'
import AbilityInput from './ability.input';
import TalentInput from './talent.input';


let PokemonInput :GraphQLInputType = new GraphQLInputObjectType({
  name: 'PokemonInput',
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
      type: new GraphQLList(GraphQLString),
    },
    abilities: {
      type: new GraphQLList(AbilityInput),
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
  })
});

export default PokemonInput;