import { Model } from 'mongoose';

import { CommonServices } from '.';
import { ITalent } from '../interfaces';
import { ITalentDocument, TalentModel } from '../models';


export class TalentServices extends CommonServices<ITalentDocument, ITalent> {
    
    constructor() {
        super('TalentServices', []);
    }

    protected getModel(): Model<ITalentDocument> { return TalentModel }
}
