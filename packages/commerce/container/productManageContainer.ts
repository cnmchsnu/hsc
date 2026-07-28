"server-only";

import type { ProductCommandService } from '../application/manage';
import { ServiceContainer } from "./productServiceContainer";

import {
    createSkuBuilder,
    createProductSynchronizers,
    createProductManagementWorkflow,
    createProductServiceUseCases,
    createProductCommandService
} from '../application/manage';


export interface ProductManageContainer {

    productCommandService: ProductCommandService;

}

export function createProductManageContainer(
    serviceContainer: ServiceContainer
): ProductManageContainer {

    const skuBuilder = createSkuBuilder();

    const synchronizers = createProductSynchronizers(serviceContainer);

    const workflow = createProductManagementWorkflow(serviceContainer, synchronizers, skuBuilder);

    const useCases = createProductServiceUseCases(serviceContainer, synchronizers, workflow, serviceContainer.productAggregateLoader);

    const productCommandService = createProductCommandService(useCases);

    return {
        productCommandService
    };

}
