import { createCommerceContainer } from '../../container';
import { ProductDetail } from '../../application/read/product';
import { cache } from 'react';

export const getProductAdminDetail = cache(async (slug: string): Promise<ProductDetail | null> => {
    
    const {
        productContainer,
    } = await createCommerceContainer();

    const result = await productContainer.productReadService.getProductAdminDetail(slug);

    return result;
});