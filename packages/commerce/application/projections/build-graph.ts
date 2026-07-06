import type { Category } from "../../domain/category";
import type { CategoryTree } from "./build-graph-tree";

export interface CategoryGraph {

    categories: Map<string, Category>;

    roots: CategoryTree[];

    tree: Map<string, CategoryTree>;

}

export function buildCategoryGraph(
    categories: readonly Category[],
): CategoryGraph {

    if (!categories) {
        return {
            categories: new Map(),
            roots: [],
            tree: new Map(),
        };
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