import type { VariantOption, VariantOptionName, VariantOptionService } from "../../../../domain";


import { ProductAggregate } from "../../../aggragate";


import { ValidationError } from "@repo/shared/application";

export interface ProductVariantOptionEditor {

    id: string | null;

    name: VariantOptionName;

    displayName: string;

    sortOrder: number;

    version: number;

}

export interface ProductVariantOptionSynchronizeResult {

    optionReferenceMap: Map<
        string, // optionName
        string  // optionId
    >;

    options: readonly VariantOption[];

}

export interface VariantOptionSynchronizer {

    execute(
        aggregate: ProductAggregate,
        desired: readonly ProductVariantOptionEditor[],
    ): Promise<ProductVariantOptionSynchronizeResult>;

}


class DefaultVariantOptionSynchronizer
    implements VariantOptionSynchronizer {

    constructor(

        private readonly variantOptionService: VariantOptionService,

    ) {}

    async execute(

        aggregate: ProductAggregate,

        desired: readonly ProductVariantOptionEditor[],

    ): Promise<ProductVariantOptionSynchronizeResult> {

        if (!aggregate.productId) throw new ValidationError("Product ID is required for variant option synchronization.");
        if (!desired || desired.length === 0) throw new ValidationError("No variant option data provided for synchronization.");

        const current = aggregate.options;

        const currentMap = new Map<string, VariantOption>(
            current.map(option => [option.name, option])
        );

        const desiredMap = new Map<string, ProductVariantOptionEditor>(
            desired.map(option => [option.name!, option])
        );


        await Promise.all([
            this.variantOptionService.createMany(
                desired.filter(option => !currentMap.has(option.name!)).map(option => {
                    return {
                        ...option,
                        productId: aggregate.productId!,
                    };
                })
            ),

            this.variantOptionService.updateMany(
                desired.filter(option => currentMap.has(option.name!)
                ? !this.equals(currentMap.get(option.name!) as VariantOption, option)
                : false).map(option => ({
                    id: option.id!,
                    name: option.name,
                    displayName: option.displayName,
                    sortOrder: option.sortOrder,
                }))
            ),

            this.variantOptionService.archiveMany(
                current.filter(option => !desiredMap.has(option.name))
            )

        ]);

        const result = await this.variantOptionService.getByProduct(aggregate.productId);

        const optionReferenceMap = new Map<string, string>(
            result.map(option => [option.name, option.id])
        );

        return { optionReferenceMap, options: result };



    }

    private equals(
        current: VariantOption,
        desired: ProductVariantOptionEditor,
    ): boolean {
        return (

            current.name === desired.name &&
            current.displayName === desired.displayName &&
            current.sortOrder === desired.sortOrder &&
            current.version === desired.version

        );
    }

}

export function createVariantOptionSynchronizer(
    variantOptionService: VariantOptionService,
): VariantOptionSynchronizer {
    return new DefaultVariantOptionSynchronizer(variantOptionService);
}