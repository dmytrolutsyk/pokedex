import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'Category',
  description: 'The different criteria according to each one has a category, and these different criteria which vary according to the generations..',
  values: {
    PHYSIC: {
      value: 'PHYSIC'
    },
    SPECIAL: {
      value: 'SPECIAL'
    },
    STATUS: {
      value: 'STATUS'
    },
  }
});
