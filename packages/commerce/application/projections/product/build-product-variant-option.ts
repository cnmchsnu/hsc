import {
    VariantOption, 
    VariantOptionValue, 
} from '../../../domain';

export interface ProductVariantOption {

    option: VariantOption;

    values: readonly VariantOptionValue[];

}


export function toProductVariantOption(
    option: VariantOption,
    values: readonly VariantOptionValue[]
): ProductVariantOption {
    const filteredValues = values.filter((value) => value.optionId === option.id);

    return {
        option,
        values: filteredValues.length ? filteredValues : [],
    };
}