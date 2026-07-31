import type { Product } from "../../../../domain";
import type { ProductSkuGenerator } from "./sku-detail-generator";

import { SKUDetail, VariantDetail } from "../../../projections";



import { ConflictError } from "@repo/shared/application";


export interface SkuRebuilder {

    build(
        current: readonly SKUDetail[],
        desired: readonly VariantDetail[],
        product: Product,
        includeDisabled?: boolean,
    ): SKUDetail[]

}

export class DefaultSkuRebuilder 
    implements SkuRebuilder {

    constructor(
        private readonly generator: ProductSkuGenerator,

    ) {}

    private merge(
        sku: SKUDetail,
        desired: SKUDetail,
    ): SKUDetail {
        return {
            ...sku,
            sku: {
                ...sku.sku,
                status: desired.sku.status,
            }
        };
    }

    build(
        current: readonly SKUDetail[],
        desired: readonly VariantDetail[],
        product: Product,
        includeDisabled: boolean = false,
    ): SKUDetail[] {

        const generated =
            this.generator.generate(desired, product);

        if (!includeDisabled) {
            current = current.filter(detail => detail.sku.status === 'active');
        }
        
        const currentMap = new Map<string, SKUDetail>
        
        for (const sku of current) {

            if (currentMap.has(sku.sku.code)) {
                throw new ConflictError(
                    `Duplicate SKU code detected: ${sku.sku.code}`
                );
            }

            currentMap.set(sku.sku.code, sku);
        }

        return generated.map(desired => {
            const existingSku = currentMap.get(desired.sku.code);
            
            return existingSku 
                ? this.merge(existingSku, desired) 
                : desired;
        });
    }
}
