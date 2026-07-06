import { createCommerceContainer } from '../../container';
import { ProductSummary } from '../../application/read/product';

export async function getProductSummariesByCategory(
    categoryId: string,
): Promise<ProductSummary[]> {
    const {
        productContainer,
    } = await createCommerceContainer();

    return productContainer.productReadService.getProductSummariesByCategory(categoryId);
}