import type { ProductStatus } from "../../../../commerce/domain/product";

export interface ProductRow {

    id: string;

    slug: string;

    name: string;

    description: string | null;

    status: ProductStatus;

    price: number;

    compare_at_price: number | null;

    currency: string;

    stock_total: number;

    stock_sold: number;

    created_at: string;

    updated_at: string;

}
