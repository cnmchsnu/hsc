import {
    ProductEditorInfo,
    SaveProductImageCommand,
    ProductVariantOptionEditor,
    ProductVariantOptionValueEditor,
    SaveProductCategoryCommand,
    ProductSkuEditor,
    ProductPriceEditor,
    ProductInventoryItemEditor,
} from "../../sync";



export interface ProductEditor {

    product: ProductEditorInfo;

    images: readonly SaveProductImageCommand[];

    categories: readonly SaveProductCategoryCommand[];

    options: readonly ProductVariantOptionEditor[];

    values: readonly ProductVariantOptionValueEditor[];

    skus: readonly ProductSkuEditor[];

    prices: readonly ProductPriceEditor[];

    inventory: readonly ProductInventoryItemEditor[];

}

