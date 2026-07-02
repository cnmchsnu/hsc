import type { Category, CategoryTree, Breadcrumb, CategoryGraph } from "./category";
import type { CategoryRepository } from "@repo/database/category";
import { CategoryNotFoundError, CategoryTreeError } from "./errors";
    


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

    getBySlug(
        slug: string,
    ): Promise<Category | null>;

    list(): Promise<Category[]>;

    getTree(): Promise<CategoryTree[]>;

    getNavigation(): Promise<CategoryTree[]>;

    getBreadcrumb(
        slug: string,
    ): Promise<Breadcrumb[]>;

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
        ) {
            const category =
                await repository.findBySlug(slug);
            
            if (!category) {
                throw new CategoryNotFoundError(slug);
            }

            const graphProvider = createCategoryGraphProvider(repository);

            const graph = await graphProvider.get();

            if (!graph) {
                throw new CategoryTreeError("Failed to build category tree");
            }

            const breadcrumb: Breadcrumb[] = [];

            let currentCategory: Category | undefined = category;

            while (currentCategory) {
                breadcrumb.unshift({
                    id: currentCategory.id,
                    slug: currentCategory.slug,
                    name: currentCategory.name,
                });

                currentCategory = graph.tree.get(currentCategory.parentId!)?.category;
            }

            return breadcrumb;
        },

        async getNavigation() {
            const graphProvider = createCategoryGraphProvider(repository); 

            const graph = await graphProvider.get();

            if (!graph) {
                throw new CategoryTreeError("Failed to build category tree");
            }

            return graph.roots.filter((root) => root.category.status === "active");
        }

    };

}