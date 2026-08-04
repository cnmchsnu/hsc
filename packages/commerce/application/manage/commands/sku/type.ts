import { ProductSkuDraft } from "../../builders";
import {
    ProductPriceEditor,
    ProductInventoryItemEditor,
} from "../../sync";



export interface ProductSkuWorkflowInput {

    productSlug: string;

    skus: readonly ProductSkuDraft[];

    prices: readonly ProductPriceEditor[];

    inventory: readonly ProductInventoryItemEditor[];

}

