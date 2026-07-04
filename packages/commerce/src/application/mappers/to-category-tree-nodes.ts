import type { CategoryTree, CategoryTreeNode } from "../projections/category";

export function toCategoryTreeNodes(
    trees: readonly CategoryTree[],
    depth = 0 // 預設根節點深度為 0（或依據你的需求改為 1）
): CategoryTreeNode[] {
    return trees.map(node => {
        // 先判斷有沒有子節點
        const hasChildren = node.children && node.children.length > 0;

        return {
            id: node.category.id,
            slug: node.category.slug,
            name: node.category.name,
            depth: depth,              // 填入當前深度
            hasChildren: hasChildren,  // 填入是否有子節點
            // 遞迴轉換子節點時，將深度 + 1 傳下去
            children: toCategoryTreeNodes(node.children, depth + 1), 
        };
    });
}