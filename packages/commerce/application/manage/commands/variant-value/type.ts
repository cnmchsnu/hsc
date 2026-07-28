import {
    ProductVariantOptionValueEditor,
    ProductSkuEditor,
    ProductPriceEditor,
    ProductInventoryItemEditor,
} from "../../sync";



export interface ProductVariantValueWorkflowInput {

    productId: string;

    values: readonly ProductVariantOptionValueEditor[];

    skus: readonly ProductSkuEditor[];

    prices: readonly ProductPriceEditor[];

    inventory: readonly ProductInventoryItemEditor[];

}

