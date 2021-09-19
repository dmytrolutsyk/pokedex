/** Modèle pour la classe Move */

import { model, Schema, Document, Types } from 'mongoose';

import { IMove } from '../interfaces';
import { MoveType, PokemonType } from '../enum';

export type IMoveDocument = IMove & Document;

export const MoveSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    }, 
    type: {
        type: String,
        enum: Object.values(PokemonType),
    },
    moveType: {
        type: String,
        enum: Object.values(MoveType),
    },
    power: { 
        type: Number,
    },
    precision: {
        type: Number,
    },
    powerPoint: {
        type: Number,
    },
    target: {
        type: String,
    },
    number: {
        type: Number,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

export const MoveModel = model<IMoveDocument>('Move', MoveSchema);