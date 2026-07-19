import { cache } from "react";


import { createCategoryContainer, type CategoryContainer} from "./categoryContainer";
import { createProductContainer, type ProductContainer } from "./productContainer";

export interface CommerceContainer {

    categoryContainer: CategoryContainer;

    productContainer: ProductContainer;

}
export const createCommerceContainer = cache(async (): Promise<CommerceContainer> => {

    const categoryContainer =
        await createCategoryContainer();
    
    const productContainer =
        await createProductContainer(
            categoryContainer.categoryService,
            categoryContainer.categoryResolveService
        );

    
    

    return {

        categoryContainer,

        productContainer

    };

});