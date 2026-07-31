
import type { InventoryItem, Price, SKU } from '../../../domain';

export interface SKUDetail {

    sku: SKU

    price: Price[] | null;

    inventory: InventoryItem | null;

}

export function buildSKUDetail(
    sku: SKU,
    prices: readonly Price[],
    inventoryItems: readonly InventoryItem[]
): SKUDetail {

    return {
        sku: sku,
        price: prices.filter(price => price.skuId === sku.id) ?? null,
        inventory: inventoryItems.find(item => item.skuid === sku.id) ?? null
    };

}
