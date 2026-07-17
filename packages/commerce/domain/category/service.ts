import type { Category } from "./type";
import type { CategoryRepository } from "./repository";
import type { CreateCategory } from "./create";
import type { UpdateCategory } from "./update";

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
    ): Promise<readonly Category[]>;

    findBySlugs(
        slugs: readonly string[],
    ): Promise<readonly Category[]>;


    // Query

    list(): Promise<readonly Category[]>;


    // Exists Single

    exists(
        id: string,
    ): Promise<boolean>;


    // Exists Batch

    listExistingIds(
        ids: readonly string[],
    ): Promise<readonly string[]>;

    listExistingSlugs(
        slugs: readonly string[],
    ): Promise<readonly string[]>;


    // Write Single

    create(
        category: CreateCategory,
    ): Promise<void>;

    update(
        category: UpdateCategory,
    ): Promise<void>;

    delete(
        id: string,
    ): Promise<void>;


    // Write Batch

    createMany(
        categories: readonly CreateCategory[],
    ): Promise<void>;

    updateMany(
        categories: readonly UpdateCategory[],
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
                await repository.get(id);
            
            if (!category) {
                return null;
            }

            return category;
        },
        async findBySlug(
            slug: string
        ): Promise<Category | null> {
            const category =
                await repository.getBySlug(slug);
            
            if (!category) {
                return null;
            }

            return category;
        },

        // Read Batch
        async findByIds(
            ids: readonly string[]
        ): Promise<readonly Category[]> {
            if (ids.length === 0) {
                return [];
            }

            try {
                const categories =
                    await repository.getMany(ids);
               

                if (!categories) {
                    return [];
                }

                return categories;
            } catch (error) {
                console.error("Error fetching categories by IDs:", error);
                return [];
            } 
        },
        
        async findBySlugs(
            slugs: readonly string[]
        ): Promise<readonly Category[]> {
            if (slugs.length === 0) {
                return [];
            }

            const categories =
                await repository.getBySlugs(slugs);
            
            if (!categories) {
                return [];
            }

            return categories;
        },

        // Query
        async list(): Promise<readonly Category[]> {
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
        ): Promise<readonly string[]> {
            if (ids.length === 0) {
                return [];
            }

            const existingIds =
                await repository.listExisting(ids);
            
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
            category: CreateCategory
        ): Promise<void> {
            await repository.create(category);
        },

        async update(
            category: UpdateCategory
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
            categories: readonly CreateCategory[]
        ): Promise<void> {
            if (categories.length === 0) {
                return;
            }

            await repository.createMany(categories);
        },

        async updateMany(
            categories: readonly UpdateCategory[]
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