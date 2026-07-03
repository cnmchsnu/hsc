import type { Category } from "../../../../commerce/src/category";

export interface CategoryRepository {

    findById(
        id: string,
    ): Promise<Category | null>;

    findBySlug(
        slug: string,
    ): Promise<Category | null>;

    list(): Promise<Category[]>;

    findManyByIds(
        ids: readonly string[],
    ): Promise<Category[]>;

    findPathToRoot(
        categoryId: string,
    ): Promise<Category[]>;

    

}