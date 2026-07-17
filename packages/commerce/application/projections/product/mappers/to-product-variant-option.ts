import { VariantOption } from '../../../../domain/variant-option';
import { VariantOptionValue } from '../../../../domain/variant-option-value';
import { ProductVariantOption } from '../build-product-variant';

export function toProductVariantOption(
    options: VariantOption,
    values: readonly VariantOptionValue[]
):ProductVariantOption {
    return {
        option: options,
        values: values.filter((value) => value.optionId === options.id),
    };
}
