import { PokemonType } from '../enum';
import { IMoveDocument, ITalentDocument } from '../models';

export interface IPokemon {
    _id?: String,
    name?: String,
    pokenum?: String,
    type?: PokemonType[],
    height?: Number,
    weight?: Number,
    color?: String,
    species?: String,
    sprite?: String,
    description?: String,
    talents?: String[] | ITalentDocument[],
    moves?: String[] | IMoveDocument[],
    evolutions?: String[]   // Pokemon[]
}