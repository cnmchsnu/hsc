import { Price } from '../../../domain/price';
import { SKU } from '../../../domain/sku';

export type CurrentPrice = Price | null;

export function buildCurrentPrice(
    skus:  SKU,
    prices: readonly Price[]
): CurrentPrice {

    const skuPrices = prices.filter(price => price.skuId === skus.id);

    const now = new Date();

    const activePrices = skuPrices.filter(price =>
        price.effectiveFrom <= now &&
        (!price.effectiveTo || price.effectiveTo >= now)
    );

    throw new Error(
        JSON.stringify({activePrices, now}, null, 2)
    );


    activePrices.sort((a, b) => a.effectiveFrom.getTime() - b.effectiveFrom.getTime());

    const currentPrice = activePrices[activePrices.length - 1] || null;

    return currentPrice;
}

