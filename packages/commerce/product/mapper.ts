import type { ProductRow } from "@repo/database/product";
import type { Product } from "../types";

export function toProduct(
    row: ProductRow,
): Product {

    return {

        id: row.id,

        slug: row.slug,

        name: row.name,

        description: row.description,

        status: row.status,

        categoryId: row.category_id,

        price: row.price,

        compareAtPrice: row.compare_at_price,

        images:
            row.product_images
                .map((image) => ({

                    id: image.id,

                    url: image.storage_path,

                    alt: null,
 
                    sortOrder: image.display_order,

                })),

    };

}