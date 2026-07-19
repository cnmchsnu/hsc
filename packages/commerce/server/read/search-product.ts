import { createCommerceContainer } from '../../container';
import { ProductSearchCriteria, ProductSearchResult } from '../../application/search/product';
import { cache } from 'react';


export const searchProduct = cache(async (
    criteria: ProductSearchCriteria
): Promise<ProductSearchResult | null> => {
    console.time("searchProduct");
    const {
        productContainer,
    } = await createCommerceContainer();

    const result = await productContainer.productSearchService.search(criteria);

    console.timeEnd("searchProduct");

    return result;
});