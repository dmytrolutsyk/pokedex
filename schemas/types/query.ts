import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    helloworld: {
      type: GraphQLString,
      resolve: () => "hello world !"
    }
  }
});
