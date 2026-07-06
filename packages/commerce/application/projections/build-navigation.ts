import { toCategoryTreeNodes } from "./mappers/to-category-tree-nodes";
import type { CategoryTree } from "./build-graph-tree";

export interface CategoryNavigation {

    tree: readonly CategoryTreeNode[];

    expandedIds: readonly string[];

    indeterminateIds: readonly string[];

}

export interface CategoryTreeNode {

    id: string;

    slug: string;

    name: string;

    children: readonly CategoryTreeNode[];

    depth: number;

    hasChildren: boolean;

}

function resolveExpandedCategorySlugs(
    nodes: readonly CategoryTreeNode[],
    selectedSlugs: readonly string[]
) {
    const selectedSet = new Set(selectedSlugs);
    const expandedSet = new Set<string>();
    const indeterminateSet = new Set<string>();

    // 回傳值代表該子樹的選取狀態：'none' | 'partial' | 'all'
    function traverse(node: CategoryTreeNode): 'none' | 'partial' | 'all' {
        const isSelfSelected = selectedSet.has(node.id);

        if (!node.hasChildren) {
            // 葉節點：只有「全選」或「沒選」
            return isSelfSelected ? 'all' : 'none';
        }

        let allChildrenSelected = true;
        let anyChildSelected = false;

        for (const child of node.children) {
            const childState = traverse(child);

            if (childState === 'all') {
                anyChildSelected = true;
            } else if (childState === 'partial') {
                anyChildSelected = true;
                allChildrenSelected = false;
            } else {
                allChildrenSelected = false;
            }
        }

        // 決定當前節點的最終狀態
        if (allChildrenSelected && (node.children.length > 0 ? anyChildSelected : isSelfSelected)) {
            // 子節點全選，且至少有一個子節點（或是自己被選），代表全選
            return 'all';
        } else if (anyChildSelected || isSelfSelected) {
            // 部分子節點被選，或者自己被選但子節點沒全選 -> 半選取
            indeterminateSet.add(node.id);
            expandedSet.add(node.id); // 半選取的祖先通常也需要自動展開
            return 'partial';
        }

        return 'none';
    }

    for (const node of nodes) {
        traverse(node);
    }

    const path = Array.from(expandedSet).filter(id => selectedSet.has(id));

    return { 
        path: Array.from(expandedSet),
        indeterminateSlugs: Array.from(indeterminateSet)
    };
}

export function buildCategoryNavigation(

    tree: readonly CategoryTree[],

    selectedSlugs: readonly string[],

): CategoryNavigation {

    const navigationTree = toCategoryTreeNodes(tree);

    let expandedSlugs: string[] = [];

    if (selectedSlugs.length > 0) {
        return {
            tree: navigationTree,
            expandedIds: [],
            indeterminateIds: [],
        };
    }

    const {path, indeterminateSlugs} = resolveExpandedCategorySlugs(navigationTree, selectedSlugs);

    return {
        tree: navigationTree,
        expandedIds: path,
        indeterminateIds: indeterminateSlugs,
    };  

}

