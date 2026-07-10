import type { Product } from "../../../commerce/domain/product";

import type { ProductRow } from "../../entities";

export function toProduct(
    data: ProductRow
): Product {
    return {
        id: data.id,
        name: data.name,

        slug: data.slug,

        description: data.description,
        status: data.status,

        price: data.price,
        compareAtPrice: data.compare_at_price,
    };
}

