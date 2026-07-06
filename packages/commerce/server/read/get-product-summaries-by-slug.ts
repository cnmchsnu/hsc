import { createCommerceContainer } from '../../container';
import { ProductSummary } from '../../application/read/product';

export async function getProductSummariesBySlugs(
    slugs: string[],
): Promise<ProductSummary[]> {
    const {
        productContainer,
    } = await createCommerceContainer();

    return productContainer.productReadService.getProductSummariesBySlugs(slugs);
}