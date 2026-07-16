import { VariantOptionName } from "./type";

export interface CreateVariantOption {

    productId: string;

    name: VariantOptionName;

    displayName: string;

    sortOrder?: number;

}