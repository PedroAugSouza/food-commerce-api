import { InputAddProductDTO, OutputAddProductDTO } from './add-product.dto';

export interface IAddProductUseCase {
  execute(input: InputAddProductDTO): Promise<OutputAddProductDTO>;
}
