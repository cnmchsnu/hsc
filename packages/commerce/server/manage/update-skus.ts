import { ProductSkuWorkflowInput } from '../../application';
import { createCommerceContainer } from '../../container';


export async function updateSkus(
    input: ProductSkuWorkflowInput
): Promise<void> {

    const {
        productManageContainer,
    } = await createCommerceContainer();

    await productManageContainer.productCommandService.updateSkus(input);

    
}