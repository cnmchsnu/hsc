import type { SKU, SKUService, SKUStatus } from "../../../../domain";

import { ValidationError } from "@repo/shared/application";

import { ProductAggregate } from "../../../aggragate";

import { ProductSkuDraft, VariantReference } from "../../builders";

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
        aggregate: ProductAggregate,

        desired: readonly ProductSkuDraft[],
    ): Promise<ProductSkuSynchronizeResult>;

}


class DefaultSkuSynchronizer
    implements SkuSynchronizer {

    constructor(
        private readonly skuService: SKUService,
    ) {}

    private resolveValueId(
        aggregate: ProductAggregate,
        ref: VariantReference,
    ): string {
        const optionId =
            aggregate.optionReferenceMap!.get(ref.optionName);

        if (!optionId) {
            throw new ValidationError(
                `Option "${ref.optionName}" not found.`
            );
        }

        const value =
            aggregate.values.find(v =>
                v.optionId === optionId &&
                v.value_name === ref.valueName
            );

        if (!value) {
            throw new ValidationError(
                `Value "${ref.valueName}" not found.`
            );
        }

        return value.id;

    }

    async execute(

        aggregate: ProductAggregate,

        desired: readonly ProductSkuDraft[],


    ): Promise<ProductSkuSynchronizeResult> {
        if (!desired || desired.length === 0) throw new ValidationError("No SKU data provided for synchronization.");
        if (!aggregate.skus) throw new ValidationError("No current SKU data provided for synchronization.");

        const current = await this.skuService.getByProduct(aggregate.productId!);


        const currentMap = new Map<string, SKU>(
            current.map(sku => [sku.code, sku])
        );

        const desiredMap = new Map<string, ProductSkuDraft>(
            desired.map(sku => [sku.code, sku])
        );

        const [create, update,] = await Promise.all([
            this.skuService.createManyViaAggregate(
                desired.filter(sku => !currentMap.has(sku.code)).map(sku => ({
                    ...sku,
                    optionValueIds: sku.variantRefs.map(ref => this.resolveValueId(aggregate, ref)),
                }))
            ),

            this.skuService.updateManyViaAggregate(desired.filter(sku => currentMap.has(sku.code)).map(sku => ({
                    ...sku,
                    id: currentMap.get(sku.code)!.id,
                    optionValueIds: sku.variantRefs.map(ref => this.resolveValueId(aggregate, ref))
                }))
            ),

            this.skuService.archiveMany(
                current.filter(sku => !desiredMap.has(sku.code))
            )
        ]);
        

        const skuReferenceMap = new Map<string, string>();

        current.forEach(sku => {
            skuReferenceMap.set(sku.code, sku.id);
        });

        create.forEach((id, code) => {
            skuReferenceMap.set(code, id);
        });

        update.forEach((id, code) => {
            skuReferenceMap.set(code, id);
        });

        return { skuReferenceMap };

    }



}

export function createSkuSynchronizer(
    skuService: SKUService,
): SkuSynchronizer {
    return new DefaultSkuSynchronizer(skuService);
}