/** Modèle pour la classe Pokemon */

import { model, Schema, Document } from 'mongoose';

import { ITalent } from '../interfaces';


export type ITalentDocument = ITalent & Document;

export const TalentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    }
}, {
    versionKey: false,
    timestamps: true
});

export const TalentModel = model<ITalentDocument>('Talent',TalentSchema);