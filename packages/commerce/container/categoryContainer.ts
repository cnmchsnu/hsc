"server-only";

import { createCategoryReadService, type CategoryReadService } from '../application/read';

import { ServiceContainer } from "./productServiceContainer";


export interface CategoryContainer {

    categoryReadService: CategoryReadService;
}

export function createCategoryContainer(
    serviceContainer: ServiceContainer
): CategoryContainer {

    

    const categoryReadService =
        createCategoryReadService({
            categoryService: serviceContainer.categoryService,
        });

    return {
        
        categoryReadService,


    };
}