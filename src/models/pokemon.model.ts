/** Modèle pour la classe Pokemon */

import { model, Schema, Document } from 'mongoose';
import { PokeType } from '../enum';
import { PokemonGraph } from '../schemas/types';
import { IPokemon } from '../interfaces';

export type IPokemonDocument = IPokemon & Document;

export const PokemonSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    // Pokenum: {
    //     type: Number,
    //     required: true
    // },
    // Type: {
    //     type: String,
    //     enum: Object.values(PokeType),
    //     required: true,
    // },
}, {
    versionKey: false,
    timestamps: true
});

export const PokemonModel = model('Pokemon',PokemonSchema);