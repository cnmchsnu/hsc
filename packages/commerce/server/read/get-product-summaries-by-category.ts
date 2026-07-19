import { createCommerceContainer } from '../../container';
import { ProductSummary } from '../../application/read/product';
import { cache } from 'react';

export const getProductSummariesByCategory = cache(async (
    categoryId: string,
): Promise<ProductSummary[]> => {
    
    console.time(`category-${categoryId}`)
    const {
        productContainer,
    } = await createCommerceContainer();

    const result = await productContainer.productReadService.getProductSummariesByCategory(categoryId);

    console.timeEnd(`category-${categoryId}`);

    return result;
});