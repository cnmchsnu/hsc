import { createCommerceContainer } from '../../container';
import { ProductManageDetail } from '../../application/read/product';

export async function getProductManageDetail(id: string): Promise<ProductManageDetail> {
    
    const {
        productContainer,
    } = await createCommerceContainer();

    const result = await productContainer.productReadService.getProductManageDetail(id);


    return result;
}