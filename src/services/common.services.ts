import { Document, Model, Types } from 'mongoose';

import { APIError, BaseError, Result } from '../utils';


export abstract class CommonServices<Type extends Document, Data extends Object> {
    protected readonly name: string;
    protected readonly toPopulate: string[];

    constructor(name: string, toPopulate: string[] = []){
        this.name = name;
        this.toPopulate = toPopulate;

        this.getName = this.getName.bind(this);
        this.getModel = this.getModel.bind(this);
        this.getToPopulate = this.getToPopulate.bind(this);
        // this.isToBePopulated = this.isToBePopulated.bind(this);
        this.populate = this.populate.bind(this);

        this.getAll = this.getAll.bind(this);
        this.getAllByField = this.getAllByField.bind(this);
        this.getById = this.getById.bind(this);
        this.getByField = this.getByField.bind(this);
        this.insert = this.insert.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
    }

    protected abstract getModel(): Model<Type>;

    public getName(): string { return this.name };

    public getToPopulate(): string[] { return this.toPopulate; }
   
    // public isToBePopulated(): boolean { return this.toPopulate.length != 0; }

    public async getAll(): Promise<Result<Type[]>>{
        const log = `${this.getName()} :: getAll`;
        console.log(log);

        let result: Result<Type[]>;

        try {
            let array: Type[]; 

            // if (!this.isToBePopulated())
            //     array = await this.getModel().find() as Type[];
            // else 
            array = await this.getModel().find().populate(this.toPopulate) as Type[];
            result = new Result<Type[]>(array);
        }
        catch(error) {
            // console.error(`${log} :`, error);
            const resultError = new APIError('DB_FETCH_ERROR');
            result = new Result<Type[]>(resultError as BaseError, true);
        }
        return result;
    }

    public async getById(id: string): Promise<Result<Type>> {
        const log = `${this.getName()} :: getById`;
        console.log(`${log} :: id = ${id}`);
        
        let result: Result<Type>;
        try {
            //if(!Types.ObjectId.isValid(id)) throw new Error('BAD REQUEST : Id not valid');

            let object = await this.getModel().findById(id) as Type;
            if(!object) throw new Error('BAD REQUEST : Object not found');

            object = await this.populate(object);

            result = new Result<Type>(object);
        }
        catch(error) {
            // console.error(`${log} :`, error);
            const resultError = new APIError('DB_FETCH_ERROR');
            result = new Result<Type>(resultError as BaseError, true);
        }
        return result;
    }

    public async getByField(field: string, value: string): Promise<Result<Type>> {
        const log = `${this.getName()} :: getByField`;
        console.log(`${log} :: field = ${field}, value = ${value}`);
        
        let result: Result<Type>;
        try {
            const json = `{"${field}": "${value}"}`;
            let object = await this.getModel().findOne(JSON.parse(json)) as Type;
            // if(!object) throw new Error('BAD REQUEST : Object not found');

            object = await this.populate(object);

            result = new Result<Type>(object);
        }
        catch(error) {
            console.error(`${log} :`, error);
            const resultError = new APIError('DB_FETCH_ERROR');
            result = new Result<Type>(resultError as BaseError, true);
        }
        return result;
    }

    public async insert(data: Data): Promise<Result<Type>> {
        const log = `${this.getName()} :: insert`;
        console.log(`${log} :: object = `, data);

        let result: Result<Type>;
        try {
            let object: Type = await this.getModel().create(data) as Type;
            if(!object) throw new Error('ERROR : Could not create object');

            object = await this.populate(object);

            result = new Result<Type>(object);
        } 
        catch(error) {
            console.error(`${log} :`, error);
            const resultError = new APIError('DB_INSERT_ERROR');
            result = new Result<Type>(resultError as BaseError, true);
        }
        return result;
    }

    public async update(id: string, data: Data): Promise<Result<Type>> {
        const log = `${this.getName()} :: update`;
        console.log(`${log} :: id = ${id}`);

        let result: Result<Type>;
        try {
            let object = await this.getModel().findByIdAndUpdate(id, data as any, { useFindAndModify: false, new: true }) as Type;
            if (!object) throw new Error('BAD REQUEST : Object not found');

            object = await this.populate(object);

            result = new Result<Type>(object);
        }
        catch(error) {
            // console.error(`${log} :`, error);
            const resultError = new APIError('DB_UPDATE_ERROR');
            result = new Result<Type>(resultError as BaseError, true);
        }
        return result;
    }
    
    public async remove(id: string): Promise<String> {
        const log = `${this.getName()} :: remove`;
        console.log(`${log} :: id = ${id}`);
        
        let result: Result<String>;
        try {
            //if(!Types.ObjectId.isValid(id)) throw new Error('BAD REQUEST : Id not valid');

            const deleted = await this.getModel().findByIdAndDelete(id) != null;
            if(!deleted) throw new Error('BAD REQUEST : Object not found');

            result = new Result<String>('Object deleted');
        } 
        catch (error) {
            // console.error(`${log} :`, error);
            const resultError = new APIError('DB_REMOVE_ERROR');
            result = new Result<String>(resultError as BaseError, true);
        }
        return id;
    }

    public async populate(object: Type): Promise<Type> {
        for await (const field of this.toPopulate) {
            object = await object.populate(field).execPopulate();
        };
        return object;
    }

    public async getAllByField(field: string, value: string): Promise<Result<Type[]>>{
        const log = `${this.getName()} :: getAllByField`;
        console.log(`${log} :: field = ${field}`);

        let result: Result<Type[]>;
        try {
            let objects: Type[]; 
            const json = `{"${field}": "${value}"}`;

            // if (!this.isToBePopulated())
            //     objects = await this.getModel().find(JSON.parse(json)) as Type[];
            // else 
            objects = await this.getModel().find(JSON.parse(json)).populate(this.toPopulate) as Type[];
            result = new Result<Type[]>(objects);
        }
        catch(error) {
            // console.error(`${log} :`, error);
            const resultError = new APIError('DB_FETCH_ERROR');
            result = new Result<Type[]>(resultError as BaseError, true);
        }
        return result;
    } 
}
