
import type { CreateProduct } from "../../../domain/product";
import type { CommandCreateProductImage, CreateProductImage } from "../../../domain/product-image";
import type { CommandCreateProductCategory, CreateProductCategory } from "../../../domain/product-category";
import type { CommandCreateVariantOptionValue, CreateVariantOptionValue } from "../../../domain/variant-option-value";
import type { CommandCreateSKU, CreateSKU } from "../../../domain/sku";
import type { CommandCreateInventoryItem, CreateInventoryItem } from "../../../domain/inventoryItem";
import type { CommandCreatePrice, CreatePrice } from "../../../domain/price";



interface CreateSKUAggregate {

    sku: CommandCreateSKU;

    inventory: CommandCreateInventoryItem;

    prices: readonly CommandCreatePrice[];

}

export interface CreateProductCommand {

    product: CreateProduct;

    categoryIds: readonly CommandCreateProductCategory[];

    images: readonly CommandCreateProductImage[];

    variants: readonly CommandCreateVariantOptionValue[];

    skus: readonly CreateSKUAggregate[];

}