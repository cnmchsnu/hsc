import { Price } from '../../../domain/price';

export type CurrentPrice = Price | null;

export function buildCurrentPrice(
    skusId: string,
    prices: readonly Price[]
): CurrentPrice {


    const skuPrices = prices.filter(price => price.skuId === skusId);

    const now = new Date();

    const activePrices = skuPrices.filter(price =>
        price.effectiveFrom <= now &&
        (!price.effectiveTo || price.effectiveTo >= now)
    );


    activePrices.sort(
        (a, b) =>
            b.effectiveFrom.getTime() -
            a.effectiveFrom.getTime()
    );

    return activePrices[0] ?? null;
}

