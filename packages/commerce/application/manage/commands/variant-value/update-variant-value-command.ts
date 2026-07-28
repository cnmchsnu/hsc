import { TransactionRunner } from "@repo/infra/transaction";
import { ProductAggregateLoader } from "../../../aggragate";
import { VariantValueWorkflow } from "../../workflow";

import { ProductCommandResult, ProductRefreshTarget } from "../product";

import { ProductVariantValueWorkflowInput } from "./type";

import { NotFoundError } from "@repo/shared/application";

export class UpdateVariantValueCommand {

    constructor(

        private readonly aggregateLoader: ProductAggregateLoader,
        
        private readonly variantValueWorkflow: VariantValueWorkflow,

        private readonly transactionRunner: TransactionRunner,

    ) {}

    async execute(
        input: ProductVariantValueWorkflowInput,
    ): Promise<ProductCommandResult> {
        return this.transactionRunner.run(async () => {

            const aggregate = await this.aggregateLoader.loadById(input.productId);

            if (!aggregate) throw new NotFoundError(`Product with ID ${input.productId} does not exist.`);


            await this.variantValueWorkflow.execute(
                aggregate,
                input,
            );

            return {
                productId: aggregate.productId!,
                refresh: [
                    ProductRefreshTarget.VariantValues,
                    ProductRefreshTarget.Skus
                ]
            };
        });
    }

}