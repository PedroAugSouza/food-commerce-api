import { IError } from 'src/domain/errors/shared/error.interface';
export declare class MissingParamError implements IError {
    readonly reason: string;
    readonly message: string;
    constructor(param: string);
}
