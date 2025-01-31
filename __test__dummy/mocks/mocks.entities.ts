import { Cart } from 'src/domain/entities/cart.entity';
import { Product } from 'src/domain/entities/product.entity';
import { ProductsInCart } from 'src/domain/entities/products-in-cart';
import { User } from 'src/domain/entities/user.entiity';
import { CategoryProductValueObject } from 'src/domain/value-objects/category-product.value-object';
import { RolesUserValueObject } from 'src/domain/value-objects/roles-user.value-object';

export const userDummy = new User({
  email: 'user@email.com',
  password: 'password-correct',
  role: RolesUserValueObject.ADMIN,
  username: 'username-example',
  updatedAt: new Date(),
  createdAt: new Date(),
});

export const productDummy = new Product({
  name: 'name-product',
  description: 'desc for product',
  category: CategoryProductValueObject.FOOD,
  image: 'image-for-product.jpg',
  price: 'R$ 12,00',
  amountAvailable: 20,
  updatedAt: new Date(),
  createdAt: new Date(),
});

export const cartDummy = new Cart({
  totalValue: 2400,
  userUuid: userDummy.uuid,
  productsInCart: [],
});

export const productsInCartDummy = new ProductsInCart({
  amountProducts: 2,
  cartUuid: cartDummy.uuid,
  productUuid: productDummy.uuid,
});
