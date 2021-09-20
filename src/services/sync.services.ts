import { PokemonServices, TalentServices, PokeapiServices, MoveServices } from '.';
import { APIError, BaseError, Result } from '../utils';
import { IMoveDocument, IPokemonDocument, ITalentDocument } from '../models';
import { IPokemonDetails, ITalent } from '../interfaces';


export class SyncServices {
    private readonly name = 'PokeapiServices';
    private readonly toPopulate: string[] = []
    private readonly url = 'https://pokeapi.co';

    private pokeapiServices = new PokeapiServices();
    private talentServices = new TalentServices(); 
    private pokemonServices = new PokemonServices();
    private moveServices = new MoveServices();

    constructor(){
        this.syncTalent = this.syncTalent.bind(this);
        this.syncTalents = this.syncTalents.bind(this);
    };

    public async syncTalent(id: number): Promise<Result<ITalentDocument>> {
        const log = `${this.name} :: syncTalent`;
        console.log(`${log} :: id = `, id);

        let result: Result<ITalentDocument>;
        try {
            const fetch = await this.pokeapiServices.talent(id);
            if (fetch.error) throw new Error(((fetch.message) as BaseError).name);

            const insert = await this.talentServices.insert(fetch.message as ITalent);
            if (insert.error) throw new Error(((fetch.message) as BaseError).name);
            
            result = new Result<ITalentDocument>(insert.message);
        }
        catch (error) {
            const resultError = new APIError('???');
            result = new Result<ITalentDocument>(resultError as BaseError, true);
        }
        return result;
    }

    public async syncTalents(min: number, max: number): Promise<Result<ITalentDocument[]>> {
        let result: Result<ITalentDocument[]>;

        try {
            const talents: ITalentDocument[] = [];
            for (let i = min; i <= max; i++) {
                let sync = await this.syncTalent(i);
                if (sync.error) continue;

                const talent = sync.message as ITalentDocument
                talents.push(talent);
            }
            result =  new Result<ITalentDocument[]>(talents);
            
        }
        catch (error) {
            // const resultError = new APIError('???');
            result =  new Result<ITalentDocument[]>([]);
        }
        return result;
    }

    public async syncPokemon(pokenum: number): Promise<Result<IPokemonDocument>> {
        const log = `${this.name} :: syncPokemon`;
        console.log(`${log} :: pokenum = `, pokenum);

        let result: Result<IPokemonDocument>;
        try {
            const fetch = await this.pokeapiServices.pokemon(pokenum);
            if (fetch.error) throw new Error(((fetch.message) as BaseError).name);
            const pokemon = fetch.message as IPokemonDocument;

            const fetchPokemonDetails = await this.pokeapiServices.pokemonDetails(pokenum);
            if (fetchPokemonDetails.error) throw new Error(((fetchPokemonDetails.message) as BaseError).name);
            
            const details = fetchPokemonDetails.message as IPokemonDetails;
            pokemon.name = details.name;
            pokemon.description = details.description;
            pokemon.species = details.species;

            const talentIds: string[] = [];
            const talentNums = pokemon.talents as string[];
            for (let number of talentNums) {
                const fetchTalent = await this.talentServices.getByField('number', number);
                if (!fetchTalent.error) {
                    const talent = fetchTalent.message as ITalentDocument;
                    talentIds.push(talent._id);
                }
            }
            pokemon.talents = talentIds;

            const moveIds: string[] = [];
            const moveNums = pokemon.moves as string[];
            for (let number of moveNums) {
                const fetchMove = await this.moveServices.getByField('number', number);
                if (!fetchMove.error) {
                    const move = fetchMove.message as IMoveDocument;
                    moveIds.push(move._id);
                }
            }
            pokemon.moves = moveIds;

            const insert = await this.pokemonServices.insert(pokemon);
            if (insert.error) throw new Error(((fetch.message) as BaseError).name);
            
            result = new Result<IPokemonDocument>(insert.message);
        }
        catch (error) {
            const resultError = new APIError('???');
            result = new Result<IPokemonDocument>(resultError as BaseError, true);
        }
        return result;
    }

    public async syncPokemons(min: number, max: number): Promise<Result<IPokemonDocument[]>> {
        let result: Result<IPokemonDocument[]>;

        try {
            const pokemons: IPokemonDocument[] = [];
            for (let id = min; id <= max; id++) {
                const sync = await this.syncPokemon(id);
                if (sync.error) continue;
                
                const pokemon = sync.message as IPokemonDocument
                pokemons.push(pokemon);
            }
            result =  new Result<IPokemonDocument[]>(pokemons);
            
        }
        catch (error) {
            // const resultError = new APIError('???');
            result =  new Result<IPokemonDocument[]>([]);
        }
        return result;
    }

    // public async syncEvolution(pokenum: number): Promise<Result<IPokemonDocument>>  {
    //     const log = `${this.name} :: syncEvolution`;
    //     console.log(`${log} :: pokenum = `, pokenum);

    //     let result: Result<IPokemonDocument>;
    //     try {
    //         const fetch = await this.pokemonServices.getByField('pokenum', `${pokenum}`);
    //         if (fetch.error) throw new Error(((fetch.message) as BaseError).name);
    //         const pokemon = fetch.message as IPokemonDocument;

    //         const fetchPokemonDetails = await this.pokeapiServices.pokemonDetails(pokenum);
    //         if (fetchPokemonDetails.error) throw new Error(((fetchPokemonDetails.message) as BaseError).name);
            
    //         const details = fetchPokemonDetails.message as IPokemonDetails;

    //         const fetchEvolution = await this.pokeapiServices.evolutions(details.evolution_chain as string);
    //         if (fetchEvolution.error) throw new Error(((fetchEvolution.message) as BaseError).name);

    //         const evolutions: String[] = [];
    //         for (const number in  fetchEvolution.message as string[]) {
    //             const fetchPokemon = await this.pokemonServices.getByField('pokenum', number)
    //             if (fetchPokemon) console.error(fetchPokemon);
    //             const evolution = fetchPokemon.message as IPokemonDocument;
    //             evolutions.push(evolution._id);
    //         }
    //         pokemon.evolutions = evolutions;

    //         const updated = await this.pokemonServices.update(pokemon._id, pokemon);
    //         if (updated.error) throw new Error(((fetch.message) as BaseError).name);
            
    //         result = new Result<IPokemonDocument>(updated.message);
    //     }
    //     catch (error) {
    //         const resultError = new APIError('???');
    //         result = new Result<IPokemonDocument>(resultError as BaseError, true);
    //     }
    //     return result;
    // }
    
    // public async syncEvolutions(min: number, max: number): Promise<Result<IPokemonDocument[]>> {
    //     let result: Result<IPokemonDocument[]>;

    //     try {
    //         const pokemons: IPokemonDocument[] = [];
    //         for (let id = min; id <= max; id++) {
    //             const sync = await this.syncEvolution(id);
    //             if (sync.error) continue;
                
    //             const pokemon = sync.message as IPokemonDocument
    //             pokemons.push(pokemon);
    //         }
    //         result =  new Result<IPokemonDocument[]>(pokemons);
            
    //     }
    //     catch (error) {
    //         // const resultError = new APIError('???');
    //         result =  new Result<IPokemonDocument[]>([]);
    //     }
    //     return result;
    // }
    
    public async syncMove(id: number): Promise<Result<IMoveDocument>> {
        const log = `${this.name} :: syncMove`;
        console.log(`${log} :: id = `, id);

        let result: Result<IMoveDocument>;
        try {
            const fetch = await this.pokeapiServices.move(id);
            if (fetch.error) throw new Error(((fetch.message) as BaseError).name);
            const move = fetch.message as IMoveDocument;

            const insert = await this.moveServices.insert(move);
            if (insert.error) throw new Error(((fetch.message) as BaseError).name);
            
            result = new Result<IMoveDocument>(insert.message);
        }
        catch (error) {
            const resultError = new APIError('???');
            result = new Result<IMoveDocument>(resultError as BaseError, true);
        }
        return result;
    }

    public async syncMoves(min: number, max: number): Promise<Result<IMoveDocument[]>> {
        let result: Result<IMoveDocument[]>;

        try {
            const moves: IMoveDocument[] = [];
            for (let id = min; id <= max; id++) {
                const sync = await this.syncMove(id);
                if (sync.error) continue;
                
                const move = sync.message as IMoveDocument
                moves.push(move);
            }
            result =  new Result<IMoveDocument[]>(moves);
            
        }
        catch (error) {
            // const resultError = new APIError('???');
            result =  new Result<IMoveDocument[]>([]);
        }
        return result;
    }
}