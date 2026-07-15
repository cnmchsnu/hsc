import type { ProductCategory } from "../../../commerce/domain/product-category";


export interface ProductCategoryRepository {

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
    ): Promise<ProductCategory[] | null>;

    // Write Single

    create(
        relation: ProductCategory,
    ): Promise<void>;

    update(
        relation: ProductCategory,
    ): Promise<void>;

    delete(
        productId: string,
        categoryId: string,
    ): Promise<void>;

    // Write Batch

    createMany(
        relations: readonly ProductCategory[],
    ): Promise<void>;

    updateMany(
        relations: readonly ProductCategory[],
    ): Promise<void>;

    deleteMany(
        relations: readonly ProductCategory[],
    ): Promise<void>;

    deleteManyByProductId(
        productId: string,
    ): Promise<void>;

    deleteManyByCategoryId(
        categoryId: string,
    ): Promise<void>;

}