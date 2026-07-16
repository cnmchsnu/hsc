export enum VariantOptionName {

    COLOR = "color",

    SIZE = "size",

    MATERIAL = "material",

}

export interface VariantOption {

    id: string;

    productId: string;

    name: VariantOptionName;

    displayName: string;

    sortOrder: number;

    version: number;

}