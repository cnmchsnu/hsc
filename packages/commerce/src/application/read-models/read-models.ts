import type { Product } from '../../product';
import type { ProductImage } from '../../product-image';
import type { Category } from '../../category';
import type { CategoryTree, BreadcrumbItem } from '../projections/category';


export interface ProductSummary {

    product: Product;

    primaryCategory: Category | null;

    thumbnail: ProductImage | null;

}

export interface ProductDetail {

    product: Product;

    categories: Category[];

    images: ProductImage[];

    
    breadcrumb: readonly BreadcrumbItem[];

    // inventory: Inventory;

    // price: ProductPrice;

}

export interface CategoryPage {

    category: Category;

    breadcrumb: readonly BreadcrumbItem[];

    tree: readonly CategoryTree[];

}


export interface CategoryTreeNode {

    id: string;

    slug: string;

    name: string;

    children: readonly CategoryTreeNode[];

}

export interface CategoryNavigation {

    tree: readonly CategoryTreeNode[];

    expandedIds: readonly string[];

    selectedId: string | null;

}

export interface CategorySelectionState {

    selectedCategoryIds: readonly string[];

    expandedCategoryIds: readonly string[];

}

