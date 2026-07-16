import { SupabaseClient } from '@supabase/supabase-js';

import { SKUVariantValue, SKUVariantValueRepository } from '../../../../../commerce/domain/sku-variant-value';

import { SKUVariantValueRepositoryMapper as mapper } from './mapper';

    export class SupabaseSKUVariantValueRepository
    implements SKUVariantValueRepository {

    constructor(
        private readonly client: SupabaseClient,
    ) {}


    async getBySKU(
        skuId: string,
    ): Promise<readonly SKUVariantValue[]> {

         const { data, error } = await this.client
            .schema("commerce")
            .from("sku_variant_values")
            .select("*")
            .eq("sku_id", skuId);

        if (error) {

            throw error;
        }

        if (!data) {

            return [];
        }

        return mapper.fromRows(data);
    }

    async getBySKUs(
        skuIds: readonly string[],
    ): Promise<
        ReadonlyMap<
            string,
            readonly SKUVariantValue[]
    >> {
        const { data, error } = await this.client
            .schema("commerce")
            .from("sku_variant_values")
            .select("*")
            .in("sku_id", skuIds);

        if (error) {

            throw error;
        }

        if (!data) {

            return new Map();
        }

        const values = mapper.fromRows(data);

        const map = new Map<string, SKUVariantValue[]>();

        for (const value of values) {

            if (!map.has(value.skuId)) {

                map.set(value.skuId, []);
            }

            map.get(value.skuId)!.push(value);
        }

        return map;
    }

    async replace(
        skuId: string,
        values: readonly SKUVariantValue[],
    ): Promise<void> {
        const { error } = await this.client
            .schema("commerce")
            .rpc("replace_sku_variant_values", {
                p_sku_id: skuId,
                p_values: mapper.toCreateRows(values),
            });

        if (error) {

            throw error;
        }
    }

    async deleteBySKU(
        skuId: string,
    ): Promise<void> {
        const { error } = await this.client
            .schema("commerce")
            .from("sku_variant_values")
            .delete()
            .eq("sku_id", skuId);

        if (error) {

            throw error;
        }

    }


}