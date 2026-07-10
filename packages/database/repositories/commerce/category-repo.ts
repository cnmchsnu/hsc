import type { Category } from "../../../commerce/domain/category";

export interface CategoryRepository {

    // Read Single

    findById(
        id: string,
    ): Promise<Category | null>;

    findBySlug(
        slug: string,
    ): Promise<Category | null>;


    // Read Batch

    findByIds(
        ids: readonly string[],
    ): Promise<Category[]>;

    findBySlugs(
        slugs: readonly string[],
    ): Promise<Category[]>;


    // Query

    list(): Promise<Category[]>;


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
        category: Category,
    ): Promise<void>;

    update(
        category: Category,
    ): Promise<void>;

    delete(
        id: string,
    ): Promise<void>;


    // Write Batch

    createMany(
        categories: readonly Category[],
    ): Promise<void>;

    updateMany(
        categories: readonly Category[],
    ): Promise<void>;

    deleteMany(
        ids: readonly string[],
    ): Promise<void>;


    // Other

    findPathToRoot(
        categoryId: string,
    ): Promise<Category[]>;

}