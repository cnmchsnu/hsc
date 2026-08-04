import {
    Product,
    ProductImage,
    VariantOption,
    VariantOptionValue,
    SKU,
    Price,
    InventoryItem,
    Category,
    SKUVariantValue,
    ProductCategory,
} from "../../../domain";

export interface ProductAggregate {

    productId: string | null;

    skuReferenceMap?: Map<
        string, // skuCode
        string  // skuId
    >;

    optionReferenceMap?: Map<
        string, // optionName
        string  // optionId
    >;


    skuIds: readonly string[];

    product: Product | null;

    productCategories: readonly ProductCategory[];

    images: readonly ProductImage[];

    categories: readonly Category[];

    breadcrumbs: readonly Category[];

    options: readonly VariantOption[];

    values: readonly VariantOptionValue[];

    skus: readonly SKU[];

    skuVariantValues: readonly SKUVariantValue[]

    prices: readonly Price[];

    inventory: readonly InventoryItem[];

}