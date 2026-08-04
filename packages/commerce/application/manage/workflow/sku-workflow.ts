import {
    SkuSynchronizer as SkuSync,
    PriceSynchronizer as PriceSync,
    InventoryItemSynchronizer as InventorySync,
} from "../sync";


import { ProductSkuWorkflowInput } from "../commands/sku";
import { ProductAggregate } from "../../aggragate";


export class SKUWorkflow {

    constructor(

        private readonly skuSync:
            SkuSync,

        private readonly priceSync:
            PriceSync,

        private readonly inventorySync:
            InventorySync,

    ) {}



    async execute(

        aggregate:
            ProductAggregate,

        input:
            ProductSkuWorkflowInput,

    ) {
        
        

        const skuResult = await this.skuSync.execute(aggregate, input.skus);
        

        aggregate.skuReferenceMap =
            skuResult.skuReferenceMap;


        await Promise.all([
            this.priceSync.execute(aggregate, input.prices,),
            this.inventorySync.execute(aggregate, input.inventory,)
        ]);

    }

}