import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat
  } from 'graphql';

  import PokeType from '../enums/PokeType';
  import Talent from './talent';

  export default new GraphQLObjectType({
    name: 'Pokemon',
    fields: {
      Id: {
        type: GraphQLID
      },
      Name: {
        type: GraphQLString
      },
      Pokenum: {
        type: GraphQLInt,
      },
      Type: {
        type: PokeType,
      },
      Height: {
        type: GraphQLInt,
      },
      Weight: {
        type: GraphQLFloat,
      },
      Color: {
        type: GraphQLString,
      },
      /*Location: {
        type: GraphQLString,
      },*/
      Talents: {
        type: Talent,
      },
      Evolutions: {
        type: GraphQLString,
      },
      Description: {
        type: GraphQLString,
      },
      Sprite: {
        type: GraphQLString,
      }
    }
  });
  