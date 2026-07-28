import type { Product, VariantOptionValue } from "../../../../domain";

export interface ProductSkuCodeGenerator {

    generate(

        productSlug: Product,

        values: readonly VariantOptionValue[],

    ): string;

}

export class DefaultProductSkuCodeGenerator 
    implements ProductSkuCodeGenerator {

    generate(
        product: Product,
        values: readonly VariantOptionValue[],
    ): string {
        return product.slug + '-' + values.map(value => value.value_name).join('-');
    }
}

