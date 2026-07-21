import type {
    SKU, 
    VariantOptionValue, 
    InventoryItem
} from '../../../domain';
import { CurrentPrice } from './build-current-price';

export interface ProductVariantSKU {

    sku: SKU;

    values: readonly VariantOptionValue[];

    inventory: InventoryItem | null;

    currentPrice: CurrentPrice | null;

}

export function toProductVariantSKU(
    sku: SKU,
    inventoryItemsMap: ReadonlyMap<string, InventoryItem>,
    currentPricesMap: ReadonlyMap<string, CurrentPrice>,
    skuVariantValuesMap: Map<string, readonly VariantOptionValue[]>
): ProductVariantSKU {
    return {
        sku,
        values: skuVariantValuesMap.get(sku.id) ?? [],
        inventory: inventoryItemsMap.get(sku.id) || null,
        currentPrice: currentPricesMap.get(sku.id) || null
    };
}