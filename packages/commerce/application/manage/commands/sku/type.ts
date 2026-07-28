import {
    ProductSkuEditor,
    ProductPriceEditor,
    ProductInventoryItemEditor,
} from "../../sync";



export interface ProductSkuWorkflowInput {

    productId: string;

    skus: readonly ProductSkuEditor[];

    prices: readonly ProductPriceEditor[];

    inventory: readonly ProductInventoryItemEditor[];

}

