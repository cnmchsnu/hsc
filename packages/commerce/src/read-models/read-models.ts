import type { Product, ProductImage } from '../product';
import type { Category, Breadcrumb, CategoryTree } from '../category';


export interface ProductSummary {

    product: Product;

    primaryCategory: Category | null;

}

export interface ProductDetail {

    product: Product;

    categories: Category[];

    images: ProductImage[];

    // inventory: Inventory;

    // price: ProductPrice;

}

export interface CategoryPage {

    category: Category;

    breadcrumb: Breadcrumb[];

    tree: CategoryTree[];

}