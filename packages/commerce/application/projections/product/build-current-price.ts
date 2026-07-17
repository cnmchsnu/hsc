import { Price } from '../../../domain/price';
import { SKU } from '../../../domain/sku';

export type CurrentPrice = Price | null;

export function buildCurrentPrice(
    skus:  SKU,
    prices: readonly Price[]
): CurrentPrice {

    const skuPrices = prices.filter(price => price.skuId === skus.id);

    const activePrices = skuPrices.filter(price => {
        price.effectiveFrom <= new Date() && (!price.effectiveTo || price.effectiveTo >= new Date());
    });

    activePrices.sort((a, b) => a.effectiveFrom.getTime() - b.effectiveFrom.getTime());

    const currentPrice = activePrices[activePrices.length - 1] || null;

    return currentPrice;
}

