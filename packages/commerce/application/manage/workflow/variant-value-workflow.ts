import { VariantOptionValueSynchronizer as VariantValueSync, } from "../sync";





import { SKUWorkflow } from "./sku-workflow";
import { ProductVariantValueWorkflowInput } from "../commands/variant-value";
import { ProductAggregate } from "../../aggragate";

export class VariantValueWorkflow {

    constructor(


        private readonly variantValueSync:
            VariantValueSync,
        
        private readonly skuWorkflow:
            SKUWorkflow
    ) {}



    async execute(

        aggregate:
            ProductAggregate,

        input:
            ProductVariantValueWorkflowInput,

    ) {
        
        const values = await this.variantValueSync.execute(aggregate,input.values);

        aggregate.values = values;

        await this.skuWorkflow.execute(
            aggregate,
            input,
        );

    }

}