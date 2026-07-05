import type { Category } from '../../../domain/category';
import type { BreadcrumbItem, CategoryTree } from "../../projections"


export interface CategoryPage {

    category: Category;

    breadcrumb: readonly BreadcrumbItem[];

    tree: readonly CategoryTree[];

}

export interface CategorySelectionState {

    selectedCategoryIds: readonly string[];

    expandedCategoryIds: readonly string[];

}

