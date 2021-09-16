import { GraphQLEnumType } from 'graphql';

// export const PokemonTypeGraph = new GraphQLEnumType({
  export default new GraphQLEnumType({
  name: 'PokemonType',
  description: 'The possible pokemon types.',
  values: {
    NORMAL: {
      value: 'NORMAL'
    },
    FIRE: {
      value: 'FIRE'
    },
    WATER: {
      value: 'WATER'
    },
    ELECTRIC: {
      value: 'ELECTRIC'
    },
    GRASS: {
      value: 'GRASS'
    },
    ICE: {
      value: 'ICE'
    },
    FIGHTING: {
      value: 'FIGHTING'
    },
    POISON: {
      value: 'POISON'
    },
    GROUND: {
      value: 'GROUND'
    },
    FLYING: {
      value: 'FLYING'
    },
    PSYCHIC: {
      value: 'PSYCHIC'
    },
    BUG: {
      value: 'BUG'
    },
    ROCK: {
      value: 'ROCK'
    },
    GHOST: {
      value: 'GHOST'
    },
    DRAGON: {
      value: 'DRAGON'
    },
    DARK: {
      value: 'DARK'
    },
    STEEL: {
      value: 'STEEL'
    },
    FAIRY: {
      value: 'FAIRY'
    }
  }
});
