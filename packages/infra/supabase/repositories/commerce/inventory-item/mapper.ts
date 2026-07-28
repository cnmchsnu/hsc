import { InventoryItem, CreateInventoryItem, UpdateInventoryItem } from "../../../../../commerce/domain/inventory-item";
import type { InventoryItemRow } from "../../../entities";

import { RepositoryMapper } from "@repo/shared";

export const InventoryItemRepositoryMapper: RepositoryMapper<
    InventoryItem,
    InventoryItemRow,
    CreateInventoryItem,
    UpdateInventoryItem
> = {

    fromRow(
        row: InventoryItemRow,
    ): InventoryItem {
        return {
            skuid: row.sku_id,

            availableQuantity: row.available_quantity,

            reservedQuantity: row.reserved_quantity,

            incomingQuantity: row.incoming_quantity,

            version: Number(row.version),
        };
    },

    fromRows(
        rows: readonly InventoryItemRow[],
    ): InventoryItem[] {
        return rows.map(this.fromRow);
    },

    toCreateRow(
        dto: CreateInventoryItem,
    ): Partial<InventoryItemRow> {
        return {
            sku_id: dto.skuId,

            available_quantity: dto.availableQuantity ?? 0,

            reserved_quantity: dto.reservedQuantity ?? 0,

            incoming_quantity: dto.incomingQuantity ?? 0,
        };
    },

    toCreateRows(
        dto: readonly CreateInventoryItem[],
    ): Partial<InventoryItemRow>[] {
        return dto.map(this.toCreateRow);
    },

    toUpdateRow(
        dto: UpdateInventoryItem,
    ): Partial<InventoryItemRow> {
        return {
            sku_id: dto.skuId,

            available_quantity: dto.availableQuantity,

            reserved_quantity: dto.reservedQuantity,

            incoming_quantity: dto.incomingQuantity,

        };
    },

    toUpdateRows(
        dto: readonly UpdateInventoryItem[],
    ): Partial<InventoryItemRow>[] {
        return dto.map(this.toUpdateRow);
    },

};
