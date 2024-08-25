import { CategoryProductValueObject } from 'src/domain/value-objects/category-product.value-object';

export class FilterProductBuilder {
  category?: CategoryProductValueObject;
  price?: 'ASC' | 'DESC';

  constructor(props?: IProps) {
    Object.assign(this, props);
  }

  buildCategory(category: CategoryProductValueObject) {
    this.category = category;
  }
  buildPrice(price: 'ASC' | 'DESC') {
    this.price = price;
  }

  build() {
    const filter = new FilterProductBuilder({
      category: this.category,
      price: this.price,
    });

    return {
      where: {
        category: {
          contains: filter.category,
        },
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
  price?: 'ASC' | 'DESC';
}
