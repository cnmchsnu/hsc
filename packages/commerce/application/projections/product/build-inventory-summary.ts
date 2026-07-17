import type { InventoryItem } from '../../../domain/inventory-item';

export interface InventorySummary {

    available: number;

    reserved: number;

    total: number;

    inStock: boolean;

}

export function buildInventorySummary(
    inventoryItems: readonly InventoryItem[]
): InventorySummary {

    return {
        available: inventoryItems.reduce((sum, item) => sum + item.availableQuantity, 0),

        reserved: inventoryItems.reduce((sum, item) => sum + item.reservedQuantity, 0),

        total: inventoryItems.reduce((sum, item) => sum + item.availableQuantity + item.reservedQuantity, 0),

        inStock: inventoryItems.some(item => item.availableQuantity > 0)
    };

}
