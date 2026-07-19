import { createCommerceContainer } from '../../container';
import { ProductDetail } from '../../application/read/product';
import { cache } from 'react';

export const getProductDetail = cache(async (slug: string): Promise<ProductDetail | null> => {
    console.time("getProductDetail");
    const {
        productContainer,
    } = await createCommerceContainer();
    const result = await productContainer.productReadService.getProductDetail(slug);

    console.timeEnd("getProductDetail");

    return result;
});