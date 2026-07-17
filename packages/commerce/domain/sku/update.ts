import { SKUStatus } from "./type";

export interface UpdateSKU {

    id: string;

    code: string;

    barcode?: string | null;

    status: SKUStatus;

}