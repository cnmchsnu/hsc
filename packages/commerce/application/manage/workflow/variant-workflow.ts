import { VariantOptionSynchronizer as VariantSync, } from "../sync";




import { VariantValueWorkflow } from "./variant-value-workflow";

import { ProductVariantWorkflowInput } from "../commands/variant";
import { ProductAggregate } from "../../aggragate";

export class VariantWorkflow {

    constructor(


        private readonly variantSync:
            VariantSync,

        private readonly variantValueWorkflow:
            VariantValueWorkflow,


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

        await this.variantValueWorkflow.execute(
            aggregate,
            input,
        );

    }

}