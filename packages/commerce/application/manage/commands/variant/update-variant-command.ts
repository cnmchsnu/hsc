import { TransactionRunner } from "@repo/infra/transaction";
import { ProductAggregateLoader } from "../../../aggragate";
import { VariantWorkflow } from "../../workflow/variant-workflow";
import { ProductCommandResult, ProductRefreshTarget } from "../product";

import { ProductVariantWorkflowInput } from "./type";

import { NotFoundError } from "@repo/shared/application";

export class UpdateProductVariantCommand {

    constructor(

        private readonly aggregateLoader: ProductAggregateLoader,

        private readonly variantWorkflow: VariantWorkflow,

        private readonly transactionRunner: TransactionRunner,
        
    ) {}

    async execute(
        input: ProductVariantWorkflowInput,
    ): Promise<ProductCommandResult> {
        return this.transactionRunner.run(async () => {
            const aggregate = await this.aggregateLoader.loadById(input.productId);

            if (!aggregate) throw new NotFoundError(`Product with ID ${input.productId} does not exist.`);


            await this.variantWorkflow.execute(
                aggregate,
                input,
            );

            return {
                productId: aggregate.productId!,
                refresh: [
                    ProductRefreshTarget.Variants,
                    ProductRefreshTarget.VariantValues,
                    ProductRefreshTarget.Skus
                ]
            };

        });

    }

}