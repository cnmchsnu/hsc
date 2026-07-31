import { ConflictError } from "@repo/shared/application";
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
        const code = product.slug + '-' + values.map(value => value.value_name).join('-');

        if (!code.trim()) {
            throw new ConflictError("Invalid SKU code.");
        }

        
        return code;
    }
}

