import type { Category } from "../../../category";
import { CategoryNotFoundError } from "../../../errors";
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