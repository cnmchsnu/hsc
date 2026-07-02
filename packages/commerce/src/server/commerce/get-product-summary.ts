import { createCommerceContainer } from '../../container';
import { ProductSummary } from '../../product-category';

export async function getProductSummary(
    id: string,
): Promise<ProductSummary | null> {
    const {
        commerceService,
    } = await createCommerceContainer();

    return commerceService.getProductSummary(id);
}