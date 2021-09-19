import { Model } from 'mongoose';

import { CommonServices } from '.';
import { IPokemon } from '../interfaces';
import { PokemonModel, IPokemonDocument } from '../models/pokemon.model';


export class PokemonServices extends CommonServices<IPokemonDocument, IPokemon>{
    
    constructor() { super('PokemonServices', ['talents', 'moves']); };

    protected getModel(): Model<IPokemonDocument> { return PokemonModel };

}