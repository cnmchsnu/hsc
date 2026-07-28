import { ProductVariantValueWorkflowInput } from '../../application';
import { createCommerceContainer } from '../../container';


export async function updateVariantValues(
    input: ProductVariantValueWorkflowInput
): Promise<void> {

    const {
        productManageContainer,
    } = await createCommerceContainer();

    await productManageContainer.productCommandService.updateVariantValues(input);

    
}