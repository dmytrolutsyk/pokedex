import { AbilityType, PokemonType } from '../enum';
import Talent from '../schemas/types/talent.graph.type'
import TalentInput  from '../schemas/inputs/talent.input';
export interface IPokemon {
    _id?: String,
    name?: String,
    pokenum?: Number,
    type?: PokemonType[],
    height?: Number,
    weight?: Number,
    color?: String,
    sprite?: String,
    // trainer: TrainerType,
    // location: String,
     talents?: ITalent[],
     evolutions?: String[],
     description?: String
     abilities?: AbilityType[],
}




export interface ITalent {
    _id?: String,
    name?: String,
    escription?: String

}