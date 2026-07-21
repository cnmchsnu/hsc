import { createCommerceContainer } from '../../container';
import { ProductSearchQuery, ProductSearchResult } from '../../application/search/product';
import { cache } from 'react';


export const searchProduct = cache(async (
    criteria: ProductSearchQuery
): Promise<ProductSearchResult | null> => {
    
    const {
        productContainer,
    } = await createCommerceContainer();

    const result = await productContainer.productSearchService.search(criteria);


    return result;
});