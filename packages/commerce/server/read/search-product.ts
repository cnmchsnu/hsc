import { createCommerceContainer } from '../../container';
import { ProductSearchRequest, ProductSearchResponse } from '../../application/search/product';
import { cache } from 'react';


export const searchProduct = cache(async (
    criteria: ProductSearchRequest
): Promise<ProductSearchResponse | null> => {
    
    const {
        productContainer,
    } = await createCommerceContainer();

    const result = await productContainer.productSearchService.search(criteria);


    return result;
});