import axios from 'axios';

import { APIError, BaseError, Result } from '../utils';
import { IMove, IPokemon, ITalent, IPokemonDetails } from '../interfaces';
import { PokemonType } from '../enum';


export class PokeapiServices {
    private readonly name = 'PokeapiServices';
    private readonly url = 'https://pokeapi.co';
    
    constructor(){
        this.pokemon = this.pokemon.bind(this);
        this.pokemonDetails = this.pokemonDetails.bind(this);

        this.talent = this.talent.bind(this);
        this.talents = this.talents.bind(this);

        this.move = this.move.bind(this);
    };

    public async pokemonDetails(id: number): Promise<Result<IPokemonDetails>> {
        const log = `${this.name} :: pokemonDetails`;
        console.log(`${log} :: id = ${id}`);

        let result: Result<IPokemonDetails>;
        try {
            const { data } = await axios.get(`${this.url}/api/v2/pokemon-species/${id}`);
            //TODO: handle error
            
            const name = data?.names.find((_: any) => _?.language?.name == 'fr')?.name;
            const description = data?.flavor_text_entries
                ?.find((_: any) => _?.language?.name == 'fr')?.flavor_text
                ?.split('\n')
                ?.join(' ');
            const species = data?.genera?.find((_: any) => _?.language?.name == 'fr')?.genus;
            
            const details: IPokemonDetails = {
                name: name, 
                description: description,
                species: species,
                evolution_chain: this.idFromUrl(data?.evolution_chain?.url).toLocaleString(),
            }
            result = new Result<IPokemonDetails>(details);
        }
        catch(error) {
            // console.error(`${log}: `, error);
            const resultError = new APIError('POKEAPI_FETCH_ERROR');
            result = new Result<IPokemonDetails>(resultError as BaseError, true);
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
            
            // const talentsIds: String[] = data?.abilities?.map((_: any) => { this.idFromUrl(_.ability?.url).toLocaleString(); });
            // const movesIds: String[] = data?.moves?.map((_: any) => { this.idFromUrl(_.move?.url).toLocaleString(); });

            const pokemon: IPokemon = {
                pokenum: data?.id,
                height: data?.height * 10,
                weight: data?.weight * 0.10,
                sprite: data?.sprites?.front_default,
                type: data?.types?.map((_: any) => (_?.type?.name as String)?.toUpperCase()),
                talents: data?.abilities?.map((_: any) => { this.idFromUrl(_.ability?.url).toLocaleString(); }),
                moves: data?.moves?.map((_: any) => { this.idFromUrl(_.move?.url).toLocaleString(); }),
            }

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
                        number: _.id,
                        // url: _.url,
                    }
                    return talent; 
                } 
            ) ?? [];
            //TODO: handle error

            result = new Result<ITalent[]>(talents);
        }
        catch(error) {
            // console.error(`${log}: `, error);
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
                number: data?.id,
                name: data?.names?.find((_: any) => _.language?.name == 'fr')?.name,
                description: (data?.flavor_text_entries
                    ?.find((_: any) => _.language?.name == 'fr')?.flavor_text as String)
                    ?.split('\n')
                    ?.join(' ')
            };
            //TODO: handle error
            result = new Result<ITalent>(talent);
        }
        catch(error) {
            // console.error(`${log}: `, error);
            const resultError = new APIError('POKEAPI_FETCH_ERROR');
            result = new Result<ITalent>(resultError as BaseError, true);
        }
        return result;
    }

    public async move(id: number): Promise<Result<IMove>> {
        const log = `${this.name} :: move`; 
        console.log(`${log} :: id = ${id}`);
        
        let result: Result<IMove>;
        try {
            const { data } = await axios.get(`${this.url}/api/v2/move/${id}`);
            //TODO: handle error
            
            const move: IMove = {
                name: data?.names?.find((_: any) => _.language?.name == 'fr')?.name,
                description: (data?.flavor_text_entries
                    ?.find((_: any) => _.language?.name == 'fr')?.flavor_text as String)
                    ?.split('\n')
                    ?.join(' '),
                type: (data?.type?.name as String).toUpperCase() as PokemonType,
                moveType: (data?.damage_class?.name as String)?.toUpperCase(),
                power: data?.power,
                precision: data?.accuracy,
                powerPoint: data?.pp,
                target: data?.target?.name,
                number: data?.id,
            };
            //TODO: handle error
            
            result = new Result<IMove>(move);
        }
        catch(error) {
            // console.error(`${log}: `, error);
            const resultError = new APIError('POKEAPI_FETCH_ERROR');
            result = new Result<IMove>(resultError as BaseError, true);
        }
        return result;
    }

    public async evolutions(id: string): Promise<Result<String[]>> {
        const log = `${this.name} :: evolutions`; 
        console.log(`${log} :: id = ${id}`);
        
        let result: Result<String[]>;
        try {
            const { data } = await axios.get(`${this.url}/api/v2/evolution-chain/${id}`);
            //TODO: handle error
            
            const pokenums: String[] = [];

            const pokenum = this.idFromUrl(data?.chain?.species?.url)?.toLocaleString() as string;
            if (pokenum != null) pokenums.push(pokenum);

            let evolves = data?.chain?.evolves_to;
            while (evolves?.length > 0) {
                const numbers = evolves.map((_: any) => this.idFromUrl(_.species?.url).toLocaleString()) as string[];
                numbers.forEach(number => { pokenums.push(number); });

                evolves = evolves[0].evolves_to;
            }
            
            result = new Result<String[]>(pokenums);
        }
        catch(error) {
            console.error(`${log}: `, error);
            const resultError = new APIError('POKEAPI_FETCH_ERROR');
            result = new Result<String[]>(resultError as BaseError, true);
        }
        return result;
    }

    public idFromUrl(url?: string): number {
        return url
            ?.toString()
            ?.split('/')
            ?.map((_: string) => parseInt(_) as number)
            ?.find((_: number) => !isNaN(_)) as number;
    } 
}