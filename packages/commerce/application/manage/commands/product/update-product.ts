import { ProductEditor } from "./type";
import { ProductManagementWorkflow } from "../../workflow";
import { ProductCommandResult } from "./product-command-result";
import { ProductAggregateLoader } from "../../../aggragate";
import { TransactionRunner } from "@repo/infra/transaction";

import { NotFoundError } from "@repo/shared/application";

export class UpdateProductCommand {


    constructor(

        private readonly aggregate: ProductAggregateLoader,

        private readonly workflow: ProductManagementWorkflow,

        private readonly transactionRunner: TransactionRunner,

    ){}


    async execute(
        input: ProductEditor
    ): Promise<ProductCommandResult> {

        return this.transactionRunner.run(async () => {

            const aggregate = await this.aggregate.loadBySlug(input.product.slug);

            if (!aggregate) throw new NotFoundError(`Product with slug ${input.product.slug} does not exist.`);

            aggregate.productId =
                aggregate.product?.id ?? null;


            await this.workflow.execute(
                aggregate,
                input,
            );

            return { productId: aggregate.product?.id ?? "" };
        });

    }

}