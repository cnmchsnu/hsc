import type { ProductStatus } from "../../../../commerce/domain/product";

export interface ProductRow {

    id: string;

    slug: string;

    name: string;

    description: string | null;

    status: ProductStatus;

    created_at: string;

    updated_at: string;

}
