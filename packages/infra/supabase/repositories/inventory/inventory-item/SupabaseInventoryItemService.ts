import { SupabaseClient } from '@supabase/supabase-js';

import { 
    InventoryItem, 
    InventoryItemList, 
    InventoryItemQuery, 
    InventoryItemRepository,
    CreateInventoryItem,
    UpdateInventoryItem
} from '../../../../../inventory/domain/inventoryItem';

import { InventoryItemRepositoryMapper as mapper } from './to-inventory-item';

export class SupabaseInventoryItemService
    implements InventoryItemRepository {

    constructor(
        private readonly client: SupabaseClient,
    ) {}

    private createListQuery(
        options: InventoryItemQuery,
    ) {
        let query =
            this.client
                .schema("inventory")
                .from("inventory_items")
                .select(
                    "*",
                    {
                        count: "exact",
                    },
                );

        if (options.skuid) {
            query = query.eq("sku_id", options.skuid);
        }

        const from =
            (options.page - 1)
            * options.pageSize;

        query = query.range(
            from,
            from + options.pageSize - 1,
        );

        return query;
    }

    async get(
        id: string,
    ): Promise<InventoryItem | null> {
        const { data, error } = await this.client
            .schema("inventory")
            .from("inventory_items")
            .select("*")
            .eq("sku_id", id)
            .maybeSingle();

        if (error) {
            throw error;
        }

        if (!data) {
            return null;
        }

        return mapper.fromRow(data);
    }

    async getMany(
        ids: readonly string[],
    ): Promise<readonly InventoryItem[]> {
        if (ids.length === 0) {
            return [];
        }

        const { data, error } = await this.client
            .schema("inventory")
            .from("inventory_items")
            .select("*")
            .in("sku_id", ids);

        if (error) {
            throw error;
        }

        if (!data) {
            return [];
        }

        return mapper.fromRows(data);
    }

    async exists(
        id: string,
    ): Promise<boolean> {
        const { data, error } = await this.client
            .schema("inventory")
            .from("inventory_items")
            .select("sku_id")
            .eq("sku_id", id)
            .maybeSingle();

        if (error) {
            throw error;
        }

        return !!data;
    }

    async listExisting(
        ids: readonly string[],
    ): Promise<string[]> {
        if (ids.length === 0) {
            return [];
        }

        const { data, error } = await this.client
            .schema("inventory")
            .from("inventory_items")
            .select("sku_id")
            .in("sku_id", ids);

        if (error) {
            throw error;
        }

        if (!data) {
            return [];
        }

        return data.map((row) => row.sku_id);
    }

    async find(
        options: InventoryItemQuery,
    ): Promise<InventoryItemList> {
        const query = this.createListQuery(options);
        const { data, error, count } = await query;

        if (error) {
            throw error;
        }

        return {
            items: mapper.fromRows(data || []),
            total: count ?? 0,
            page: options.page,
            pageSize: options.pageSize,
        };
    }

    async create(
        command: CreateInventoryItem,
    ): Promise<void> {
        const row = mapper.toCreateRow(command);
        const { error } = await this.client
            .schema("inventory")
            .from("inventory_items")
            .insert(row);

        if (error) {
            throw error;
        }
    }

    async createMany(
        commands: readonly CreateInventoryItem[],
    ): Promise<void> {
        if (commands.length === 0) {
            return;
        }

        const rows = mapper.toCreateRows(commands);
        const { error } = await this.client
            .schema("inventory")
            .from("inventory_items")
            .insert(rows);

        if (error) {
            throw error;
        }
    }

    async update(
        command: UpdateInventoryItem,
    ): Promise<void> {
        const row = mapper.toUpdateRow(command);
        const { error } = await this.client
            .schema("inventory")
            .from("inventory_items")
            .update(row)
            .eq("sku_id", command.skuId);

        if (error) {
            throw error;
        }
    }

    async updateMany(
        commands: readonly UpdateInventoryItem[],
    ): Promise<void> {
        if (commands.length === 0) {
            return;
        }
        
        const rows = mapper.toUpdateRows(commands);
        const { error } = await this.client
            .rpc(
                "UPDATE_INVENTORY_ITEMS",
                {
                    inventory_items: rows,
                },
            );

        if (error) {
            throw error;
        }
    }

    async delete(
        id: string,
    ): Promise<void> {
        const { error } = await this.client
            .schema("inventory")
            .from("inventory_items")
            .delete()
            .eq("sku_id", id);

        if (error) {
            throw error;
        }
    }

    async deleteMany(
        ids: readonly string[],
    ): Promise<void> {
        if (ids.length === 0) {
            return;
        }

        const { error } = await this.client
            .schema("inventory")
            .from("inventory_items")
            .delete()
            .in("sku_id", ids);

        if (error) {
            throw error;
        }
    }

    async getBySku(
        skuId: string,
    ): Promise<InventoryItemList | null> {
        const item = await this.get(skuId);
        if (!item) {
            return null;
        }

        return {
            items: [item],
            total: 1,
            page: 1,
            pageSize: 1,
        };
    }

    async findLowStock(
        threshold: number,
    ): Promise<InventoryItemList> {
        const { data, error, count } = await this.client
            .schema("inventory")
            .from("inventory_items")
            .select("*", { count: "exact" })
            .lte("available_quantity", threshold);

        if (error) {
            throw error;
        }

        return {
            items: mapper.fromRows(data || []),
            total: count ?? 0,
            page: 1,
            pageSize: (data || []).length || 1,
        };
    }

    async findOutOfStock(): Promise<InventoryItemList> {
        const { data, error, count } = await this.client
            .schema("inventory")
            .from("inventory_items")
            .select("*", { count: "exact" })
            .lte("available_quantity", 0);

        if (error) {
            throw error;
        }

        return {
            items: mapper.fromRows(data || []),
            total: count ?? 0,
            page: 1,
            pageSize: (data || []).length || 1,
        };
    }

}
