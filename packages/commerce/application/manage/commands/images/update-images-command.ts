import { TransactionRunner } from "@repo/infra/transaction";
import { ProductImageService } from "../../../../domain";
import { ProductImageSynchronizer } from "../../sync";
import { ProductCommandResult, ProductRefreshTarget } from "../product";
import { ProductImageEditor } from "./type";

import { NotFoundError } from "@repo/shared/application";



export class UpdateProductImagesCommand {

    constructor(

        private readonly productImageService:
            ProductImageService,

        private readonly productImageSynchronizer:
            ProductImageSynchronizer,
            
        private readonly transactionRunner: TransactionRunner,

    ) {}

    async execute(
        input: ProductImageEditor,
    ): Promise<ProductCommandResult> {

        return this.transactionRunner.run(async () => {
            const images =
                await this.productImageService.getAllById(
                    input.productId,
                );

            if (!images) {
                throw new NotFoundError(`Product with ID ${input.productId} does not exist.`);
            }

            await this.productImageSynchronizer.execute(
                input.productId,
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