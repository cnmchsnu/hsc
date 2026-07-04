import type { Category } from "./category";
import type { Breadcrumb, CategoryTree } from "../application/projections/category";
import type { CategoryRepository } from "@repo/database/category";
import { CategoryNotFoundError, CategoryTreeError } from "../errors";
import { toBreadcrumbItem } from "../application/mappers";


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

    list(): Promise<Category[]>;

    getPathToRoot(
        categoryId: string,
    ): Promise<Category[]>;

    

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