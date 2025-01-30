import {
  InputCreateProductDTO,
  OutputCreateProductDTO,
} from './create-products.dto';

export interface ICreateProductUseCase {
  execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO>;
}
