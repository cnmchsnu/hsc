import { ProductEditorInfo } from '../../application';
import { createCommerceContainer } from '../../container';


export async function updateProductBasic(
    input: ProductEditorInfo
): Promise<void> {

    const {
        productManageContainer,
    } = await createCommerceContainer();

    await productManageContainer.productCommandService.updateBasic(input);

    
}