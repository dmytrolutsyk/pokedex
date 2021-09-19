import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';


export const TalentGraph = new GraphQLObjectType({
  name: 'Talent',
  fields: {
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString,
    },
    url: {
      type: GraphQLString
    }
  },
});
