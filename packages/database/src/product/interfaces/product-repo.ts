import type { Product, ProductList, ProductListOptions } from "@repo/commerce/product";

export interface ProductRepository {

    findById(
        id: string,
    ): Promise<Product | null>;

    findBySlug(
        slug: string,
    ): Promise<Product | null>;

    list(
        options: ProductListOptions,
    ): Promise<ProductList>;


}