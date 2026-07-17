import type { Product } from '../../../domain/product';
import type { Category } from '../../../domain/category';
import type { ProductImage } from '../../../domain/product-image';
import type { BreadcrumbItem, ProductVariant, DisplayPrice, ProductAvailability, InventorySummary } from "../../projections";



 

export interface ProductSummary {

    product: Product;

    primaryCategory: Category | null;

    thumbnail: ProductImage | null;

    displayPrice: DisplayPrice | null;

    availability: ProductAvailability | null;

}

export interface ProductDetail {

    product: Product;

    categories: readonly Category[];

    images: readonly ProductImage[];

    breadcrumb: readonly BreadcrumbItem[];

    variants: ProductVariant;

    displayPrice: DisplayPrice;

    inventorySummary: InventorySummary;

    availability: ProductAvailability;

}