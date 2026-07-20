import { SKUStatus } from "../../../../commerce/domain/sku";

export interface SKURow {

    id: string;

    product_id: string;

    code: string;

    barcode: string | null;

    status: SKUStatus;

    version: number;

    created_at: string;

    updated_at: string;

}