import { PokemonType } from '../enum';

export interface IPokemon {
    _id?: String,
    name?: String,
    pokenum?: Number,
    type?: PokemonType[],
    height?: Number,
    weight?: Number,
    color?: String,
    sprite?: String
    // trainer: TrainerType,
    // location: String,
    // talents: [Talent],
    // evolutions: [String],
    // description: String,
}