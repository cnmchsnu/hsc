import { toCategoryTreeNodes } from "../../mappers/to-category-tree-nodes";
import type { CategoryTree } from "./build-graph-tree";

export interface CategoryNavigation {

    tree: readonly CategoryTreeNode[];

    expandedIds: readonly string[];

    selectedId: string | null;

}

export interface CategoryTreeNode {

    id: string;

    slug: string;

    name: string;

    children: readonly CategoryTreeNode[];

}

function findExpandedIds(
    nodes: readonly CategoryTreeNode[],
    targetId: string,
    currentPath: string[] = []
): string[] | null {
    for (const node of nodes) {
        // 將當前節點放入路徑中
        const nextPath = [...currentPath, node.id];

        // 找到了目標節點，直接回傳整條路徑
        if (node.id === targetId) {
            return nextPath;
        }

        // 如果有子節點，繼續往深處找
        if (node.children && node.children.length > 0) {
            const foundPath = findExpandedIds(node.children, targetId, nextPath);
            if (foundPath) return foundPath; // 在子樹中找到了，直接層層回傳
        }
    }
    return null; // 這條分支沒找到
}

export function buildCategoryNavigation(

    tree: readonly CategoryTree[],

    selectedId: string | null,

): CategoryNavigation {

    const navigationTree = toCategoryTreeNodes(tree);

    let expandedIds: string[] = [];

    if (selectedId) {
        const path = findExpandedIds(navigationTree, selectedId);
        if (path) {
            expandedIds = path
                .slice(0, -1); // 去掉最後一個，因為最後一個是選中的節點，不需要展開
        }
    }

    return {
        tree: navigationTree,
        expandedIds,
        selectedId,
    };  

}

