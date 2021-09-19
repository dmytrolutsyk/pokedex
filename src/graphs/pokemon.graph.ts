import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLList } from 'graphql';

import { PokeapiServices, PokemonServices } from '../services';
import { MoveGraph, TalentGraph } from '.';
import PokemonTypeGraph from './pokemon.type.graph'
import { IPokemonDetails } from '../interfaces';
import { IPokemonDocument } from '../models';


const pokeapiServices = new PokeapiServices();
const pokemonServices = new PokemonServices();

export let PokemonGraph: GraphQLObjectType = new GraphQLObjectType({
  name: 'Pokemon',
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString,
      resolve: async (obj) => {
        if (obj?.name != null) return obj.name;
        const fetch = await pokeapiServices.pokemonDetails(obj?.pokenum);
        if (fetch.error) return null
        return fetch.message.name;
      }
    },
    pokenum: {
      type: GraphQLString,
    },
    type: {
      type: new GraphQLList(PokemonTypeGraph),
      resolve: obj => {
          return obj.type;
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
    talents: {
      type: new GraphQLList(TalentGraph),
    },
    moves: {
      type: new GraphQLList(MoveGraph),
    },
    evolutions: {
      type: new GraphQLList(PokemonGraph),
      resolve: async (obj) => {
        if (obj?.evolutions.lenth > 0) return obj.evolutions;

        const fetch = await pokeapiServices.pokemonDetails(obj?.pokenum);
        if (fetch.error) return null
        const details = fetch.message as IPokemonDetails;

        const fetchEvolutionsNumbers = await pokeapiServices.evolutions(details.evolution_chain as string);
        if (fetchEvolutionsNumbers.error) return null;
        const pokenums = fetchEvolutionsNumbers.message as String[];

        const evolutions: IPokemonDocument[] = [];        
        for await (let number of pokenums) {
          const fetchPokemon = await pokemonServices.getByField('pokenum', number as string)
          if (fetchPokemon) console.error(fetchPokemon);
          const evolution = fetchPokemon.message as IPokemonDocument;
          console.log({evolution});
          evolutions.push(evolution);
        }
        return evolutions;
      }
    },
    description: {
      type: GraphQLString,
      resolve: async (obj) => {
        if (obj?.description != null) return obj.description;
        const fetch = await pokeapiServices.pokemonDetails(obj?.pokenum);
        if (fetch.error) return null
        return (fetch.message as IPokemonDetails).description;
      }
    },
    sprite: {
      type: GraphQLString,
    },
    species: {
      type: GraphQLString,
      resolve: async (obj) => {
        if (obj?.description != null) return obj.description;
        const fetch = await pokeapiServices.pokemonDetails(obj?.pokenum);
        if (fetch.error) return null
        return (fetch.message as IPokemonDetails).species;
      }
    }
  })
});