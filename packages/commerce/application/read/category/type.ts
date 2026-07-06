import type { Category } from '../../../domain/category';
import type { BreadcrumbItem, CategoryTreeNode } from "../../projections"


export interface CategoryPage {

    category: Category;

    breadcrumb: readonly BreadcrumbItem[];

    tree: readonly CategoryTreeNode[];

}

