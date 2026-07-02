import type { Category } from "@repo/commerce/category";

export interface CategoryRepository {

    findById(
        id: string,
    ): Promise<Category | null>;

    findBySlug(
        slug: string,
    ): Promise<Category | null>;

    list(): Promise<Category[]>;

    

}