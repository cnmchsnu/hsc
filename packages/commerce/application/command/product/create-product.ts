import type { ProductStatus } from "../../../domain/product";

export interface CreateProduct {

    slug: string;

    name: string;

    description?: string | null;

    status: ProductStatus;

    price: number;

    compareAtPrice?: number | null;

}