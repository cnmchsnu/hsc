import type { SKU } from "../../../../domain/index.ts";
import { ProductAggregate } from "../../../aggragate/index.ts";

import type { ProductSkuEditor } from "../../sync/index.ts";
import type { ProductSkuGenerator } from "./sku-editor-builder.ts";


export interface SkuBuilder {

    build(
        current: readonly SKU[],
        aggregate: ProductAggregate,
        includeDisabled?: boolean,
    ): readonly ProductSkuEditor[]

}

export class DefaultSkuBuilder 
    implements SkuBuilder {

    constructor(
        private readonly generator: ProductSkuGenerator,

    ) {}

    private merge(
        sku: SKU,
        desired: ProductSkuEditor,
    ): ProductSkuEditor {
        return {
            id: sku.id,
            productId: sku.productId,
            code: sku.code,
            barcode: sku.barcode,
            status: sku.status,
            optionValueIds: desired.optionValueIds,
        };
    }

    build(
        current: readonly SKU[],
        aggregate: ProductAggregate,
        includeDisabled: boolean = false,
    ): readonly ProductSkuEditor[] {

        const generated =
            this.generator.generate(aggregate);

        if (!includeDisabled) {
            current = current.filter(sku => sku.status === 'active');
        }
        
        const currentMap = new Map<string, SKU>(
            current.map(sku => [sku.code, sku])
        );;

        return generated.map(desired => {
            const existingSku = currentMap.get(desired.code);
            
            return existingSku 
                ? this.merge(existingSku, desired) 
                : desired;
        });
    }
}
