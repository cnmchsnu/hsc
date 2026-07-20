import { VariantOptionName } from "../../../../commerce/domain/variant-option";

export interface VariantOptionRow {

    id: string;

    product_id: string;

    name: VariantOptionName;

    display_name: string;

    sort_order: number;

    version: number;

    created_at: string;

    updated_at: string;

}