import { GraphQLObjectType } from 'graphql';
import { Document, Model, Types } from 'mongoose';

import { APIError, BaseError, Result } from '../utils';
import { PokemonSchema, PokemonModel, IPokemonDocument } from '../models/pokemon.model';
import { PokemonGraph } from '../schemas/types';
import { IPokemon } from '../interfaces';

export class PokemonServices {
    private readonly name = 'PokemonServices';
    private readonly toPopulate: string[] = []
    
    
    constructor(){
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.insert = this.insert.bind(this);
    };

    private getModel(): typeof PokemonModel { return PokemonModel };

    public async getAll(): Promise<Result<IPokemonDocument[]>>{
        console.log(`${new Date()} :: ${this.name}.getAll`);

        let result: Result<IPokemonDocument[]>;

        try {
            let array: IPokemonDocument[]; 

            // if (!this.isToBePopulated())
                array = await this.getModel().find() as IPokemonDocument[];
            // else 
                // array = await this.getModel().find().populate(this.toPopulate) as Type[];
            result = new Result(array);
        }
        catch (error) {
            // console.log(error?.message); 
            const resultError = new APIError('DB_FETCH_ERROR');
            result = new Result<IPokemonDocument[]>(resultError as BaseError, true);
        }
        return result;
    }

    public async getById(id: string): Promise<Result<IPokemonDocument>> {
        console.log(`${new Date()} :: ${this.name}.getById, id = ${id}`);
        
        let result: Result<IPokemonDocument>;
        try {
            // if(!Types.ObjectId.isValid(id)) throw new Error('BAD REQUEST : Id not valid');

            let pokemon = await this.getModel().findById(id) as IPokemonDocument;
            if(!pokemon) throw new Error('BAD REQUEST : Object not found');

            // object = await this.populate(object);

            result = new Result<IPokemonDocument>(pokemon);
        }
        catch(error) {
            // console.log(`${new Date()} :: ${this.name}.getById :: ERROR: `, error);
            const resultError = new APIError('DB_FETCH_ERROR');
            result = new Result<IPokemonDocument>(resultError as BaseError, true);
        }
        return result;
    }

    public async insert(data: Object): Promise<Result<IPokemonDocument>> {
        console.log(`${new Date()} :: ${this.name}.insert, object = `, data);

        let result: Result<IPokemonDocument>;

        try {
            let object: IPokemonDocument = await this.getModel().create(data) as IPokemonDocument;
            if(!object) throw new Error('ERROR : Could not create object');

            // object = await this.populate(object);

            result = new Result(object);
        } 
        catch (error) {
            // console.log(error?.message); 
            console.log(error);
            const resultError = new APIError('DB_INSERT_ERROR');
            result = new Result<IPokemonDocument>(resultError as BaseError, true);
        }
        return result;
    }

}