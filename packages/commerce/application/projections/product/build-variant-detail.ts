
import type { VariantOption, VariantOptionValue } from '../../../domain';

export interface VariantDetail {

    option: VariantOption

    values: VariantOptionValue[]

}

export function buildVariantDetail(

    option: VariantOption,
    
    values: readonly VariantOptionValue[]

): VariantDetail {

    return {
        option: option,
        values: values.filter(value => value.optionId === option.id)
    };

}
