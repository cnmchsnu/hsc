import {
    InventoryItem,
    Price,
    SKUStatus,
    VariantOption,
    VariantOptionValue
} from '../../../../domain';


export interface VariantReference {

    optionName: string;

    valueName: string;

}

export interface VariantCombinationValue {

    option: VariantOption;

    value: VariantOptionValue;

}

export interface ProductSkuDraft {

    id?: string;

    productId: string;

    code: string;

    barcode?: string | null;

    status: SKUStatus;

    version: number;

    variantRefs: readonly VariantReference[];

}

export interface SKUDraftDetail {

    sku: ProductSkuDraft

    price: Price[] | null;

    inventory: InventoryItem | null;

}