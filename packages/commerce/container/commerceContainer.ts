
import { createCategoryContainer, type CategoryContainer} from "./categoryContainer";
import { createProductContainer, type ProductContainer } from "./productContainer";

export interface CommerceContainer {

    categoryContainer: CategoryContainer;

    productContainer: ProductContainer;

}

export async function createCommerceContainer(): Promise<CommerceContainer> {

    const categoryContainer =
        await createCategoryContainer();
    
    const productContainer =
        await createProductContainer(
            categoryContainer.categoryService
        );

    
    

    return {

        categoryContainer,

        productContainer

    };

}