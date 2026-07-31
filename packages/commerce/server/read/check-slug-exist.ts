import { createCommerceContainer } from '../../container';

export async function checkSlugExists(slug: string): Promise<boolean> {
    
    const {
        productContainer,
    } = await createCommerceContainer();

    const result = await productContainer.productReadService.checkProductSlugExists(slug);

    return result;
}