import { createCommerceContainer } from '../container';
import type { ProductList, ProductListOptions } from '../product';

export async function getProducts(
    options: ProductListOptions
): Promise<ProductList> {

    const {
        productService,
    } = await createCommerceContainer();

    return productService.list(options);

}