import type { Product } from '../../product';
import type { ProductImage } from '../../product-image';
import type { Category, Breadcrumb } from '../../category';


export interface ProductSummary {

    product: Product;

    primaryCategory: Category | null;

    thumbnail: ProductImage | null;

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

export interface CategoryTree {

    category: Category;

    children: CategoryTree[];

}