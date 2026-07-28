

import { ProductService } from "../../../../domain";
import { ProductEditor } from "./type";
import { ProductManagementWorkflow } from "../../workflow";
import { ProductCommandResult } from "./product-command-result";
import { ProductAggregateLoader } from "../../../aggragate";
import { TransactionRunner } from "@repo/infra/transaction";

import { ConflictError, NotFoundError } from "@repo/shared/application";

export class CreateProductCommand {


    constructor(

        private readonly productService: ProductService,

        private readonly aggregate: ProductAggregateLoader,

        private readonly workflow: ProductManagementWorkflow,

        private readonly transactionRunner: TransactionRunner,

    ){}


    async execute(
        input: ProductEditor
    ): Promise<ProductCommandResult> {
        
        return this.transactionRunner.run(async () => {

            const existingProduct = await this.productService.findBySlug(input.product.slug);

            if (existingProduct) throw new ConflictError(`Product with slug ${input.product.slug} already exists.`);

            const product = await this.productService.create(input.product);

            if (!product) return { productId: "" };

            const aggregate = await this.aggregate.loadBySlug(input.product.slug);

            if (!aggregate) throw new NotFoundError(`Product with slug ${input.product.slug} does not exist.`);

            aggregate.productId =
                product.id;


            await this.workflow.execute(
                aggregate,
                input,
            );

            return {
                productId: product.id
            };
        });

    }

}