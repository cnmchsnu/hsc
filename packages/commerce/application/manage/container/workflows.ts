import {
    ProductManagementWorkflow,
    VariantWorkflow,
    VariantValueWorkflow,
    SKUWorkflow
} from "../workflow";

import type { CommerceDependencies } from "./aggregate";
import type { ProductSynchronizers } from "./synchronizers";
import type { SkuBuilder } from "../builders";

export interface ProductManagementWorkflows {

    productManagementWorkflow:
        ProductManagementWorkflow;

    variantWorkflow:
        VariantWorkflow;

    variantValueWorkflow:
        VariantValueWorkflow;

    skuWorkflow:
        SKUWorkflow;

}


export function createProductManagementWorkflow(
    deps: CommerceDependencies,
    synchronizers: ProductSynchronizers,
    skuBuilder: SkuBuilder
): ProductManagementWorkflows {

    const skuWorkflow =
        new SKUWorkflow(
            deps.skuService,
            skuBuilder,
            synchronizers.sku,
            synchronizers.price,
            synchronizers.inventory
        );

    const variantValueWorkflow =
        new VariantValueWorkflow(
            synchronizers.value,
            skuWorkflow
        );


    const variantWorkflow =
        new VariantWorkflow(
            synchronizers.option,
            variantValueWorkflow
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
        variantValueWorkflow,
        skuWorkflow
    };
}