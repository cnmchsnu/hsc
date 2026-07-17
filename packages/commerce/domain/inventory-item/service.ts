import { InventoryItem } from './types';
import { InventoryItemQuery } from './query';
import { InventoryItemList } from './list';
import { CreateInventoryItem } from './create';
import { UpdateInventoryItem } from './update';

import { InventoryItemRepository } from './repository';

import {
    InventoryItemNotFoundException,
    InvalidInventoryQuantityException,
    InsufficientInventoryException,
    InvalidReservedQuantityException,
    InvalidIncomingQuantityException,
} from './error';


export interface InventoryItemService {

    get(skuId: string): Promise<InventoryItem | null>;

    getMany(skuIds: readonly string[]): Promise<readonly InventoryItem[]>;

    find(query: InventoryItemQuery): Promise<InventoryItemList>;

    create(create: CreateInventoryItem): Promise<InventoryItem>;

    createMany(commands: readonly CreateInventoryItem[]): Promise<void>;

    update(update: UpdateInventoryItem): Promise<InventoryItem>;

    updateMany(commands: readonly UpdateInventoryItem[]): Promise<void>;

    delete(skuId: string): Promise<void>;

    deleteMany(skuIds: readonly string[]): Promise<void>;

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
    implements InventoryItemService {

    constructor(
        private readonly repository: InventoryItemRepository,
    ) {}

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

    async create(
        create: CreateInventoryItem,
    ): Promise<InventoryItem> {

        await this.repository.create(create);

        const inventory =
            await this.repository.get(create.skuId);

        if (!inventory) {
            throw new InventoryItemNotFoundException(create.skuId);
        }

        return inventory;
    }

    createMany(
        commands: readonly CreateInventoryItem[],
    ): Promise<void> {

        return this.repository.createMany(commands);
    }

    async update(
        update: UpdateInventoryItem,
    ): Promise<InventoryItem> {

        await this.repository.update(update);

        const inventory =
            await this.repository.get(update.skuId);

        if (!inventory) {
            throw new InventoryItemNotFoundException(update.skuId);
        }

        return inventory;
    }

    updateMany(
        commands: readonly UpdateInventoryItem[],
    ): Promise<void> {
        return this.repository.updateMany(commands);
    }

    async get(
        skuId: string,
    ): Promise<InventoryItem | null> {

        const inventory =
            await this.repository.get(skuId);

        return inventory;
    }

    async getMany(
        skuIds: readonly string[],
    ): Promise<readonly InventoryItem[]> {
        const inventories =
            await this.repository.getMany(skuIds);

        return inventories;
    }

    async find(
        query: InventoryItemQuery,
    ): Promise<InventoryItemList> {
        const inventoryList =
            await this.repository.find(query);

        return inventoryList;
    }

    async delete(
        skuId: string,
    ): Promise<void> {
        await this.repository.delete(skuId);
    }

    async deleteMany(
        skuIds: readonly string[],
    ): Promise<void> {
        await this.repository.deleteMany(skuIds);
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

            version:
                inventory.version,

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

            version:
                inventory.version,

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

            version:
                inventory.version,

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

            version:
                inventory.version,

        });

    }


}


export function createInventoryItemService(
    repository: InventoryItemRepository,
): InventoryItemService {

    return new DefaultInventoryItemService(repository);

}