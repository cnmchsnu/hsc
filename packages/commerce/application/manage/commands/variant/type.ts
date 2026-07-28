import {
    ProductVariantOptionEditor,
    ProductVariantOptionValueEditor,
    ProductSkuEditor,
    ProductPriceEditor,
    ProductInventoryItemEditor,
} from "../../sync";



export interface ProductVariantWorkflowInput {

    productId: string;

    options: readonly ProductVariantOptionEditor[];

    values: readonly ProductVariantOptionValueEditor[];

    skus: readonly ProductSkuEditor[];

    prices: readonly ProductPriceEditor[];

    inventory: readonly ProductInventoryItemEditor[];

}

