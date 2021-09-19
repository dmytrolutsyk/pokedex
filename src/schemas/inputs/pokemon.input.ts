import {
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLInputType,
    GraphQLFloat,
    GraphQLList
  } from 'graphql';

import PokemonTypeGraph from '../../graphs/pokemon.type.graph'
import MoveInput from './move.input';
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
  })
});

export default PokemonInput;