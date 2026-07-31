import {
    SkuSynchronizer as SkuSync,
    PriceSynchronizer as PriceSync,
    InventoryItemSynchronizer as InventorySync,
} from "../sync";


import { SKUService } from "../../../domain";
import { ProductSkuWorkflowInput } from "../commands/sku";
import { ProductAggregate } from "../../aggragate";

export class SKUWorkflow {

    constructor(

        private readonly SKUService:
            SKUService,

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
        
        const currentSKUs = await this.SKUService.getByProduct(aggregate.product!.id);


        const skuResult = await this.skuSync.execute(input.skus, currentSKUs);
        

        aggregate.skuReferenceMap =
            skuResult.skuReferenceMap;


        await Promise.all([
            this.priceSync.execute(aggregate, input.prices,),
            this.inventorySync.execute(aggregate, input.inventory,)
        ]);

    }

}