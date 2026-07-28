import type { Product, ProductService, ProductStatus } from "../../../../domain";

import { ValidationError } from "@repo/shared/application";

export interface ProductEditorInfo {

    id?: string;

    slug: string;

    name: string;

    description: string | null;

    status: ProductStatus;
}

export interface ProductSynchronizer {

    execute(
        productId: string,
        desired: ProductEditorInfo,
    ): Promise<Product | null>;

}
    
class DefaultProductSynchronizer 
    implements ProductSynchronizer {

    constructor(

        private readonly productService: ProductService,

    ) {}

    async execute(
        productId: string,
        desired: ProductEditorInfo,
    ): Promise<Product | null> {
        if (!productId) throw new ValidationError("Product ID is required for product synchronization.");

        if (!desired) throw new ValidationError("No product data provided for synchronization.");

        const [, result] = await Promise.all([
            this.productService.update({...desired, id: productId}),

            this.productService.get(productId)
        ]);

        return result;

    }



    equals(
        current: Product,
        desired: ProductEditorInfo,
    ): boolean {
        return (

            current.name === desired.name &&
            current.status === desired.status &&
            current.description === desired.description 

        );
    }

}

export function createProductSynchronizer(
    productService: ProductService,
): ProductSynchronizer {
    return new DefaultProductSynchronizer(productService);
}