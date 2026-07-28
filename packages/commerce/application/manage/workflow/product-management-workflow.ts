import {
    ProductSynchronizer as ProductSync,
    ProductImageSynchronizer as ImageSync,
    ProductCategorySynchronizer as ProductCategorySync,
} from "../sync";

import { ProductEditor } from "../commands/product";
import { VariantWorkflow } from "./variant-workflow";
import { ProductAggregate } from "../../aggragate";

import { NotFoundError } from "@repo/shared/application";

export class ProductManagementWorkflow {

    constructor(

        private readonly productSync:
            ProductSync,

        private readonly imageSync:
            ImageSync,

        private readonly categorySync:
            ProductCategorySync,

        private readonly variantWorkflow:
            VariantWorkflow

    ) {}



    async execute(

        aggregate:
            ProductAggregate,

        input:
            ProductEditor,

    ) {


        if (!aggregate.productId) {
            throw new NotFoundError("Product ID is required for product management workflow.");
        }

        const [product,,] = await Promise.all([
            this.productSync.execute(aggregate.productId,input.product),
            this.imageSync.execute(aggregate.productId, input.images),
            this.categorySync.execute(aggregate,input.categories),
        ]);

        aggregate.product = product;

        await this.variantWorkflow.execute(
            aggregate,
            {   
                productId: aggregate.productId,
                ...input
            },
        );

        

    }

}