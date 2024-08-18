import { CategoryProductValueObject } from 'src/domain/value-objects/category-product.value-object';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { Either } from 'src/infrastructure/utils/either/either';
export interface InputCreateProductDTO {
    name: string;
    price: number;
    description: string;
    image: string;
    category: CategoryProductValueObject;
    createdAt: Date;
    updatedAt: Date;
}
export type OutputCreateProductDTO = Either<MissingParamError | UnexpectedError, void>;
