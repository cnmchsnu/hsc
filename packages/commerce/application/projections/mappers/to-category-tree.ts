import type { CategoryTree, CategoryGraph } from "../projections/category/";

export function toCategoryTree(
    categorygraph: CategoryGraph,
): CategoryTree[] {
    if (!categorygraph) {
        return [];
    }
    return [...categorygraph.roots]
}

