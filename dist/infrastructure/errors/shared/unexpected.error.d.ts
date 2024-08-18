import { IError } from 'src/domain/errors/shared/error.interface';
export declare class UnexpectedError implements IError {
    readonly reason: string;
    readonly message: string;
    constructor(message: unknown);
}
