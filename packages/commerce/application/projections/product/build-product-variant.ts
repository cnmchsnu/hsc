import { VariantOption } from '../../../domain/variant-option';
import { VariantOptionValue } from '../../../domain/variant-option-value';
import { SKU } from '../../../domain/sku';
import { SKUVariantValue } from '../../../domain/sku-variant-value';
import { InventoryItem } from '../../../domain/inventory-item';
import { CurrentPrice } from './build-current-price';
import { toProductVariantOption, toProductVariantSKU } from './mappers';




export interface ProductVariantOption {

    option: VariantOption;

    values: readonly VariantOptionValue[];

}

export interface ProductVariantSKU {

    sku: SKU;

    values: readonly VariantOptionValue[];

    inventory: InventoryItem | null;

    currentPrice: CurrentPrice | null;

}

export interface ProductVariant {

    options: readonly ProductVariantOption[];

    skus: readonly ProductVariantSKU[];

}

export function buildProductVariant(
    options: readonly VariantOption[],
    values: readonly VariantOptionValue[],
    skus: readonly SKU[],
    skuVariantValues: readonly SKUVariantValue[],
    inventoryItems: readonly InventoryItem[],
    currentPrices: readonly CurrentPrice[]

): ProductVariant {

    const variantOptions = options.map((option) => toProductVariantOption(option, values));

    const inventoryItemsMap = new Map(inventoryItems.map(item => [item.skuid, item]));

    const currentPricesMap = new Map(skus.map(sku => [sku.id, currentPrices.find(price => price?.skuId === sku.id) || null]));

    const variantOptionValuesMap = new Map(values.map(value => [value.id, value]));

    const skuVariantValuesMap =
        new Map<string, VariantOptionValue[]>();

    for (const link of skuVariantValues) {

        const optionValue =
            variantOptionValuesMap.get(link.optionValueId);

        if (!optionValue) continue;

        const values =
            skuVariantValuesMap.get(link.skuId) ?? [];

        values.push(optionValue);

        skuVariantValuesMap.set(
            link.skuId,
            values,
        );

    }


    const variantSKUs = skus.map((sku) => toProductVariantSKU(
        sku,
        inventoryItemsMap,
        currentPricesMap,
        skuVariantValuesMap
    ));

    return {
        options: variantOptions,
        skus: variantSKUs,
    };
}

