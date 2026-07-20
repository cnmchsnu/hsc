import { InventoryItem } from "../../../domain/inventory-item";

export interface ProductAvailability {

    inStock: boolean;

    availableSKUCount: number;

    totalStock: number;

}

export function buildProductAvailability(
    inventoryItems: readonly InventoryItem[]
): ProductAvailability {
    const totalStock = inventoryItems.reduce((sum, item) => sum + item.availableQuantity + item.reservedQuantity, 0);
    const availableSKUCount = inventoryItems.filter(item => item.availableQuantity > 0).length;
    const inStock = availableSKUCount > 0;

    return {

        inStock,

        availableSKUCount,

        totalStock
        
    };
}