import type { CategoryGraph } from "../build-graph";
import type { CategoryTree } from "../build-graph-tree";

export function toCategoryTree(
    categorygraph: CategoryGraph,
): CategoryTree[] {
    if (!categorygraph) {
        return [];
    }
    return [...categorygraph.roots]
}

