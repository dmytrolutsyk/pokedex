import { GraphQLSchema } from 'graphql';
import { queryType } from './types';

export default new GraphQLSchema({ query: queryType });
