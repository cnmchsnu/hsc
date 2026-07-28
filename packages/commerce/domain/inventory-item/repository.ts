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

    // Query
    list(): Promise<readonly InventoryItem[]>;

    getBySku(
        skuId: string
    ): Promise<readonly InventoryItem[]>;

    getBySkus(
        skuIds: string[]
    ): Promise<readonly InventoryItem[]>;

    findLowStock(
        threshold: number
    ): Promise<InventoryItemList>;

    findOutOfStock(): Promise<InventoryItemList>;

}