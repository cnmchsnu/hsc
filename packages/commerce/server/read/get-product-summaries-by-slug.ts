import { createCommerceContainer } from '../../container';
import { ProductSummary } from '../../application/read/product';
import { cache } from 'react';

export const getProductSummariesBySlugs = cache(async (
    slugs: string[],
): Promise<ProductSummary[]> => {
    
    console.time(`product-summaries-${slugs.join(',')}`);
    const {
        productContainer,
    } = await createCommerceContainer();

    const result = await productContainer.productReadService.getProductSummariesBySlugs(slugs);

    console.timeEnd(`product-summaries-${slugs.join(',')}`);

    return result;
});