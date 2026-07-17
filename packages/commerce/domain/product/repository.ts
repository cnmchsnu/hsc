import type { Product, ProductList, ProductListOptions } from "./type";

import type { CreateProduct } from "./create";
import type { UpdateProduct } from "./update";

import type { Repository } from "@repo/shared";

export interface ProductRepository
    extends Repository<
    Product,
    string,
    CreateProduct,
    UpdateProduct,
    ProductListOptions,
    ProductList
> {


    findBySlug(
        slug: string,
    ): Promise<Product | null>;

    findBySlugs(
        slugs: readonly string[],
    ): Promise<Product[]>;



    list(): Promise<Product[]>;

    listExistingSlugs(
        slugs: readonly string[],
    ): Promise<readonly string[]>;


}