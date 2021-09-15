// import { GraphQLInputObjectType, GraphQLObjectType } from 'graphql';
// import { Document, Model } from 'mongoose';

// import { APIError, Result } from '../utils';


// export abstract class CommonServices<Type extends Document, Data extends GraphQLInputObjectType> {
//     protected readonly name: string;
//     protected readonly toPopulate: string[];
    
//     constructor(name: string, toPopulate: string[] = []){
//         this.name = name;
//         this.toPopulate = toPopulate;

//         this.getName = this.getName.bind(this);
//         this.getModel = this.getModel.bind(this);
//         this.getToPopulate = this.getToPopulate.bind(this);
//         this.isToBePopulated = this.isToBePopulated.bind(this);
//         // this.populate = this.populate.bind(this);

//         // this.getAll = this.getAll.bind(this);
//         // this.getAllByField = this.getAllByField.bind(this);
//         // this.getById = this.getById.bind(this);
//         // this.getByField = this.getByField.bind(this);
//         // this.insert = this.insert.bind(this);
//         // this.remove = this.remove.bind(this);
//         // this.update = this.update.bind(this);
//     }

//     public abstract getModel(): Model<Type>;

//     public getName(): string { return this.name };

//     public getToPopulate(): string[] { return this.toPopulate; }
   
//     public isToBePopulated(): boolean { return this.toPopulate.length != 0; }

//     public async getAll(): Promise<Result<Type[]>>{
//         console.log(`${new Date()} :: ${this.getName()}.getAll`);

//         let result: Result<Type[]> = { message: null, error: false };

//         try {
//             let array: Type[]; 

//             if (!this.isToBePopulated())
//                 array = await this.getModel().find() as Type[];
//             else 
//                 array = await this.getModel().find().populate(this.toPopulate) as Type[];
//             result.message = array;
//         }
//         catch(error) {
//             console.log(error.message); 
//             result.message = new APIError('DB_FETCH_ERROR');
//             result.error = true;
//         }
//         finally {
//             return result;
//         }
//     }

    // public async getById(id: string): Promise<Result<Type>> {
    //     console.log(`${new Date()} :: ${this.getName()}.getById, id = ${id}`);
        
    //     let result;
    //     try {
    //         if(!Types.ObjectId.isValid(id)) throw new Error('BAD REQUEST : Id not valid');

    //         let object = await this.getModel().findById(id) as Type;
    //         if(!object) throw new Error('BAD REQUEST : Object not found');

    //         object = await this.populate(object);

    //         result = new BodyDocument<Type>(object);
    //     }
    //     catch(error) {
    //         console.log(`${new Date()} :: ${this.getName()}.getById :: ERROR: `, error);
    //         result = new BodyDocument(error.message, true);
    //     }
    //     return result;
    // }

    // public async getByField(field: string, value: string): Promise<BodyDocument<Type>> {
    //     console.log(`${new Date()} :: ${this.getName()}.getByField, field = ${field}, value = ${value}`);
        
    //     let result;
    //     try {
    //         const json = `{"${field}": "${value}"}`;
    //         let object = await this.getModel().findOne(JSON.parse(json)) as Type;
    //         if(!object) throw new Error('BAD REQUEST : Object not found');

    //         object = await this.populate(object);

    //         result = new BodyDocument<Type>(object);
    //     }
    //     catch(error) {
    //         console.log(`${new Date()} :: ${this.getName()}.getByField :: ERROR: `, error);
    //         result = new BodyDocument(error.message, true);
    //     }
    //     return result;
    // }

//     public async insert(data: Data): Promise<Result<Type>> {
//         console.log(`${new Date()} :: ${this.getName()}.insert, object = `, data);

//         let result: Result<Type> = { message: null, error: false };

//         try {
//             let object: Type = await this.getModel().create(data) as Type;
//             if(!object) throw new Error('ERROR : Could not create object');

//             // object = await this.populate(object);

//             result.message = object;
//         } 
//         catch(error) {
//             console.log(error.message); 
//             result.message = new APIError('DB_INSERT_ERROR');
//             result.error = true;
//         }
//         return result;
//     }

//     // public async update(id: string, data: Data): Promise<BodyDocument<Type>> {
//     //     console.log(`${new Date()} :: ${this.getName()}.update, id = ${id}`);

//     //     let result;
//     //     try {
//     //         let object = await this.getModel().findByIdAndUpdate(id, data as any, { useFindAndModify: false, new: true }) as Type;
//     //         if (!object) throw new Error('BAD REQUEST : Object not found');

//     //         object = await this.populate(object);

//     //         result = new BodyDocument<Type>(object);
//     //     }
//     //     catch(error) {
//     //         console.log(error.message);
//     //         result = new BodyDocument(error.message, true);
//     //     }
//     //     return result;
//     // }
    
//     // public async remove(id: string): Promise<BodyDocument<Type>> {
//     //     console.log(`${new Date()} :: ${this.getName()}.remove, id = ${id}`);
        
//     //     let result;
//     //     try {
//     //         if(!Types.ObjectId.isValid(id)) throw new Error('BAD REQUEST : Id not valid');

//     //         const deleted = await this.getModel().findByIdAndDelete(id) != null;
//     //         if(!deleted) throw new Error('BAD REQUEST : Object not found');

//     //         result = new BodyDocument('Object deleted');
//     //     } 
//     //     catch (error) {
//     //         console.log(error.message);
//     //         result = new BodyDocument(error.message, true);
//     //     }
//     //     return result;
//     // }

//     // public async populate(object: Type): Promise<Type> {
//     //     for await (const field of this.toPopulate) {
//     //         object = await object.populate(field).execPopulate() as Type;
//     //     };
//     //     return object;
//     // }

//     // public async getAllByField(field: string, value: string): Promise<BodyDocument<Type>>{
//     //     console.log(`${new Date()} :: ${this.getName()}.getAllByField, field = ${field}`);

//     //     let result;
//     //     try {
//     //         let objects: Type[]; 
//     //         const json = `{"${field}": "${value}"}`;

//     //         if (!this.isToBePopulated())
//     //             objects = await this.getModel().find(JSON.parse(json)) as Type[];
//     //         else 
//     //             objects = await this.getModel().find(JSON.parse(json)).populate(this.toPopulate) as Type[];
//     //         result = new BodyDocument<Type>(objects);
//     //     }
//     //     catch(error) {
//     //         console.log(error.message);
//     //         result = new BodyDocument(error.message, true);
//     //     }
//     //     return result;
//     // } 
// }
