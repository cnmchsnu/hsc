import { SKU } from '../../../../domain/sku';
import { Price } from '../../../../domain/price';

export function toSKUPrice(
    sku: SKU,
    prices: readonly Price[]
): { sku: SKU; Prices: Price[] } {
    return {
        sku,
        Prices: prices.find(price => price.skuId === sku.id) ? prices.filter(price => price.skuId === sku.id) : []
    }

}