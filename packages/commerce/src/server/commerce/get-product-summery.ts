import { createCommerceContainer } from '../../container';
import { ProductSummary } from '../../read-models/read-models';

export async function getProductSummary(
    slug: string,
): Promise<ProductSummary | null> {
    const {
        commerceService,
    } = await createCommerceContainer();

    return commerceService.getProductSummary(slug);
}