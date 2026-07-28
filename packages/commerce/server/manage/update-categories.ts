import { ProductCategoriesEditor } from '../../application';
import { createCommerceContainer } from '../../container';


export async function updateCategories(
    input: ProductCategoriesEditor
): Promise<void> {

    const {
        productManageContainer,
    } = await createCommerceContainer();

    await productManageContainer.productCommandService.updateCategories(input);

    
}