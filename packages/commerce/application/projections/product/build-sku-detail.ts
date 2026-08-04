
import type { InventoryItem, Price, SKU } from '../../../domain';
import { ProductSkuDraft } from '../../manage';

export interface SKUDetail {

    sku: ProductSkuDraft

    price: Price[] | null;

    inventory: InventoryItem | null;

}

export function buildSKUDetail(
    sku: ProductSkuDraft,
    prices: readonly Price[],
    inventoryItems: readonly InventoryItem[]
): SKUDetail {

    return {
        sku: sku,
        price: prices.filter(price => price.skuId === sku.id) ?? null,
        inventory: inventoryItems.find(item => item.skuid === sku.id) ?? null
    };

}
