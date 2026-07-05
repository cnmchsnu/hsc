import type { Category } from "./type";
import type { CategoryRepository } from "@repo/database/repositories";
import { CategoryNotFoundError } from "./error";


export interface CategoryService {

    getById(
        id: string,
    ): Promise<Category | null>;

    getByIds(
        ids: readonly string[],
    ): Promise<Category[]>;

    getBySlug(
        slug: string,
    ): Promise<Category | null>;

    // getBySlugs(
    //     ids: readonly string[],
    // ): Promise<Category[]>;

    list(): Promise<Category[]>;

    getPathToRoot(
        categoryId: string,
    ): Promise<Category[]>;


    // create(): Promise<Category>;

    // update(
    //     id: string,
    // ): Promise<Category>;

    // delete(
    //     id: string,
    // ): Promise<void>;

    // exists(
    //     id: string,
    // ): Promise<boolean>;
    

}

export function createCategoryService(
    repository: CategoryRepository,
): CategoryService {

    return {

        async getById(id) {

            const category =
                await repository.findById(id);
            
            if (!category) {
                throw new CategoryNotFoundError(id);
            }
            
            return category;
        },

        async getByIds(
            ids: string[],
        ) {
            if (ids.length === 0) {
                return [];
            }

            return await repository.findManyByIds(ids);
        },

        async getBySlug(slug) {

            const category =
                await repository.findBySlug(slug);
            
            if (!category) {
                throw new CategoryNotFoundError(slug);
            }

            return category;
        },

        async list() {

            const categories =
                await repository.list();

            if (!categories) {
                throw new CategoryNotFoundError("list");
            }

            return categories;
        },

        async getPathToRoot(
            categoryId: string,
        ): Promise<Category[]> {
            const path = await repository.findPathToRoot(categoryId);

            if (!path) {
                throw new CategoryNotFoundError(categoryId);
            }

            return path;
        }

    };

}