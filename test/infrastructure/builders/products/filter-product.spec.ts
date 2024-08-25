import { CategoryProductValueObject } from 'src/domain/value-objects/category-product.value-object';
import { FilterProductBuilder } from 'src/infrastructure/builders/products/filter-product.builder';
import { describe, it, expect } from 'vitest';

describe('build filters for product', () => {
  it('should be able to generate filter by price and category', () => {
    const filter = new FilterProductBuilder();
    filter.buildCategory(CategoryProductValueObject.DRINK);
    filter.buildPrice('ASC');
    const filterbuilded = filter.build();

    expect(filterbuilded).toStrictEqual({
      where: {
        category: {
          contains: 'DRINK',
        },
      },
      orderBy: {
        price: 'ASC',
      },
    });
  });

  it('should be able to generate filter only price ', () => {
    const filter = new FilterProductBuilder();

    filter.buildPrice('ASC');
    const filterbuilded = filter.build();

    expect(filterbuilded).toStrictEqual({
      where: {
        category: {
          contains: undefined,
        },
      },
      orderBy: {
        price: 'ASC',
      },
    });
  });

  it('should be able to generate filter only category', () => {
    const filter = new FilterProductBuilder();
    filter.buildCategory(CategoryProductValueObject.DRINK);

    const filterbuilded = filter.build();

    expect(filterbuilded).toStrictEqual({
      where: {
        category: {
          contains: 'DRINK',
        },
      },
    });
  });
});
