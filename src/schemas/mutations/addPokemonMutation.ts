import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat,
    GraphQLList
  } from 'graphql';
import PokemonTypeGraph from '../enums/pokemon.type.graph.enum'
import AbilityInput from '../inputs/ability.input';
import PokemonGraph from '../types/pokemon.graph.type';
import { mutationWithClientMutationId } from 'graphql-relay';
import { PokemonServices } from '../../services';
import  {IPokemon} from '../../interfaces';
import { PokemonType } from '../../enum';
import TalentInput  from '../inputs/talent.input';
import PokemonInput from '../inputs/pokemon.input'

const addPokemonMutation = mutationWithClientMutationId({
    name: 'AddPokemon',
    description: 'Add a pokemon',
    inputFields: {
         _id: {
             type:  GraphQLID
           },
          name: {
            type: GraphQLString
          },
           pokenum: {
             type: GraphQLInt,
           },
           type: {
             type: new GraphQLList(PokemonTypeGraph),
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
             type: new GraphQLList(TalentInput),
           },
           abilities: {
             type: new GraphQLList(AbilityInput),
           },
           evolutions: {
             type: new GraphQLList(PokemonInput),
           },
           description: {
             type: GraphQLString,
           },
           sprite: {
             type: GraphQLString,
           }
    },
    outputFields: {
        pokemon: {
            type: PokemonGraph
        }
    },
    mutateAndGetPayload: async (input) => {
      console.log({ input });
      try {
        const pokemonServices = new PokemonServices();
        const pokemon: IPokemon = { 
            name: input.name,
            pokenum: input.pokenum,
            height: input.height,
            weight: input.weight,
            color: input.color,
            type: input.type,
            description: input.description,
            // talents: input.talents,
            // evolutions: input.evolutions,
            // abilities: input.abilities,
            sprite: input.sprite //"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
        };
        const insert = await pokemonServices.insert(pokemon);
        return { pokemon };
    }
    catch (error) {
        console.error(error);
        return {
            pokemon: null,
        };
    }
  
    },
  });
  
  export default addPokemonMutation;