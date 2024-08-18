import { CategoryProductValueObject } from '../value-objects/category-product.value-object';
export declare class Product {
    uuid: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: CategoryProductValueObject;
    createdAt: Date;
    updatedAt: Date;
    constructor(props: Omit<Product, 'uuid'>, uuid?: string);
}
