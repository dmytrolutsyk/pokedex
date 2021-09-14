import { GraphQLSchema } from 'graphql';
import queryType from './types/query';

export default new GraphQLSchema({ query: queryType });
