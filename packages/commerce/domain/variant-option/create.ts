import { VariantOptionName } from "./type";

export interface CreateVariantOption {

    productId: string;

    name: VariantOptionName;
    
    isEnabled?: boolean;

    displayName: string;

    sortOrder?: number;

}