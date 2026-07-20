import { createCommerceContainer } from '../../container';
import { ProductSummary } from '../../application/read/product';
import { cache } from 'react';

export const getProductSummariesByCategory = cache(async (
    categoryId: string,
): Promise<ProductSummary[]> => {
    

    const {
        productContainer,
    } = await createCommerceContainer();

    const result = await productContainer.productReadService.getProductSummariesByCategory(categoryId);


    return result;
});