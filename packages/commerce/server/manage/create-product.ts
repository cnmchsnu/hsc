import { ProductEditor } from '../../application';
import { createCommerceContainer } from '../../container';


export async function createProduct(
    input: ProductEditor
): Promise<void> {

    const {
        productManageContainer,
    } = await createCommerceContainer();

    await productManageContainer.productCommandService.create(input);

    
}