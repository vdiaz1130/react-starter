import { createEntityBaseResolver } from '../_shared/createEntityBaseResolver';
import { ProductInput } from './productInput';
import { Product } from 'core/entity/product';

// Usage with abstract class.
// const BaseCreateProduct = createEntityBaseResolver(
//   'Product',
//   Product,
//   ProductInput,
//   Product
// );

// @Resolver()
// export class CreateProductResolver extends BaseCreateProduct {}

// Usage when base resolver is not configured as abstract class.
export const CreateProductResolver = createEntityBaseResolver(
  'Product',
  Product,
  ProductInput,
  Product
);
