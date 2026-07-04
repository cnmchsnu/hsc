import type { CategoryTree, CategoryTreeNode } from "../projections/category";

export function toCategoryTreeNodes(trees: readonly CategoryTree[]): CategoryTreeNode[] {
    return trees.map(node => ({
        id: node.category.id,
        slug: node.category.slug,
        name: node.category.name,
        children: toCategoryTreeNodes(node.children), // 遞迴轉換子節點
    }));
}