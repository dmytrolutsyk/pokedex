import { PokemonServices, TalentServices, PokeapiServices } from '.';
import { APIError, BaseError, Result } from '../utils';
import { IPokemonDocument, ITalentDocument } from '../models';
import { IPokemon, ITalent } from '../interfaces';
import { createPrinter } from 'typescript';


export class SyncServices {
    private readonly name = 'PokeapiServices';
    private readonly toPopulate: string[] = []
    private readonly url = 'https://pokeapi.co';

    private pokeapiServices = new PokeapiServices();
    private talentServices = new TalentServices(); 
    private pokemonServices = new PokemonServices();

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
                if (sync.error) {
                    // handle error
                    // return null;
                }
                else {
                    const talent = sync.message as ITalentDocument
                    // console.log({ talent });
                    talents.push(talent);
                }
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

            const fetchName = await this.pokeapiServices.pokemonName(pokenum);
            if (fetchName.error) throw new Error(((fetchName.message) as BaseError).name);
            pokemon.name = fetchName.message as String;

            const insert = await this.pokemonServices.insert(fetch.message as ITalent);
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
}