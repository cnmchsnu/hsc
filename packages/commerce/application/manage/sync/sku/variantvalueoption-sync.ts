
import type { VariantOptionValue, VariantOptionValueService } from "../../../../domain";
import { ProductAggregate } from "../../../aggragate";

import { ValidationError } from "@repo/shared/application";

export interface ProductVariantOptionValueEditor {

    id: string | null;

    optionName: string;

    optionId?: string;

    value: string;

    valueName: string;

    displayValue: string;

    isEnabled: boolean;

    version: number;

}



export interface VariantOptionValueSynchronizer {

    execute(
        aggregate: ProductAggregate,
        desired: readonly ProductVariantOptionValueEditor[],
    ): Promise<readonly VariantOptionValue[]>;

}

export class VariantOptionValueSynchronizer {

    constructor(

        private readonly variantOptionValueService: VariantOptionValueService,

    ) {}

    async execute(
        aggregate: ProductAggregate,
        desired: readonly ProductVariantOptionValueEditor[],
    ): Promise<readonly VariantOptionValue[]> {
        if (!aggregate.productId) throw new ValidationError("Product ID is required for variant option value synchronization.");
        if (!desired || desired.length === 0) throw new ValidationError("No variant option value data provided for synchronization.");

        const current = await this.variantOptionValueService.getByOptions([...aggregate.optionReferenceMap!.values()]);


        const currentMap = new Map<string, VariantOptionValue>(
            current.map(value => [value.value_name, value])
        );

        const desiredMap = new Map<string, ProductVariantOptionValueEditor>(
            desired.map(value => [value.valueName, value])
        );

        await Promise.all([
            this.variantOptionValueService.createMany(
                desired.filter(value => value.id === null).map(value => ({
                    ...value,
                    optionId: value.optionId || aggregate.optionReferenceMap!.get(value.optionName)!,
                }))
            ),

            this.variantOptionValueService.updateMany(
                desired.filter(value => currentMap.has(value.valueName!)
                ? !this.equals(currentMap.get(value.valueName!) as VariantOptionValue, value)
                : false).map(option => ({
                    id: option.id!,
                    displayValue: option.displayValue,
                    version: option.version,
                    isEnabled: option.isEnabled,
                }))
            ),

            this.variantOptionValueService.archiveMany(
                current.filter(value => !desiredMap.has(value.value_name))
            )
        ]);



        return await this.variantOptionValueService.getByOptions([...aggregate.optionReferenceMap!.values()]);
    }

    private equals(
        current: VariantOptionValue,
        desired: ProductVariantOptionValueEditor,
    ): boolean {
        return (
            current.optionId === desired.optionName &&
            current.value === desired.value &&
            current.value_name === desired.valueName &&
            current.displayValue === desired.displayValue 
        );
    }

}

export function createVariantOptionValueSynchronizer(
    variantOptionValueService: VariantOptionValueService,
): VariantOptionValueSynchronizer {
    return new VariantOptionValueSynchronizer(variantOptionValueService);
}