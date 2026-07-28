import { cache } from "react";

import { createSupabaseClientFactory } from '@repo/infra/supabase/client/factory';


import { createCategoryContainer, type CategoryContainer} from "./categoryContainer";
import { createProductContainer, type ProductContainer } from "./productContainer";
import { createServiceContainer } from "./productServiceContainer";
import { createProductManageContainer, ProductManageContainer } from "./productManageContainer";
// import { createProductManageContainer, type ProductManageContainer } from "./productManageContainer";

export interface CommerceContainer {

    categoryContainer: CategoryContainer;

    productContainer: ProductContainer;

    productManageContainer: ProductManageContainer;


}


export const createCommerceContainer = cache(async (): Promise<CommerceContainer> => {

    const factory = createSupabaseClientFactory();
    
    const userClient = await factory.createUserClient();

    const serviceContainer = createServiceContainer(userClient);

    const categoryContainer = createCategoryContainer(serviceContainer);

    const productContainer = createProductContainer(serviceContainer);

    const productManageContainer = createProductManageContainer(serviceContainer);

    return {

        categoryContainer,

        productContainer,

        productManageContainer

    };

});