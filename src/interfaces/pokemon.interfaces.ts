import { PokemonType } from '../enum';
import Talent from '../schemas/types/talent.graph.type'

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
     talents?: String[],
     evolutions?: String[],
     description?: String,
}