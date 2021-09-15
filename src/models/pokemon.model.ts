// /** Modèle pour la classe Pokemon */

// import { Document, model, Types, Schema } from 'mongoose';

// // import { IPlant } from '../interfaces';
// import { PokeType } from '../enum';


// export type IPokemonDocument = IPokemon & Document;

// export const PokemonSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     ref: {
//         type: String,
//         required: false,
//     },
//     temperature: {
//         type: String,
//         enum: Object.values(PokeType),
//         required: true,
//     },
//     humidity: {
//         type: String,
//         enum: Object.values(PokeType),
//         required: true,
//     },
//     light: {
//         type: String,
//         enum: Object.values(PokeType),
//         required: true,
//     },
// }, {
//     versionKey: false,
//     timestamps: true
// });

// export const PokemonModel = model<IPokemonDocument>('Pokemon',PokemonSchema);
