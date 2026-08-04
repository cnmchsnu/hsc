import { VariantOptionSynchronizer as VariantSync, } from "../sync";

import { VariantOptionValueSynchronizer as VariantValueSync, } from "../sync";



import { ProductVariantWorkflowInput } from "../commands/variant";
import { ProductAggregate } from "../../aggragate";
import { SKUWorkflow } from "./sku-workflow";

export class VariantWorkflow {

    constructor(


        private readonly variantSync:
            VariantSync,

        private readonly variantValueSync:
            VariantValueSync,
                
        private readonly skuWorkflow:
            SKUWorkflow


    ) {}



    async execute(

        aggregate:
            ProductAggregate,

        input:
            ProductVariantWorkflowInput,

    ) {

        const options = await this.variantSync.execute(aggregate, input.options);

        aggregate.optionReferenceMap =
            options.optionReferenceMap;

        aggregate.options = options.options;

        const values = await this.variantValueSync.execute(aggregate,input.values);

        aggregate.values = values;

        await this.skuWorkflow.execute(
            aggregate,
            input,
        );

    }

}