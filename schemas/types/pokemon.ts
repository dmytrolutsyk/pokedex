import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat,
    GraphQLList
  } from 'graphql';
  import Category from '../enums/Category';
  import Capacity from './Capacity';

  import PokeType from '../enums/PokeType';
  import Talent from './Talent';

  var pokemon :GraphQLObjectType = new GraphQLObjectType({
    name: 'Pokemon',
    fields: () => ({
      id: {
        type: GraphQLID
      },
      name: {
        type: GraphQLString
      },
      pokenum: {
        type: GraphQLInt,
      },
      type: {
        type: new GraphQLList(PokeType),
        resolve: obj => {
              return obj.PokeType;
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
      category: {
        type: Category
      },
      talents: {
        type: new GraphQLList(Talent),
      },
      capacities: {
        type: new GraphQLList(Capacity),
      },
      evolutions: {
        type: new GraphQLList(pokemon),
      },
      description: {
        type: GraphQLString,
      },
      sprite: {
        type: GraphQLString,
      }
    })
  });

  export default pokemon;
  