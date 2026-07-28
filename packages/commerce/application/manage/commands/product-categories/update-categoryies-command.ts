import { TransactionRunner } from "@repo/infra/transaction";
import { ProductAggregateLoader } from "../../../aggragate";
import { ProductCategorySynchronizer } from "../../sync";
import { ProductCommandResult, ProductRefreshTarget } from "../product";
import { ProductCategoriesEditor } from "./type";

import { NotFoundError } from "@repo/shared/application";



export class UpdateProductCategoriesCommand {

    constructor(

        private readonly aggregateLoader:
            ProductAggregateLoader,

        private readonly productCategorySynchronizer:
            ProductCategorySynchronizer,

        private readonly transactionRunner: TransactionRunner,

    ) {}

    async execute(
        input: ProductCategoriesEditor,
    ): Promise<ProductCommandResult> {
        return this.transactionRunner.run(async () => {

            const aggregate = await this.aggregateLoader.loadById(input.productId);

            if (!aggregate) throw new NotFoundError(`Product with ID ${input.productId} does not exist.`);

            await this.productCategorySynchronizer.execute(
                aggregate,
                input.categories,
            );

            return {
                productId: aggregate.productId!,
                refresh: [
                    ProductRefreshTarget.Categories
                ]
            };
        });

    }

}