

export interface ProductCommandResult {

    productId: string;

    refresh?: readonly ProductRefreshTarget[];

}

export enum ProductRefreshTarget {

    Product,

    Images,

    Categories,

    Variants,

    VariantValues,

    Skus,

    Prices,

    Inventory,

}