import type { ProductStatus } from "@repo/commerce/types";

export interface ProductImageRow {

    id: string;

    storage_path: string;

    display_order: number;
}



export interface ProductRow {

    id: string;

    slug: string;

    name: string;

    description: string | null;

    status: ProductStatus;

    category_id: string | null;

    price: number;

    compare_at_price: number | null;

    product_images: ProductImageRow[];

}
