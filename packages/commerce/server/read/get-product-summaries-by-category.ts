import { createCommerceContainer } from '../../container';
import { ProductSummary } from '../../application/read/product';

export async function getProductSummariesByCategory(
    categoryId: string
): Promise<ProductSummary[]> {
    

    const {
        productContainer,
    } = await createCommerceContainer();

    const result = await productContainer.productReadService.getProductSummariesByCategory(categoryId);


    return result;
}