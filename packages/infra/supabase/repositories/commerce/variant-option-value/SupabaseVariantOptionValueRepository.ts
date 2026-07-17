import { SupabaseClient } from '@supabase/supabase-js';

import type {
    CreateVariantOptionValue,
    UpdateVariantOptionValue,
    VariantOptionValue,
    VariantOptionValueList,
    VariantOptionValueQuery,
    VariantOptionValueRepository
} from '../../../../../commerce/domain/variant-option-value';

import { VariantOptionValueRepositoryMapper as mapper } from './mapper';
import { SupabaseRepositoryBase } from '../../base/SupabaseRepositoryBase';
import { VariantOptionValueRow } from '../../../entities';


export class SupabaseVariantOptionValueRepository
    extends SupabaseRepositoryBase<
        VariantOptionValue,
        string,
        CreateVariantOptionValue,
        UpdateVariantOptionValue,
        VariantOptionValueQuery,
        VariantOptionValueList,
        VariantOptionValueRow
    >
    implements VariantOptionValueRepository {

    constructor(
        protected readonly client: SupabaseClient,
    ) {
        super(client)
    }

    protected readonly schema = "commerce";

    protected readonly table = "variant_option_values";

    protected readonly createRpc = "create_variant_option_values";

    protected readonly updateRpc = "update_variant_option_values";

    protected readonly mapper = mapper;

    protected override buildQuery(
        options: VariantOptionValueQuery,
    ) {
        let query = super.buildQuery(options);

        if (options.ids?.length) {
            query = query.in("id", options.ids);
        }

        if (options.optionIds?.length) {
            query = query.in("option_id", options.optionIds);
        }

        return query;
    }

    async exists(
        optionId: string,
        value: string,
    ): Promise<boolean> {
        const { data, error } = await this.client
            .schema("commerce")
            .from("variant_option_values")
            .select("id")
            .eq("option_id", optionId)
            .eq("value", value)
            .single();

        if (error) {
            throw error;
        }

        return !!data;
    }

    async getByOption(
        optionId: string,
    ): Promise<readonly VariantOptionValue[]> {
        const { data, error } = await this.from()
            .select("*")
            .eq("option_id", optionId);

        if (error) {
            throw error;
        }

        return mapper.fromRows(data);
    }

    async getByOptions(
        optionIds: readonly string[],
    ): Promise<readonly VariantOptionValue[]> {
        const { data, error } = await this.from()
            .select("*")
            .in("option_id", optionIds);

        if (error) {
            throw error;
        }

        return mapper.fromRows(data);
    }
}