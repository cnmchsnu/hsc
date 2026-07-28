import { SupabaseClient } from '@supabase/supabase-js';

import { 
    InventoryItem, 
    InventoryItemList, 
    InventoryItemQuery, 
    InventoryItemRepository,
    CreateInventoryItem,
    UpdateInventoryItem
} from '../../../../../commerce/domain/inventory-item';

import { InventoryItemRow } from '../../../entities';

import { InventoryItemRepositoryMapper as mapper } from './mapper';

import { SupabaseRepositoryBase } from '../../base/SupabaseRepositoryBase';

export class SupabaseInventoryItemRepository
    extends SupabaseRepositoryBase<
        InventoryItem,
        string,
        CreateInventoryItem,
        UpdateInventoryItem,
        InventoryItemQuery,
        InventoryItemList,
        InventoryItemRow
    >
    implements InventoryItemRepository {

    constructor(
        protected readonly client: SupabaseClient,
    ) {
        super(client);
    }

    protected readonly schema = "inventory";

    protected readonly table = "inventory_items";

    protected readonly createRpc = "create_inventory_item";

    protected readonly updateRpc = "update_inventory_item";

    protected readonly mapper = mapper;

    protected override buildQuery(
        options: InventoryItemQuery,
    ) {
        let query = super.buildQuery(options);

        if (options.skuid) {
            query = query.eq("sku_id", options.skuid);
        }

        return query;
    }

    // Query

    async list(): Promise<InventoryItem[]> {
        const { data, error } = await this
            .from()
            .select("*", { count: "exact" });

        if (error) {
            throw error;
        }

        return [...mapper.fromRows(data)];
    
    }



    async getBySku(
        skuId: string,
    ): Promise<readonly InventoryItem[]> {
        const { data, error } = await this
            .from()
            .select("*")
            .eq("sku_id", skuId);

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) return [];

        return mapper.fromRows(data);
    }

    async getBySkus(
        skuIds: string[],
    ): Promise<readonly InventoryItem[]> {
        const { data, error } = await this
            .from()
            .select("*")
            .in("sku_id", skuIds);

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) return [];

        return mapper.fromRows(data);
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
