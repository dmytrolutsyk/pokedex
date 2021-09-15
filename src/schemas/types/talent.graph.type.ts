import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

export const TalentGraph = new GraphQLObjectType({
  name: 'Talent',
  fields: {
    Id: {
      type: GraphQLID
    },
    Name: {
      type: GraphQLString
    },
    Description: {
      type: GraphQLString,
    },
  }
});
