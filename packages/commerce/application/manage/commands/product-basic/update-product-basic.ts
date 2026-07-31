import { TransactionRunner } from "@repo/infra/transaction";
import { ProductService } from "../../../../domain";
import { ProductEditorInfo, ProductSynchronizer } from "../../sync";
import { ProductCommandResult, ProductRefreshTarget } from "../product";

import { NotFoundError } from "@repo/shared/application";

export class UpdateProductBasicCommand {

    constructor(

        private readonly productService:
            ProductService,

        private readonly productSync:
            ProductSynchronizer,

        private readonly transactionRunner: TransactionRunner,

    ) {}

    async execute(
        input: ProductEditorInfo,
    ): Promise<ProductCommandResult> {

        return this.transactionRunner.run(async () => {
            const product =
                await this.productService.findBySlug(
                    input.slug,
                );

            if (!product) {
                throw new NotFoundError(`Product with slug ${input.slug} does not exist.`);
            }

            await this.productService.update({
                ...input,
                id: product.id,
            });
            
            return {
                productId: product.id,
                refresh: [
                    ProductRefreshTarget.Product
                ]
            };
        });

    }

}