import type { Category } from "./type";
import type { CategoryRepository } from "@repo/database/repositories";
import { CategoryNotFoundError } from "./error";


export interface CategoryService {

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

export function createCategoryService(
    repository: CategoryRepository,
): CategoryService {

    return {

                // Read Single
        async findById(
            id: string
        ): Promise<Category | null> {
            const category =
                await repository.findById(id);
            
            if (!category) {
                return null;
            }

            return category;
        },
        async findBySlug(
            slug: string
        ): Promise<Category | null> {
            const category =
                await repository.findBySlug(slug);
            
            if (!category) {
                return null;
            }

            return category;
        },

        // Read Batch
        async findByIds(
            ids: readonly string[]
        ): Promise<Category[]> {
            if (ids.length === 0) {
                return [];
            }

            const categories =
                await repository.findByIds(ids);
            
            if (!categories) {
                return [];
            }

            return categories;
        },
        
        async findBySlugs(
            slugs: readonly string[]
        ): Promise<Category[]> {
            if (slugs.length === 0) {
                return [];
            }

            const categories =
                await repository.findBySlugs(slugs);
            
            if (!categories) {
                return [];
            }

            return categories;
        },

        // Query
        async list(): Promise<Category[]> {
            const categories =
                await repository.list();
            
            if (!categories) {
                return [];
            }

            return categories;
        },

        // Exists Single
        async exists(
            id: string
        ): Promise<boolean> {
            return await repository.exists(id);
        },

        // Exists Batch
        async listExistingIds(
            ids: readonly string[]
        ): Promise<string[]> {
            if (ids.length === 0) {
                return [];
            }

            const existingIds =
                await repository.listExistingIds(ids);
            
            if (!existingIds) {
                return [];
            }

            return existingIds;
        },

        async listExistingSlugs(
            slugs: readonly string[]
        ): Promise<readonly string[]> {
            if (slugs.length === 0) {
                return [];
            }

            const existingSlugs =
                await repository.listExistingSlugs(slugs);

            if (!existingSlugs) {
                return [];
            }

            return existingSlugs;
        },

        // Write Single
        async create(
            category: Category
        ): Promise<void> {
            await repository.create(category);
        },

        async update(
            category: Category
        ): Promise<void> {
            await repository.update(category);
        },

        async delete(
            id: string
        ): Promise<void> {
            await repository.delete(id);
        },

        // Write Batch
        async createMany(
            categories: readonly Category[]
        ): Promise<void> {
            if (categories.length === 0) {
                return;
            }

            await repository.createMany(categories);
        },

        async updateMany(
            categories: readonly Category[]
        ): Promise<void> {
            if (categories.length === 0) {
                return;
            }

            await repository.updateMany(categories);
        },

        async deleteMany(
            ids: readonly string[]
        ): Promise<void> {
            if (ids.length === 0) {
                return;
            }

            await repository.deleteMany(ids);
        },

        // Other
        async findPathToRoot(
            categoryId: string
        ): Promise<Category[]> {
            if (!categoryId) {
                return [];
            }

            const path =
                await repository.findPathToRoot(categoryId);
            
            if (!path) {
                return [];
            }
            
            return path;
        }

    };

}