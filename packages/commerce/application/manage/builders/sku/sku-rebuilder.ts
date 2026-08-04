import type { Product } from "../../../../domain";
import type { ProductSkuGenerator } from "./sku-detail-generator";

import { SKUDetail, VariantDetail } from "../../../projections";



import { ConflictError } from "@repo/shared/application";
import { SKUDraftDetail } from "./product-sku-draft";

export interface SKURebuilderInput {
    current: readonly SKUDetail[];
    desired: readonly VariantDetail[];
    product: Product;
    includeDisabled?: boolean;

}


export interface SkuRebuilder {

    build(
        input: SKURebuilderInput
    ): SKUDraftDetail[]

}

export class DefaultSkuRebuilder 
    implements SkuRebuilder {

    constructor(
        private readonly generator: ProductSkuGenerator,

    ) {}

    private merge(
        sku: SKUDetail,
        desired: SKUDraftDetail,
    ): SKUDraftDetail {
        return {
            ...sku,
            sku: {
                ...sku.sku,
                status: desired.sku.status,
                variantRefs: desired.sku.variantRefs,
            }
        };
    }

    build(
        input: SKURebuilderInput
    ): SKUDraftDetail[] {

        const generated =
            this.generator.generate(input.desired, input.product);

        if (!input.includeDisabled) {
            input.current = input.current.filter(detail => detail.sku.status === 'active');
        }

        input.desired = input.desired.filter(detail => detail.option.isEnabled && detail.values.some(value => value.isEnabled));
        
        const currentMap = new Map<string, SKUDetail>
        
        for (const sku of input.current) {

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
