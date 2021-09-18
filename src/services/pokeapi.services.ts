import axios from 'axios';

import { APIError, BaseError, Result } from '../utils';
import { IPokemon, ITalent } from '../interfaces';


export class PokeapiServices {
    private readonly name = 'PokeapiServices';
    private readonly url = 'https://pokeapi.co';
    
    constructor(){
        this.pokemon = this.pokemon.bind(this);
        this.pokemonName = this.pokemonName.bind(this);
        
        this.talent = this.talent.bind(this);
        this.talents = this.talents.bind(this);
    };

    public async pokemonName(id: number): Promise<Result<String>> {
        const log = `${this.name} :: pokemonName`;
        console.log(`${log} :: id = ${id}`); 

        let result: Result<String>;
        try {
            const { data } = await axios.get(`${this.url}/api/v2/pokemon-species/${id}`);
            //TODO: handle error
            
            const name = data?.names.find((_: any) => _?.language?.name == 'fr')?.name;
            //TODO: handle error

            result = new Result<String>(name);
        }
        catch(error) {
            console.error(`${log}: `, error);
            const resultError = new APIError('POKEAPI_FETCH_ERROR');
            result = new Result<String>(resultError as BaseError, true);
        }
        return result;
    }

    public async pokemon(id: number): Promise<Result<IPokemon>> {
        const log = `${this.name} :: pokemon`;
        console.log(`${log} :: id = ${id}`);
        
        let result: Result<IPokemon>;
        try {      
            
            const { data } = await axios.get(`${this.url}/api/v2/pokemon/${id}`);
            //TODO: handle error
            
            const pokemon: IPokemon = {
                // name: data?.name,
                pokenum: data?.id,
                height: data?.height * 10,
                weight: data?.weight * 0.10,
                species: data?.species?.name,
                sprite: data?.sprites.front_default,
                type: data?.types?.map((_: any) => (_?.type?.name as String).toUpperCase()),
            }
            /// name fetch from url : https://pokeapi.co/api/v2/pokemon-species/132/ => names
            // talents fetch from url : https://pokeapi.co/api/v2/ability/7/
            // locations fetch from url : https://pokeapi.co/api/v2/pokemon/132/encounters
            // moves : https://pokeapi.co/api/v2/move/144/ 
            //TODO: handle error

            result = new Result<IPokemon>(pokemon);
        }
        catch(error) {
            console.error(`${log}: `, error);
            const resultError = new APIError('POKEAPI_FETCH_ERROR');
            result = new Result<IPokemon>(resultError as BaseError, true);
        }
        return result;
    }


    public async talents(): Promise<Result<ITalent[]>> {
        const log = `${this.name} :: talents`; 
        console.log(log);
        
        let result: Result<ITalent[]>;
        try {
            const { data } = await axios.get(`${this.url}/api/v2/ability?limit=350`);
            //TODO: handle error
            const { results } = data;
            console.log ({ results });

            
            const talents: ITalent[] = results?.map((_: any) => { 
                    const talent: ITalent = {
                        name: _.name,
                        // url: _.url,
                    }
                    return talent; 
                } 
            ) ?? [];
            //TODO: handle error

            result = new Result<ITalent[]>(talents);
        }
        catch(error) {
            console.error(`${log}: `, error);
            const resultError = new APIError('POKEAPI_FETCH_ERROR');
            result = new Result<ITalent[]>(resultError as BaseError, true);
        }
        return result;
    }

    public async talent(id: number): Promise<Result<ITalent>> {
        const log = `${this.name} :: talent`; 
        console.log(`${log} :: id = ${id}`);
        
        let result: Result<ITalent>;
        try {
            const { data } = await axios.get(`${this.url}/api/v2/ability/${id}`);
            //TODO: handle error
            
            const talent: ITalent = {
                name: data?.names?.find((_: any) => _.language?.name == 'fr')?.name,
                description: data?.flavor_text_entries?.find((_: any) => _.language?.name == 'fr')?.flavor_text
            };
            //TODO: handle error
            
            result = new Result<ITalent>(talent);
        }
        catch(error) {
            console.error(`${log}: `, error);
            const resultError = new APIError('POKEAPI_FETCH_ERROR');
            result = new Result<ITalent>(resultError as BaseError, true);
        }
        return result;
    }
}