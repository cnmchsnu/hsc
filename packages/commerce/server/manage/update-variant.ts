import { ProductVariantWorkflowInput } from '../../application';
import { createCommerceContainer } from '../../container';


export async function updateVariant(
    input: ProductVariantWorkflowInput
): Promise<void> {

    const {
        productManageContainer,
    } = await createCommerceContainer();

    await productManageContainer.productCommandService.updateVariants(input);

    
}