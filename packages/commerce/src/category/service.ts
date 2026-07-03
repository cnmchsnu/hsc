import type { Category, CategoryTree, Breadcrumb, CategoryGraph } from "./category";
import type { CategoryRepository } from "@repo/database/category";
import { CategoryNotFoundError, CategoryTreeError } from "../errors";
    
import { toBreadcrumb } from "../shared/breadcrumb/mappers";

interface CategoryGraphProvider {

    get(): Promise<CategoryGraph>;

}

export function createCategoryGraphProvider(
    repository: CategoryRepository,
): CategoryGraphProvider {  
    return {

        async get(): Promise<CategoryGraph> {
            const categories = await repository.list();

            if (!categories) {
                throw new CategoryNotFoundError("list");
            }

            return {
                categories: new Map(
                    categories.map((category) => [category.id, category])
                ),
                roots: categories
                    .filter((category) => !category.parentId)
                    .map((category) => ({
                        category,
                        children: [],
                    })),
                tree: new Map(
                    categories.map((category) => [
                        category.id,
                        {
                            category,
                            children: [],
                        },
                    ])
                ),
            };

        }
    }
}

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

    getTree(): Promise<CategoryTree[]>;

    getNavigation(): Promise<CategoryTree[]>;

    getBreadcrumb(
        slug: string,
    ): Promise<Breadcrumb[]>;

    getByIds(
        ids: readonly string[],
    ): Promise<Category[]>;

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

        async getTree() {
            
            const graphProvider = createCategoryGraphProvider(repository);


            const graph = await graphProvider.get();

            if (!graph) {
                throw new CategoryTreeError("Failed to build category tree");
            }

            return graph.roots;

        },

        async getBreadcrumb(
            slug: string,
        ): Promise<Breadcrumb[]> {

            const category =
                await repository.findBySlug(slug);

            if (!category) {
                throw new CategoryNotFoundError(slug);
            }

            const path =
                await repository.findPathToRoot(
                    category.id,
                );

            return path.map(toBreadcrumb);

        },

        async getNavigation() {
            const graphProvider = createCategoryGraphProvider(repository); 

            const graph = await graphProvider.get();

            if (!graph) {
                throw new CategoryTreeError("Failed to build category tree");
            }

            return graph.roots.filter((root) => root.category.status === "active");
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