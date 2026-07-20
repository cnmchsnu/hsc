import { Price } from '../../../domain/price';
import { CurrentPrice } from './build-current-price';


export interface DisplayPrice {

    min: Price | null;

    max: Price | null;

    current: Price | null;

    hasRange: boolean;

}

export function buildDisplayPrice(
    currentPrices: CurrentPrice[]
): DisplayPrice {


    if (currentPrices.length === 0) {
        return {
            min: null,
            max: null,
            current: null,
            hasRange: false
        };
    };

    
    const sortedPrices = [...currentPrices].sort(
            (a, b) => a!.amount - b!.amount,
        );

    return {
        min: sortedPrices[0] || null,
        max: sortedPrices.at(-1) || null,
        current: sortedPrices[0] || null,
        hasRange: sortedPrices[0]?.amount !== sortedPrices.at(-1)!.amount
    };
}
