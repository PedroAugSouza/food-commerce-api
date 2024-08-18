import { IError } from 'src/domain/errors/shared/error.interface';
export declare class NotFoundError implements IError {
    readonly reason: string;
    readonly message: string;
    constructor(name: string);
}
