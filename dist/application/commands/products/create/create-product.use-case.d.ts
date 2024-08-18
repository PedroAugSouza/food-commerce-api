import { IProductsRepository } from 'src/domain/repositories/products.repository';
import { ICreateProductUseCase } from 'src/domain/use-cases/products/create/create-product.use-case';
import { InputCreateProductDTO, OutputCreateProductDTO } from 'src/domain/use-cases/products/create/create-products.dto';
export declare class CreateProductUseCase implements ICreateProductUseCase {
    private readonly productsRepository;
    constructor(productsRepository: IProductsRepository);
    execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO>;
}
