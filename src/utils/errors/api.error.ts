import { StatusCodes } from 'http-status-codes';

import { BaseError } from '.';


export class APIError extends BaseError {
    constructor(name: string, httpCode = StatusCodes.INTERNAL_SERVER_ERROR, isOperational = true, description = 'internal server error') {
        super(name, httpCode, description, isOperational);
    }
}

export class BDDError extends BaseError {
    constructor(description = 'bdd error') {
        super('BDD ERROR', StatusCodes.INTERNAL_SERVER_ERROR, description, true);
    }
} 