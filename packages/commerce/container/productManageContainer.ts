"server-only";

import type { ProductCommandService, SkuRebuilder } from '../application/manage';
import { ServiceContainer } from "./productServiceContainer";

import {
    createProductSynchronizers,
    createProductManagementWorkflow,
    createProductServiceUseCases,
    createProductCommandService,
    createSkuRebuilder
} from '../application/manage';


export interface ProductManageContainer {

    productCommandService: ProductCommandService;
    skuRebuilder: SkuRebuilder;
}

export function createProductManageContainer(
    serviceContainer: ServiceContainer
): ProductManageContainer {

    const synchronizers = createProductSynchronizers(serviceContainer);

    const workflow = createProductManagementWorkflow(serviceContainer, synchronizers);

    const useCases = createProductServiceUseCases(serviceContainer, synchronizers, workflow, serviceContainer.productAggregateLoader);

    const productCommandService = createProductCommandService(useCases);

    const skuRebuilder = createSkuRebuilder();

    return {
        productCommandService,
        skuRebuilder
    };

}
