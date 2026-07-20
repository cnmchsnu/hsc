export interface SKU {

    id: string;

    productId: string;

    code: string;

    barcode?: string | null;

    status: SKUStatus;

    version: number;

}

export type SKUStatus =
    | 'draft'
    | 'active'
    | 'archived';


