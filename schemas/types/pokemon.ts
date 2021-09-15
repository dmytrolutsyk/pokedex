import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat,
    GraphQLList
  } from 'graphql';
  import Category from '../enums/Category';
  import Capacity from '../types/Capacity';

  import PokeType from '../enums/PokeType';
  import Talent from './talent';

  var pokemon :GraphQLObjectType = new GraphQLObjectType({
    name: 'Pokemon',
    fields: () => ({
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
        type: new GraphQLList(PokeType),
        resolve: obj => {
              return obj.PokeType;
        }
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
      Category: {
        type: Category
      },
      Talents: {
        type: new GraphQLList(Talent),
      },
      Capacities: {
        type: new GraphQLList(Capacity),
      },
      Evolutions: {
        type: new GraphQLList(pokemon),
      },
      Description: {
        type: GraphQLString,
      },
      Sprite: {
        type: GraphQLString,
      }
    })
  });

  export default pokemon;
  