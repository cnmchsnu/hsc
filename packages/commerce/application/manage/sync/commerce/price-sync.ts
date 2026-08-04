import type { Price, PriceService } from "../../../../domain";
import { ProductAggregate } from "../../../aggragate";

import { ValidationError } from "@repo/shared/application";

export interface ProductPriceEditor {

    id: string | null;

    skuId?: string;

    code: string;

    amount: number;

    currency: string;

    compareAt: number | null;
    
    cost: number | null;

    effectiveFrom: Date;

    effectiveTo: Date | null;

    version: number;

}

export interface PriceSynchronizer {

    execute(
        aggregate: ProductAggregate,
        desired: readonly ProductPriceEditor[],
    ): Promise<void>;

}
    

class DefaultPriceSynchronizer 
    implements PriceSynchronizer {

    constructor(

        private readonly priceService: PriceService,

    ) {}

    async execute(

        aggregate: ProductAggregate,

        desired: readonly ProductPriceEditor[],

    ): Promise<void> {

        

        if (!aggregate.productId) throw new ValidationError("Product ID is required for price synchronization.");

        if (desired.length === 0) throw new ValidationError("No price data provided for synchronization.");

        const current = await this.priceService.getManyBySKUIds(Array.from(aggregate.skuReferenceMap!.values()));

        const currentMap = new Map<string, Price>(
            current.map(price => [price.skuId, price])
        );

        await Promise.all([
            this.priceService.createMany(
                desired.filter(sku => aggregate.skuReferenceMap?.has(sku.code) && !currentMap.has(aggregate.skuReferenceMap!.get(sku.code)!)).map(sku => {
                    return {
                        ...sku,
                        skuId: sku.skuId || aggregate.skuReferenceMap!.get(sku.code)!,
                    };
                })
            ),

            this.priceService.updateMany(
                desired.filter(sku => aggregate.skuReferenceMap?.has(sku.code) && currentMap.has(aggregate.skuReferenceMap!.get(sku.code)!)).map(sku => ({
                    ...sku,
                    id: currentMap.get(aggregate.skuReferenceMap!.get(sku.code)!)!.id,
                    skuId: sku.skuId || aggregate.skuReferenceMap!.get(sku.code)!,
                }))
            )
        ])



    }




    equals(
        current: Price,
        desired: ProductPriceEditor,
    ): boolean {
        return (
            current.amount === desired.amount &&
            current.currency === desired.currency &&
            current.compareAt === desired.compareAt &&
            current.cost === desired.cost &&
            current.effectiveFrom.getTime() === desired.effectiveFrom.getTime() &&
            current.effectiveTo?.getTime() === desired.effectiveTo?.getTime() &&
            current.version === desired.version
        );
    }

}

export function createPriceSynchronizer(
    priceService: PriceService,
): PriceSynchronizer {
    return new DefaultPriceSynchronizer(priceService);
}