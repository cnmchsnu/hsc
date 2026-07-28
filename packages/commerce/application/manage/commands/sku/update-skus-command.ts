
import { TransactionRunner } from "@repo/infra/transaction";
import { ProductAggregateLoader } from "../../../aggragate";
import { SKUWorkflow } from "../../workflow";

import { ProductCommandResult, ProductRefreshTarget } from "../product";

import { ProductSkuWorkflowInput } from "./type";

import { NotFoundError } from "@repo/shared/application";

export class UpdateProductSKUsCommand {

    constructor(
        
        private readonly aggregateLoader: ProductAggregateLoader,

        private readonly skuWorkflow: SKUWorkflow,

        private readonly transactionRunner: TransactionRunner,

    ) {}

    async execute(
        input: ProductSkuWorkflowInput,
    ): Promise<ProductCommandResult> {
        return this.transactionRunner.run(async () => {
            const aggregate = await this.aggregateLoader.loadById(input.productId);

            if (!aggregate) throw new NotFoundError(`Product with ID ${input.productId} does not exist.`);


            await this.skuWorkflow.execute(
                aggregate,
                input,
            );

            return {
                productId: aggregate.productId!,
                refresh: [
                    ProductRefreshTarget.Skus
                ]
            };
        });

    }

}