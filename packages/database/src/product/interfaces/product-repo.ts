import type { Product } from "@repo/commerce/types"

export interface ProductRepository {

    findById(
        id: string,
    ): Promise<Product | null>;

    // findBySlug(
    //     slug: string,
    // ): Promise<Product | null>;

    // list(): Promise<Product[]>;

    // search(
    //     keyword: string,
    // ): Promise<Product[]>;

    // create(
    //     product: Product,
    // ): Promise<void>;

    // update(
    //     product: Product,
    // ): Promise<void>;

}