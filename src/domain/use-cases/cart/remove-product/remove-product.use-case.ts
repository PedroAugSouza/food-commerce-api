import {
  InputRemoveProductDTO,
  OutputRemoveProductDTO,
} from './remove-product.dto';

export interface IRemoveProductUseCase {
  execute(input: InputRemoveProductDTO): Promise<OutputRemoveProductDTO>;
}
