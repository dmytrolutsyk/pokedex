import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat,
    GraphQLList
  } from 'graphql';
import PokemonTypeGraph from '../enums/pokemon.type.graph.enum'
import AbilityGraph from '../types/ability.graph.type';
import TalentGraph from '../types/talent.graph.type';
import PokemonGraph from '../types/pokemon.graph.type';
import { mutationWithClientMutationId } from 'graphql-relay';
import { PokemonServices } from '../../services';
import { IPokemon } from '../../interfaces';
import { PokemonType } from '../../enum';


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
        //   talents: {
        //     type: new GraphQLList(TalentInput),
        //   },
        //   abilities: {
        //     type: new GraphQLList(AbilityGraph),
        //   },
        //   evolutions: {
        //     type: new GraphQLList(PokemonGraph),
        //   },
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
      console.log({input});
      try {
        const pokemonServices = new PokemonServices();
        const pokemon: IPokemon = { 
            name: input.name,
            pokenum: 6,
            height: 170,
            weight: 90.5,
            color: 'Orange',
            type: [PokemonType.FIRE, PokemonType.FLYING],
            sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
        };
        const insert = await pokemonServices.insert(pokemon);
        console.log({ insert });
        return {
            pokemon,
          };
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