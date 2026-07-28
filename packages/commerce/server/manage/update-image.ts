import { ProductImageEditor } from '../../application';
import { createCommerceContainer } from '../../container';



export async function updateImages(
    input: ProductImageEditor
): Promise<void> {

    const {
        productManageContainer,
    } = await createCommerceContainer();

    await productManageContainer.productCommandService.updateImages(input);

    
}