import { SKUStatus } from "./type";

export interface CreateSKU {

    productId: string;

    code: string;

    barcode?: string | null;

    status: SKUStatus;

}
