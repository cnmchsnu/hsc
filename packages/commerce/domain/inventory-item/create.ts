

export interface CreateInventoryItem {

    skuId: string;

    availableQuantity?: number;

    reservedQuantity?: number;

    incomingQuantity?: number;

}

export interface CommandCreateInventoryItem {


    availableQuantity?: number;

    reservedQuantity?: number;

    incomingQuantity?: number;

}