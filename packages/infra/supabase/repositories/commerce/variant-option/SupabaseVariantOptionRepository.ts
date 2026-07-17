import { SupabaseClient } from '@supabase/supabase-js';

import {
    CreateVariantOption,
    UpdateVariantOption,
    VariantOption,
    VariantOptionList,
    VariantOptionName,
    VariantOptionQuery,
    VariantOptionRepository
} from '../../../../../commerce/domain/variant-option';


import { VariantOptionRepositoryMapper as mapper } from './mapper';
import { SupabaseRepositoryBase } from '../../base/SupabaseRepositoryBase';
import { VariantOptionRow } from '../../../entities';


export class SupabaseVariantOptionRepository
    extends SupabaseRepositoryBase<
        VariantOption,
        string,
        CreateVariantOption,
        UpdateVariantOption,
        VariantOptionQuery,
        VariantOptionList,
        VariantOptionRow
    >
    implements VariantOptionRepository {

    constructor(
        protected readonly client: SupabaseClient,
    ) {
        super(client)
    }

    protected readonly schema = "commerce";

    protected readonly table = "variant_options";

    protected readonly createRpc = "create_variant_options";

    protected readonly updateRpc = "update_variant_options";

    protected readonly mapper = mapper;

    async getByProduct(
        productId: string,
    ): Promise<readonly VariantOption[]> {
        const { data, error } = await this.client
            .schema("commerce")
            .from("variant_options")
            .select("*")
            .eq("product_id", productId);

        if (error) {

            throw error;
        }

        if (!data) {

            return [];
        }

        return mapper.fromRows(data);
    }

    async exists(
        productId: string,
        name: VariantOptionName,
    ): Promise<boolean> {

        const { count, error } =
            await this.client
                .schema("commerce")
                .from("variant_options")
                .select("*", {
                    head: true,
                    count: "exact",
                })
                .eq("product_id", productId)
                .eq("name", name);

        if (error) {
            throw error;
        }

        return (count ?? 0) > 0;
    }

    
    protected override buildQuery(
        options: VariantOptionQuery,
    ) {

        let query = super.buildQuery(options);

        if (options.ids?.length) {
            query = query.in("id", options.ids);
        }

        if (options.productIds?.length) {
            query = query.in("product_id", options.productIds);
        }

        if (options.names?.length) {
            query = query.in("name", options.names);
        }

        return query;
    }


}

