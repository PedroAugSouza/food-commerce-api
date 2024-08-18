import { CreateProductUseCase } from './create-product.use-case';
import { InputCreateProductDTO } from 'src/domain/use-cases/products/create/create-products.dto';
export declare class CreateProductController {
    private readonly createProductUseCase;
    constructor(createProductUseCase: CreateProductUseCase);
    handle(input: InputCreateProductDTO, file: Express.Multer.File): Promise<void>;
}
