import { createCommerceContainer } from '../../../container';
import { ProductSearchCriteria, ProductSearchResult } from '../../../application/queries';

export async function searchProducts(
    criteria: ProductSearchCriteria,
): Promise<ProductSearchResult | null> {
    const {
        commerceService,
    } = await createCommerceContainer();

    return commerceService.searchProducts(criteria);
}