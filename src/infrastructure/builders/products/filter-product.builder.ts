import { CategoryProductValueObject } from 'src/domain/value-objects/category-product.value-object';

export class FilterProductBuilder {
  category?: CategoryProductValueObject;
  price?: 'asc' | 'desc';
  result: object;

  constructor(props?: IProps) {
    Object.assign(this, props);
  }

  buildCategory(category: CategoryProductValueObject) {
    this.category = category;
  }
  buildPrice(price: 'asc' | 'desc') {
    this.price = price;
  }

  build() {
    const filter = new FilterProductBuilder({
      category: this.category,
      price: this.price,
    });

    this.result = {
      where: {
        category: filter.category,
      },
      ...(this.price
        ? {
            orderBy: {
              price: this.price,
            },
          }
        : {}),
    };
  }
}

interface IProps {
  category?: CategoryProductValueObject;
  price?: 'asc' | 'desc';
}
