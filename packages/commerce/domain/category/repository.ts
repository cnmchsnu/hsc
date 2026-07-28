import type { Category, CreateCategory, UpdateCategory } from ".";


import type { Repository } from "@repo/shared";

export interface CategoryRepository 
    extends Repository<
    Category,
    string,
    CreateCategory,
    UpdateCategory,
    any,
    any
> {

    getBySlug(
        slug: string,
    ): Promise<Category | null>;


    getBySlugs(
        slugs: readonly string[],
    ): Promise<Category[]>;


    // Query

    list(): Promise<Category[]>;


    listExistingSlugs(
        slugs: readonly string[],
    ): Promise<readonly string[]>;


    // Other

    findPathToRoot(
        categoryId: string,
    ): Promise<Category[]>;

}