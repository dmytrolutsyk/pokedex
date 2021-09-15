import mongoose from 'mongoose';
import { PokemonTypeGraph } from '../../schemas/enums';
import { PokemonGraph } from '../../schemas/types';
import { PokemonServices } from '../../services';

export class DatabaseConfig {
    
    private username!: string;
    private password!: string;
    private static instance: DatabaseConfig;

    constructor() {
        this.username = process.env.DB_USER as string;
        this.password = process.env.DB_PASSWORD as string;

        this.connect = this.connect.bind(this);
    }

    public static getInstance(): DatabaseConfig {
        if(!DatabaseConfig.instance)
        DatabaseConfig.instance = new DatabaseConfig();

        return DatabaseConfig.instance;
    }

    public async connect() {
        const pokemonServices = new PokemonServices();

        try {
            console.log(`mongodb://${this.username}:${this.password}@pokedex_db`);
            await mongoose.connect(`mongodb://${this.username}:${this.password}@pokedex_db`, { 
                useNewUrlParser: true, 
                useUnifiedTopology: true }
            )
;
            console.log(`API Connexion to database : ${mongoose.connection.readyState === 1 ? 'Connected': 'Disconnected'}`);

            const getAllPokemon = await pokemonServices.getAll();
            if (getAllPokemon.error || (getAllPokemon.message as mongoose.Document[])?.length == 0) {
                await this.initiate();
            }
        }
        catch(error) {
            console.error(error);
        }
    }

    public async initiate() {
        try {
            const pokemonServices = new PokemonServices();
            const pokemon = { 
                Name: 'dracaufeu',
                Pokenum: 6,
                Height: 1.7,
                Weight: 90.5,
                Color: 'Orange'
            }
            const insert = await pokemonServices.insert(pokemon);
            console.log({ insert });
        }
        catch (error) {
            console.error(error);
        }
    }
}
