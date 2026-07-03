import type { Product } from '../product';
import type { ProductImage } from '../product-image';
import type { Category, Breadcrumb, CategoryTree } from '../category';

export interface BreadcrumbItem {

    id: string;

    slug: string;

    name: string;

}


export interface ProductSummary {

    product: Product;

    primaryCategory: Category | null;

    thumbnail: ProductImage | null;

}

export interface ProductDetail {

    product: Product;

    categories: Category[];

    images: ProductImage[];

    
    breadcrumb: BreadcrumbItem[];

    // inventory: Inventory;

    // price: ProductPrice;

}

export interface CategoryPage {

    category: Category;

    breadcrumb: Breadcrumb[];

    tree: CategoryTree[];

}