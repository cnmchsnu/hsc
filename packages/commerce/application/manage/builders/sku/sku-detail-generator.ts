import type { Product, VariantOption, VariantOptionValue } from "../../../../domain";
import { VariantDetail } from "../../../projections";
import { SKUDraftDetail, VariantCombinationValue } from "./product-sku-draft";

import { ProductSkuCodeGenerator } from "./sku-code-generator";

import { ConflictError } from "@repo/shared/application";


export interface ProductSkuGenerator {

    generate(

        desired: readonly VariantDetail[],

        product: Product,

    ): readonly SKUDraftDetail[];
    
}



export class DefaultProductSkuGenerator 
    implements ProductSkuGenerator {

    constructor(
        private readonly skuCodeGenerator: ProductSkuCodeGenerator,
    ) {}


    private cartesian(
        groups: VariantCombinationValue[][],
    ): VariantCombinationValue[][] {
        if (!groups || groups.length === 0) return [];
        if (groups.some((group) => group.length === 0)) return [];

        const totalCombinations = groups.reduce((acc, curr) => acc * curr.length, 1);
        if (totalCombinations > 2000) {
            throw new ConflictError(`組合數量過多 (${totalCombinations})，請減少規格選項！`);
        }


        return groups.reduce<VariantCombinationValue[][]>(
            (accumulator, currentGroup) =>
            accumulator.flatMap((accItem) =>
                currentGroup.map((item) => [...accItem, item])
            ),
            [[]] // 初始值為一個包含空陣列的陣列
        );
    }

    private buildSKU(
        product: Product,
        combination: VariantCombinationValue[],
    ): SKUDraftDetail {

        return{
            sku: {
                id: "",
                productId: product.id,
                code: this.skuCodeGenerator.generate(product, combination.map(value => value.value)),
                barcode: "",
                status: 'active',
                version: 1,
                variantRefs: combination.map(value => ({
                    optionName: value.option.name,
                    valueName: value.value.value_name,
                })),
            },
            price: [{
                id: "",
                skuId: "",
                amount: 0,
                currency: "TWD",
                compareAt: null,
                cost: null,
                effectiveFrom: new Date(),
                effectiveTo: null,
                version: 1,
            }],
            inventory: {
                skuid: "",
                availableQuantity: 0,
                reservedQuantity: 0,
                incomingQuantity: 0,
                version: 1,
            }
        };
    }

    generate(
        desired: readonly VariantDetail[],
        product: Product,
    ): readonly SKUDraftDetail[] {

        const valueMap = desired.map(option => ({ option: option, values: option.values }));

        const sortedValueMap = [...valueMap].sort((a, b) => a.option.option.sortOrder - b.option.option.sortOrder);

        const combinations = this.cartesian(sortedValueMap.map(group => {
            return group.values.map(value => (
                {
                    option: group.option.option,
                    value: value
                }
            ));
        }));

        const generated = combinations.map(combination => this.buildSKU(product, combination));

        const seen = new Set<string>();

        for (const sku of generated) {
            if (seen.has(sku.sku.code)) {
                throw new ConflictError(
                    `Generated duplicate SKU code: ${sku.sku.code}`
                );
            }
            seen.add(sku.sku.code);
        }

        return generated;
    }
}


