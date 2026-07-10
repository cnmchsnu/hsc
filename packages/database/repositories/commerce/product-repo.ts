import type { Product, ProductList, ProductListOptions } from "../../../commerce/domain/product";

export interface ProductRepository {

    // Read Single
    findById(
        id: string,
    ): Promise<Product | null>;

    findBySlug(
        slug: string,
    ): Promise<Product | null>;


    // Read Batch

    findByIds(
        ids: readonly string[],
    ): Promise<Product[]>;

    findBySlugs(
        slugs: readonly string[],
    ): Promise<Product[]>;


    // Query

    list(): Promise<Product[]>;

    search(
        options: ProductListOptions,
    ): Promise<ProductList>;


    // Exists Single

    exists(
        id: string,
    ): Promise<boolean>;

    
    // Exists Batch

    listExistingIds(
        ids: readonly string[],
    ): Promise<string[]>;

    listExistingSlugs(
        slugs: readonly string[],
    ): Promise<readonly string[]>;


    // Write Single

    create(
        product: Product,
    ): Promise<void>;

    update(
        product: Product,
    ): Promise<void>;

    delete(
        id: string,
    ): Promise<void>;


    // Write Batch

    createMany(
        products: readonly Product[],
    ): Promise<void>;

    updateMany(
        products: readonly Product[],
    ): Promise<void>;

    deleteMany(
        ids: readonly string[],
    ): Promise<void>;

}