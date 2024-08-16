import { IError } from 'src/domain/errors/shared/error.interface';

export class MissingParamError implements IError {
  readonly reason: string = '[Missing Param]:';
  readonly message: string;

  constructor(param: string) {
    this.message = `The param "${param}" is missing`;
  }
}
