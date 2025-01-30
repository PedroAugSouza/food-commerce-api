import {
  InputUpdateProductDTO,
  OutputUpdateProductDTO,
} from './update-product.dto';

export interface IUpdateProductUseCase {
  execute(input: InputUpdateProductDTO): Promise<OutputUpdateProductDTO>;
}
