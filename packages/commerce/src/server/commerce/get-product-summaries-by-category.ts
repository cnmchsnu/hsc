import { createCommerceContainer } from '../../container';
import { ProductSummary } from '../../product-category';

export async function getProductSummariesByCategory(
    categoryId: string,
): Promise<ProductSummary[] | null> {
    const {
        commerceService,
    } = await createCommerceContainer();

    return commerceService.getProductSummariesByCategory(categoryId);
}