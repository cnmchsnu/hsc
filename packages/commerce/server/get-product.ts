import { createCommerceContainer } from '../container';
import type { Product } from '../types';


export async function getProduct(
    id: string,
): Promise<Product> {

    const {
        productService,
    } = await createCommerceContainer();

    return productService.getById(id);

}