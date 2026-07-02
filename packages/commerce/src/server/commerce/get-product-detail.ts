import { createCommerceContainer } from '../../container';
import { ProductDetail } from '../../product-category';

export async function getProductDetail(
    id: string,
): Promise<ProductDetail | null> {
    const {
        commerceService,
    } = await createCommerceContainer();

    return commerceService.getProductDetail(id);
}