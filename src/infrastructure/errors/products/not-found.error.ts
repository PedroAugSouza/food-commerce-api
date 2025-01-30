import { IError } from 'src/domain/errors/shared/error.interface';

export class ProductNotFound implements IError {
  readonly reason: string = '[Product not found]:';
  readonly message: string;

  constructor(name: string) {
    this.message = `this ${name} not found`;
  }
}
