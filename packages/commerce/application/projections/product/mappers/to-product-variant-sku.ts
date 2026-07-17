import { ProductVariantSKU } from '../build-product-variant';
import { SKU } from '../../../../domain/sku';
import { InventoryItem } from '../../../../domain/inventory-item';
import { CurrentPrice } from '../build-current-price';
import { VariantOptionValue } from '../../../../domain/variant-option-value';
import { SKUVariantValue } from '../../../../domain/sku-variant-value';


export function toProductVariantSKU(
    sku: SKU,
    inventoryItemsMap: ReadonlyMap<string, InventoryItem>,
    currentPricesMap: ReadonlyMap<string, CurrentPrice>,
    skuVariantValuesMap: Map<string, readonly VariantOptionValue[]>,

): ProductVariantSKU {
    return {
        sku,
        values: skuVariantValuesMap.get(sku.id) ?? [],
        inventory: inventoryItemsMap.get(sku.id) || null,
        currentPrice: currentPricesMap.get(sku.id) || null
    };
}