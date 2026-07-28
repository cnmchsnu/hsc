import type { Product, VariantOption, VariantOptionValue } from "../../../../domain/index.ts";
import { ProductAggregate } from "../../../aggragate/index.ts";

import { ProductSkuEditor } from "../../sync/index.ts";
import { ProductSkuCodeGenerator } from "./sku-code-generator.ts";

import { ConflictError } from "@repo/shared/application";


export interface ProductSkuGenerator {

    generate(

        aggregate: ProductAggregate,

    ): readonly ProductSkuEditor[];
    
}



export class DefaultProductSkuGenerator 
    implements ProductSkuGenerator {

    constructor(
        private readonly skuCodeGenerator: ProductSkuCodeGenerator,
    ) {}

    private groupValues(
        optionId: string,
        values: readonly VariantOptionValue[],
    ): VariantOptionValue[] {
        return values.filter(value => value.optionId === optionId);
    }


    private cartesian(
        groups: VariantOptionValue[][],
    ): VariantOptionValue[][] {
        if (!groups || groups.length === 0) return [];
        if (groups.some((group) => group.length === 0)) return [];

        const totalCombinations = groups.reduce((acc, curr) => acc * curr.length, 1);
        if (totalCombinations > 2000) {
            throw new ConflictError(`組合數量過多 (${totalCombinations})，請減少規格選項！`);
        }


        return groups.reduce<VariantOptionValue[][]>(
            (accumulator, currentGroup) =>
            accumulator.flatMap((accItem) =>
                currentGroup.map((item) => [...accItem, item])
            ),
            [[]] // 初始值為一個包含空陣列的陣列
        );
    }

    private buildSKU(
        product: Product,
        combination: VariantOptionValue[],
    ): ProductSkuEditor {

        return{
            id: null,
            productId: product.id,
            code: this.skuCodeGenerator.generate(product, combination),
            status: 'active',
            optionValueIds: combination.map(value => value.id),
        };
    }

    generate(
        aggregate: ProductAggregate,
    ): readonly ProductSkuEditor[] {

        const valueMap = aggregate.options.map(option => ({ option: option, values: this.groupValues(option.id, aggregate.values) }));

        const sortedValueMap = [...valueMap].sort((a, b) => a.option.sortOrder - b.option.sortOrder);

        const combinations = this.cartesian(sortedValueMap.map(group => group.values));

        return combinations.map(combination => this.buildSKU(aggregate.product!, combination));
    }
}


