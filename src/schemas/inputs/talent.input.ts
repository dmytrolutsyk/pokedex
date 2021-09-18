import { GraphQLInputObjectType, GraphQLID, GraphQLString } from 'graphql';

let TalentInput :GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'TalentInput',
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString,
    },
  }
});

export default TalentInput