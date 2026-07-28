import type { Category } from "./type";
import type { CategoryRepository } from "./repository";
import type { CreateCategory } from "./create";
import type { UpdateCategory } from "./update";

import { type CRUDService, DefaultCRUDService } from "@repo/shared/service";

export interface CategoryService extends Omit<CRUDService<
    Category,
    string,
    CreateCategory,
    UpdateCategory,
    any,
    any
>, "find"> {

    // Read Single

    findBySlug(
        slug: string,
    ): Promise<Category | null>;


    // Read Batch

    findBySlugs(
        slugs: readonly string[],
    ): Promise<readonly Category[]>;

    // Query

    list(): Promise<readonly Category[]>;

    // Exists Batch
    listExistingSlugs(
        slugs: readonly string[],
    ): Promise<readonly string[]>;


    // Other

    findPathToRoot(
        categoryId: string,
    ): Promise<Category[]>;

    

}



class  DefaultCategoryService
    extends DefaultCRUDService<
        Category,
        string,
        CreateCategory,
        UpdateCategory,
        any,
        any,
        CategoryRepository
    >
    implements CategoryService {

    constructor(
        protected readonly repository: CategoryRepository,
    ) {
        super(repository);
    }

    async findBySlug(
        slug: string
    ): Promise<Category | null> {
        const category =
            await this.repository.getBySlug(slug);
            
        if (!category) return null;

        return category;
    }

        // Read Batch
        
    async findBySlugs(
        slugs: readonly string[]
    ): Promise<readonly Category[]> {
        if (slugs.length === 0) return [];

        const categories =
            await this.repository.getBySlugs(slugs);
            
        if (!categories) return [];

        return categories;
    }

    // Query

    async list(): Promise<readonly Category[]> {
        const categories =
            await this.repository.list();
            
        if (!categories)  return [];

        return categories;
    }


    // Exists Batch


    async listExistingSlugs(
        slugs: readonly string[]
    ): Promise<readonly string[]> {
        if (slugs.length === 0) return [];

        const existingSlugs =
            await this.repository.listExistingSlugs(slugs);

        if (!existingSlugs) return [];

        return existingSlugs;
    }

        // Other
    async findPathToRoot(
        categoryId: string
    ): Promise<Category[]> {
        if (!categoryId) return [];

        const path =
            await this.repository.findPathToRoot(categoryId);
        
        if (!path) return [];
            
        return path;
    }

}

export function createCategoryService(
    repository: CategoryRepository,
): CategoryService {
    return new DefaultCategoryService(repository);
}