import { createCommerceContainer } from '../../container';
import { ProductDetail } from '../../application/read/product';

export async function getProductDetail(slug: string): Promise<ProductDetail | null> {
    
    const {
        productContainer,
    } = await createCommerceContainer();

    const result = await productContainer.productReadService.getProductDetail(slug);

    return result;
}