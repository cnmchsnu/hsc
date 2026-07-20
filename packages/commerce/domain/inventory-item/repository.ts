import { Repository } from "@repo/shared";

import { InventoryItem } from "./types";
import { InventoryItemQuery } from "./query";
import { InventoryItemList } from "./list";
import { CreateInventoryItem } from "./create";
import { UpdateInventoryItem } from "./update";

export interface InventoryItemRepository
    extends Repository<
        InventoryItem,
        string,
        CreateInventoryItem,
        UpdateInventoryItem,
        InventoryItemQuery,
        InventoryItemList
    > {

    getBySku(
        skuId: string
    ): Promise<InventoryItemList | null>;

    findLowStock(
        threshold: number
    ): Promise<InventoryItemList>;

    findOutOfStock(): Promise<InventoryItemList>;

}