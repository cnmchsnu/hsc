import { InventoryItem } from './types';
import { InventoryItemQuery } from './query';
import { InventoryItemList } from './list';
import { CreateInventoryItem } from './create';
import { UpdateInventoryItem } from './update';

import { InventoryItemRepository } from './repository';

import { type CRUDService, DefaultCRUDService } from "@repo/shared/service";

import {
    InventoryItemNotFoundException,
    InvalidInventoryQuantityException,
    InsufficientInventoryException,
    InvalidReservedQuantityException,
    InvalidIncomingQuantityException,
} from './error';


export interface InventoryItemService extends CRUDService<
    InventoryItem,
    string,
    CreateInventoryItem,
    UpdateInventoryItem,
    InventoryItemQuery,
    InventoryItemList
> {

    // Query
    list(): Promise<readonly InventoryItem[]>;

    getBySku(skuId: string): Promise<readonly InventoryItem[]>;

    getBySkus(skuIds: string[]): Promise<readonly InventoryItem[]>;

    reserve(
        skuId: string,
        quantity: number,
    ): Promise<void>;

    release(
        skuId: string,
        quantity: number,
    ): Promise<void>;

    receive(
        skuId: string,
        quantity: number,
    ): Promise<void>;

    adjust(
        skuId: string,
        quantity: number,
        reason: string,
    ): Promise<void>;

}


class DefaultInventoryItemService
    extends DefaultCRUDService<
        InventoryItem,
        string,
        CreateInventoryItem,
        UpdateInventoryItem,
        InventoryItemQuery,
        InventoryItemList,
        InventoryItemRepository
    >
    implements InventoryItemService {

    constructor(
        protected readonly repository: InventoryItemRepository,
    ) {
        super(repository);
    }

    private async requireInventory(
        skuId: string,
    ): Promise<InventoryItem> {

        const inventory =
            await this.repository.get(skuId);

        if (!inventory) {
            throw new InventoryItemNotFoundException(skuId);
        }

        return inventory;

    }

    async list(): Promise<readonly InventoryItem[]> {
        const inventoryItems = 
            await this.repository.list();

        return inventoryItems;
    }

    async getBySku(
        skuId: string,
    ): Promise<readonly InventoryItem[]> {
        const inventoryItems =
            await this.repository.getBySku(skuId);

        return inventoryItems;
    }

    async getBySkus(
        skuIds: string[],
    ): Promise<readonly InventoryItem[]> {
        const inventoryItems =
            await this.repository.getBySkus(skuIds);

        return inventoryItems;
    }

    async reserve(
        skuId: string,
        quantity: number,
    ): Promise<void> {

        const inventory =
            await this.requireInventory(skuId);

        if (quantity <= 0) {
            throw new InvalidInventoryQuantityException();
        }

        if (inventory.availableQuantity < quantity) {
            throw new InsufficientInventoryException();
        }

        await this.repository.update({

            skuId,

            availableQuantity:
                inventory.availableQuantity - quantity,

            reservedQuantity:
                inventory.reservedQuantity + quantity,

            incomingQuantity:
                inventory.incomingQuantity,


        });

    }

    async release(
        skuId: string,
        quantity: number,
    ): Promise<void> {

        const inventory =
            await this.requireInventory(skuId);

        if (inventory.reservedQuantity < quantity) {
            throw new InvalidReservedQuantityException();
        }

        await this.repository.update({

            skuId,

            availableQuantity:
                inventory.availableQuantity + quantity,

            reservedQuantity:
                inventory.reservedQuantity - quantity,

            incomingQuantity:
                inventory.incomingQuantity,

        });

    }

    async receive(
        skuId: string,
        quantity: number,
    ): Promise<void> {

        const inventory =
            await this.requireInventory(skuId);

        if (inventory.incomingQuantity < quantity) {
            throw new InvalidIncomingQuantityException();
        }

        await this.repository.update({

            skuId,

            availableQuantity:
                inventory.availableQuantity + quantity,

            reservedQuantity:
                inventory.reservedQuantity,

            incomingQuantity:
                inventory.incomingQuantity - quantity,

        });

    }

    async adjust(
        skuId: string,
        quantity: number,
        reason: string,
    ): Promise<void> {

        const inventory =
            await this.requireInventory(skuId);

        await this.repository.update({

            skuId,

            availableQuantity: quantity,

            reservedQuantity:
                inventory.reservedQuantity,

            incomingQuantity:
                inventory.incomingQuantity,

        });

    }


}


export function createInventoryItemService(
    repository: InventoryItemRepository,
): InventoryItemService {

    return new DefaultInventoryItemService(repository);

}