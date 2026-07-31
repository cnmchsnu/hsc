import { ProductEditor } from '../../application';
import { createCommerceContainer } from '../../container';


export async function updateProduct(
    input: ProductEditor
): Promise<void> {

    const {
        productManageContainer,
    } = await createCommerceContainer();

    await productManageContainer.productCommandService.update(input);

    
}