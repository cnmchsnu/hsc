import type { CategoryTree } from "./build-graph-tree";
import { toCategoryTreeNodes } from "./mappers/to-category-tree-nodes";

export interface CategoryTreeNode {

    id: string;

    slug: string;

    name: string;

    children: readonly CategoryTreeNode[];

    depth: number;

    hasChildren: boolean;

}


export function buildCategoryTreeNode(
    categoryTree: readonly CategoryTree[],
): readonly CategoryTreeNode[] {

    return toCategoryTreeNodes(categoryTree);

}