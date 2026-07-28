import type {
    InventoryItemSynchronizer,
    PriceSynchronizer,
    ProductCategorySynchronizer,
    ProductImageSynchronizer,
    ProductSynchronizer,
    SkuSynchronizer,
    VariantOptionSynchronizer,
    VariantOptionValueSynchronizer
} from "../sync";


import {
    createInventoryItemSynchronizer,
    createPriceSynchronizer,
    createProductCategorySynchronizer,
    createProductImageSynchronizer,
    createProductSynchronizer,
    createSkuSynchronizer,
    createVariantOptionSynchronizer,
    createVariantOptionValueSynchronizer
} from "../sync";

import { CommerceDependencies } from "./aggregate";



export interface ProductSynchronizers {

    product: ProductSynchronizer;

    image: ProductImageSynchronizer;

    category: ProductCategorySynchronizer;

    option: VariantOptionSynchronizer;

    value: VariantOptionValueSynchronizer;

    sku: SkuSynchronizer;

    price: PriceSynchronizer;

    inventory: InventoryItemSynchronizer;

}

export function createProductSynchronizers(
    dependencies: CommerceDependencies,
): ProductSynchronizers {
    

    const product = createProductSynchronizer(
        dependencies.productService,
    );

    const image = createProductImageSynchronizer(
        dependencies.productImageService,
    );

    const category = createProductCategorySynchronizer(
        dependencies.productCategoryService,
    );

    const option = createVariantOptionSynchronizer(
        dependencies.variantOptionService,
    );

    const value = createVariantOptionValueSynchronizer(
        dependencies.variantOptionValueService,
    );

    const sku = createSkuSynchronizer(
        dependencies.skuService,
    );

    const price = createPriceSynchronizer(
        dependencies.priceService,
    );

    const inventory = createInventoryItemSynchronizer(
        dependencies.inventoryItemService,
    );

    return {
        product,
        image,
        category,
        option,
        value,
        sku,
        price,
        inventory
    };
}