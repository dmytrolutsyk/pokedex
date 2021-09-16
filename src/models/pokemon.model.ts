/** Modèle pour la classe Pokemon */

import { model, Schema, Document } from 'mongoose';

import { IPokemon } from '../interfaces';
import { PokemonType } from '../enum';

export type IPokemonDocument = IPokemon & Document;

export const PokemonSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    pokenum: {
        type: Number,
        required: true
    },
    type: {
        type: [String],
        enum: Object.values(PokemonType),
        required: true,
    },
    height: {
        type: Number,
        required: false,
    },
    weight: {
        type: Number,
        required: false
    },
    color: {
        type: String, 
        required: false
    },
    talents: {
        type: [String],
        required: false,
        default: []
    },
    abilities: {
        type: [String],
        required: false,
        default: []
    },
    evolutions: {
        type: [String],
        required: false,
        default: []
    }, 
    description: {
        type: String,
        required: false
    }, 
    sprite: {
        type: String,
        required: false
    },
    species: {
        type: String, 
    }
}, {
    versionKey: false,
    timestamps: true
});

export const PokemonModel = model('Pokemon',PokemonSchema);