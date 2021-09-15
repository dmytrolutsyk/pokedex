import { BaseError } from ".";

export interface IResult<Type> {
    message: Type | BaseError;
    error: boolean;
}

export class Result<Type> implements IResult<Type> {
    message: Type | BaseError;
    error: boolean;

    constructor(message: Type | BaseError, error: boolean = false) {
        this.message = message;
        this.error = error;
    }
}