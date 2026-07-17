import { Price } from '../../../domain/price';
import { SKU } from '../../../domain/sku';
import { buildCurrentPrice } from './build-current-price';
import { toSKUPrice } from './mappers';


export interface DisplayPrice {

    min: Price | null;

    max: Price | null;

    current: Price | null;

    hasRange: boolean;

}

export function buildDisplayPrice(
    skus: readonly SKU[],
    prices: readonly Price[]
): DisplayPrice {

    if (prices.length === 0) {
        return {
            min: null,
            max: null,
            current: null,
            hasRange: false
        };
    }

    const skuPrices = skus.map(sku => toSKUPrice(sku, prices)).filter(skuPrice => skuPrice.Prices.length !== 0);

    const currentPrices = skuPrices.map(skuPrice => buildCurrentPrice(skuPrice.Prices)).filter(price => price !== null);

    
    const sortedPrices = currentPrices.sort((a, b) => a.amount - b.amount);

    const minPrice = sortedPrices[0];
    const maxPrice = sortedPrices[sortedPrices.length - 1];

    return {
        min: minPrice,
        max: maxPrice,
        current: null,
        hasRange: minPrice.amount !== maxPrice.amount
    };
}
