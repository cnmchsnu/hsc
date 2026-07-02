import { createCommerceContainer } from '../../container';
import { ProductSummary } from '../../product-category';

export async function getProductSummariesByIds(
    ids: string[],
): Promise<ProductSummary[] | null> {
    const {
        commerceService,
    } = await createCommerceContainer();

    return commerceService.getProductSummariesByIds(ids);
}