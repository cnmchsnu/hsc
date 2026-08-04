import {
    ProductManagementWorkflow,
    VariantWorkflow,
    VariantValueWorkflow,
    SKUWorkflow
} from "../workflow";

import type { ProductSynchronizers } from "./synchronizers";

export interface ProductManagementWorkflows {

    productManagementWorkflow:
        ProductManagementWorkflow;

    variantWorkflow:
        VariantWorkflow;

    skuWorkflow:
        SKUWorkflow;

}


export function createProductManagementWorkflow(
    synchronizers: ProductSynchronizers,
): ProductManagementWorkflows {

    const skuWorkflow =
        new SKUWorkflow(
            synchronizers.sku,
            synchronizers.price,
            synchronizers.inventory
        );


    const variantWorkflow =
        new VariantWorkflow(
            synchronizers.option,
            synchronizers.value,
            skuWorkflow
        );

    const productManagementWorkflow =
        new ProductManagementWorkflow(
            synchronizers.product,
            synchronizers.image,
            synchronizers.category,
            variantWorkflow
        );

    return {
        productManagementWorkflow,
        variantWorkflow,
        skuWorkflow
    };
}