import { Model } from 'mongoose';

import { CommonServices } from '.';
import { IMove } from '../interfaces';
import { IMoveDocument, MoveModel } from '../models';


export class MoveServices extends CommonServices<IMoveDocument, IMove> {
    
    constructor() { super('MoveServices', []); }

    protected getModel(): Model<IMoveDocument> { return MoveModel }
}
