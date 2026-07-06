import { createCommerceContainer } from '../../container';
import { ProductSummary } from '../../application/read/product';

export async function getProductSummary(
    slug: string,
): Promise<ProductSummary | null> {
    const {
        productContainer,
    } = await createCommerceContainer();

    return productContainer.productReadService.getProductSummary(slug);
}