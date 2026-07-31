import { TransactionRunner } from "@repo/infra/transaction";
import { ProductImageSynchronizer } from "../../sync";
import { ProductCommandResult, ProductRefreshTarget } from "../product";
import { ProductImageEditor } from "./type";
import { ProductAggregateLoader } from "../../../aggragate";


import { NotFoundError } from "@repo/shared/application";



export class UpdateProductImagesCommand {

    constructor(
        private readonly aggregate: ProductAggregateLoader,

        private readonly productImageSynchronizer: ProductImageSynchronizer,
            
        private readonly transactionRunner: TransactionRunner,

    ) {}

    async execute(
        input: ProductImageEditor,
    ): Promise<ProductCommandResult> {

        return this.transactionRunner.run(async () => {

            const aggregate = await this.aggregate.loadById(input.productId);

            if (!aggregate) throw new NotFoundError(`Product with slug ${input.productId} does not exist.`);


            await this.productImageSynchronizer.execute(
                aggregate,
                input.images,
            );

            return {
                productId: input.productId,
                refresh: [
                    ProductRefreshTarget.Images
                ]
            };
        });

    }

}