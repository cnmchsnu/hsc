import { ProductSkuDraft } from "../../builders";
import {
    ProductVariantOptionValueEditor,
    ProductPriceEditor,
    ProductInventoryItemEditor,
} from "../../sync";



export interface ProductVariantValueWorkflowInput {

    productSlug: string;

    values: readonly ProductVariantOptionValueEditor[];

    skus: readonly ProductSkuDraft[];

    prices: readonly ProductPriceEditor[];

    inventory: readonly ProductInventoryItemEditor[];

}

