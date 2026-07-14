import type { ProductStatus } from "../../../domain/product";

export interface UpdateProduct {

    id: string;

    slug?: string;

    name?: string;

    description?: string | null;

    status?: ProductStatus;

    price?: number;

    compareAtPrice?: number | null;

}