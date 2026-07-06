import { Product } from '../../../domain/product';
import { Category } from '../../../domain/category';
import { ProductImage } from '../../../domain/product-image';
import type { BreadcrumbItem } from "../../projections";



export interface ProductSummary {

    product: Product;

    primaryCategory: Category | null;

    thumbnail: ProductImage | null;

}

export interface ProductDetail {

    product: Product;

    categories: readonly Category[];

    images: ProductImage[];

    
    breadcrumb: readonly BreadcrumbItem[];

    // inventory: Inventory;

    // price: ProductPrice;

}
