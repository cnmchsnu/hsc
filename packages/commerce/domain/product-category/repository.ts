import type { CreateProductCategory, ProductCategory } from ".";

import { Repository } from "@repo/shared";

export interface ProductCategoryRepository
    extends Omit<Repository<
        ProductCategory,
        string,
        CreateProductCategory,
        any,
        any,
        any
    >, "find" | "get" | "getMany" | "exists" | "listExisting" | "deleteMany" | "delete"> {

    // Relation Single

    getByProductId(
        productId: string,
    ): Promise<readonly ProductCategory[]>;

    getByCategoryId(
        categoryId: string,
    ): Promise<readonly ProductCategory[]>;
    
    getPrimaryByProductId(
        productId: string,
    ): Promise<ProductCategory | null>;

    // Relation Batch
    
    getByProductIds(
        productIds: string[],
    ): Promise<readonly ProductCategory[]>;

    getByCategoryIds(
        categoryIds: string[],
    ): Promise<readonly ProductCategory[]>;

    getPrimaryByProductIds(
        productIds: string[],
    ): Promise<readonly ProductCategory[]>;



    deleteManyByProductId(
        productId: string,
    ): Promise<void>;

    deleteManyByCategoryId(
        categoryId: string,
    ): Promise<void>;

    deleteMany(
        ids: readonly string[],
        relations: readonly ProductCategory[],
    ): Promise<void>;


}