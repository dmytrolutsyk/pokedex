import { PokemonType, MoveType } from '../enum';

export interface IMove {
    _id?: String,
    name?: String,
    description?: String,
    type?: PokemonType,
    moveType?: String,
    power?: Number,
    precision?: Number,
    powerPoint?: Number,
    target?: String,
    number?: Number,
}