import type { UpdateProduct } from "../../../domain/product";
import type { UpdateProductImage } from "../../../domain/product-image";
import type { ProductCategory as UpdateProductCategory } from "../../../domain/product-category";
import type { UpdateVariantOptionValue } from "../../../domain/variant-option-value";
import type { UpdateSKU } from "../../../domain/sku";
import type { UpdateInventoryItem } from "../../../domain/inventoryItem";
import type { UpdatePrice } from "../../../domain/price";


interface UpdateSKUAggregate {

    sku: UpdateSKU;

    inventory: UpdateInventoryItem;

    prices: readonly UpdatePrice[];

}


interface UpdateProductCommand {

    product: UpdateProduct;

    categoryIds: readonly UpdateProductCategory[];

    images: readonly UpdateProductImage[];

    variants: readonly UpdateVariantOptionValue[];

    skus: readonly UpdateSKUAggregate[];

}