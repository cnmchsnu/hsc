import type { ProductStatus } from "./type";

export interface UpdateProduct {

    id: string;

    slug?: string;

    name?: string;

    description?: string | null;

    status?: ProductStatus;

}