import {
  InputDeleteProductDTO,
  OutputDeleteProductDTO,
} from './delete-product.dto';

export interface IDeleteProductUseCase {
  execute(input: InputDeleteProductDTO): Promise<OutputDeleteProductDTO>;
}
