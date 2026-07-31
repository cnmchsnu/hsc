import type { InventoryItem, InventoryItemService } from "../../../../domain";
import { ProductAggregate } from "../../../aggragate";

import { ValidationError } from "@repo/shared/application";

export interface ProductInventoryItemEditor {
    
    code: string;

    availableQuantity: number;

    reservedQuantity: number;

    incomingQuantity: number;

}


export interface InventoryItemSynchronizer {

    execute(
        aggregate: ProductAggregate,
        desired: readonly ProductInventoryItemEditor[],
    ): Promise<void>;

}

class DefaultInventoryItemSynchronizer
    implements InventoryItemSynchronizer {

    constructor(

        private readonly inventoryItemService: InventoryItemService,

    ) {}

    async execute(

        aggregate: ProductAggregate,

        desired: readonly ProductInventoryItemEditor[],

    ): Promise<void> {

        if (!aggregate.productId) throw new ValidationError("Product ID is required for inventory item synchronization.");

        const current = await this.inventoryItemService.getBySkus(Array.from(aggregate.skuReferenceMap!.values()));

        if (desired.length === 0) throw new ValidationError("No inventory items found for the given SKUs.");


        const currentMap = new Map<string, InventoryItem>(
            current.map(item => [item.skuid, item])
        );

        await Promise.all([
            this.inventoryItemService.createMany(
                desired.filter(sku => !currentMap.has(sku.code) && aggregate.skuReferenceMap?.has(sku.code)).map(sku => {
                    return {
                        ...sku,
                        skuId: aggregate.skuReferenceMap!.get(sku.code)!,
                    };
                })
            ),

            this.inventoryItemService.updateMany(
                desired.filter(sku => currentMap.has(sku.code)).map(sku => ({
                    ...sku,
                    skuId: currentMap.get(sku.code)!.skuid,
                }))
            )
        ])



    }
    

    equals(
        current: InventoryItem,
        desired: ProductInventoryItemEditor,
    ): boolean {
        return (

            current.availableQuantity === desired.availableQuantity &&

            current.reservedQuantity === desired.reservedQuantity &&

            current.incomingQuantity === desired.incomingQuantity

        );
    }

}

export function createInventoryItemSynchronizer(
    inventoryItemService: InventoryItemService,
): InventoryItemSynchronizer {
    return new DefaultInventoryItemSynchronizer(inventoryItemService);
}