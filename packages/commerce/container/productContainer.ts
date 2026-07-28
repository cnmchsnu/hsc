"server-only";





import { createProductReadService, type ProductReadService } from '../application/read/product';
import { DefaultProductSearchService, type ProductSearchService } from '../application/search/product';

import { ServiceContainer } from "./productServiceContainer";


export interface ProductContainer {

    productReadService: ProductReadService;

    productSearchService: ProductSearchService;

}

export function createProductContainer(
    serviceContainer: ServiceContainer
): ProductContainer {



    

    const productReadService =
        createProductReadService(serviceContainer);


    const productSearchService =
            new DefaultProductSearchService(
                serviceContainer.productService,
                serviceContainer.productCategoryService,
                productReadService,
                serviceContainer.categoryResolveService,
            );

    return {

        productReadService,

        productSearchService

    };

}