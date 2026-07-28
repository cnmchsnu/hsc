import { ProductEditor } from '../../application';
import { createCommerceContainer } from '../../container';


export async function updateCategories(
    input: ProductEditor
): Promise<void> {

    const {
        productManageContainer,
    } = await createCommerceContainer();

    await productManageContainer.productCommandService.update(input);

    
}