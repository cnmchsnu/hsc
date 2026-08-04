import type {
    Product,
    Category,
    ProductImage,
    ProductCategory
} from '../../../domain';

import type {
    BreadcrumbItem,
    ProductVariant,
    DisplayPrice,
    ProductAvailability,
    InventorySummary,
    VariantDetail
} from "../../projections";

import { SKUDraftDetail } from '../../manage';



 

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
    

export interface ProductManageDetail {

    product: Product;

    categories: ProductCategory[];

    images: ProductImage[];

    breadcrumb: readonly BreadcrumbItem[];

    variantDetails: VariantDetail[];

    skuDraftDetail: SKUDraftDetail[];

    
}


