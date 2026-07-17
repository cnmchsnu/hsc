import type { ProductStatus } from ".";

export interface CreateProduct {

    slug: string;

    name: string;

    description?: string | null;

    status: ProductStatus;

}