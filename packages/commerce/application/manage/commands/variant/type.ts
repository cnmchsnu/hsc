import { ProductSkuDraft } from "../../builders";
import {
    ProductVariantOptionEditor,
    ProductVariantOptionValueEditor,
    ProductPriceEditor,
    ProductInventoryItemEditor,
} from "../../sync";



export interface ProductVariantWorkflowInput {

    productSlug: string;

    options: readonly ProductVariantOptionEditor[];

    values: readonly ProductVariantOptionValueEditor[];

    skus: readonly ProductSkuDraft[];

    prices: readonly ProductPriceEditor[];

    inventory: readonly ProductInventoryItemEditor[];

}

