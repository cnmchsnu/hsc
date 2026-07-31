import type { SKU, SKUService, SKUStatus } from "../../../../domain";

import { ValidationError } from "@repo/shared/application";

export interface ProductSkuEditor {

    id?: string;

    productId: string;

    code: string;

    barcode?: string | null;

    status: SKUStatus;

    optionValueIds: readonly string[];
    
}

export interface ProductSkuSynchronizeResult {

    skuReferenceMap: Map<
        string, // skuCode
        string  // skuId
    >;

}

export interface SkuSynchronizer {

    execute(
        desired: readonly ProductSkuEditor[],
        current: readonly SKU[],
    ): Promise<ProductSkuSynchronizeResult>;

}


class DefaultSkuSynchronizer
    implements SkuSynchronizer {

    constructor(
        private readonly skuService: SKUService,
    ) {}

    async execute(

        desired: readonly ProductSkuEditor[],

        current: readonly SKU[],

    ): Promise<ProductSkuSynchronizeResult> {
        if (!desired || desired.length === 0) throw new ValidationError("No SKU data provided for synchronization.");
        if (!current) throw new ValidationError("No current SKU data provided for synchronization.");

        const currentMap = new Map<string, SKU>(
            current.map(sku => [sku.code, sku])
        );

        const desiredMap = new Map<string, ProductSkuEditor>(
            desired.map(sku => [sku.code, sku])
        );

        const [create, update,] = await Promise.all([
            this.skuService.createManyViaAggregate(
                desired.filter(sku => !sku.id)
            ),

            this.skuService.updateManyViaAggregate(
                desired.filter(sku => {
                    const currentSku = currentMap.get(sku.code);
                    return currentSku && !this.equals(currentSku, sku);
                })
            ),

            this.skuService.archiveManyViaAggregate(
                current.filter(sku => !desiredMap.has(sku.code))
            )
        ]);
        

        const skuReferenceMap = new Map(create);

        update.forEach((value, key) => skuReferenceMap.set(key, value));
        return { skuReferenceMap };

    }

    private equals(

        current: SKU,

        desired: ProductSkuEditor,

    ) {

        return (

            current.code === desired.code &&

            current.barcode === desired.barcode &&

            current.status === desired.status 

        );

    }


}

export function createSkuSynchronizer(
    skuService: SKUService,
): SkuSynchronizer {
    return new DefaultSkuSynchronizer(skuService);
}