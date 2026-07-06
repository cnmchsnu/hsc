import { createCommerceContainer } from '../../container';
import { ProductSearchCriteria, ProductSearchResult } from '../../application/search/product';

export async function searchProduct(
    criteria: ProductSearchCriteria
): Promise<ProductSearchResult | null> {
    const {
        productContainer,
    } = await createCommerceContainer();

    return productContainer.productSearchService.search(criteria);
}