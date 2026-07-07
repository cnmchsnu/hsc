import type { ProductStatus } from "../../commerce/domain/product";

export interface ProductRow {

    id: string;

    slug: string;

    name: string;

    description: string | null;

    status: ProductStatus;

    price: number;

    compare_at_price: number | null;

}
