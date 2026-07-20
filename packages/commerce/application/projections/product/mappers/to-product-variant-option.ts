import { VariantOption } from '../../../../domain/variant-option';
import { VariantOptionValue } from '../../../../domain/variant-option-value';
import { ProductVariantOption } from '../build-product-variant';

export function toProductVariantOption(
    options: VariantOption,
    values: readonly VariantOptionValue[]
):ProductVariantOption {
    const filteredValues = values.filter((value) => value.optionId === options.id);

    return {
        option: options,
        values: filteredValues.length ? filteredValues : [],
    };
}
