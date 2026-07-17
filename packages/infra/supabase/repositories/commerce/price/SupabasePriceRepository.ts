import { SupabaseClient } from '@supabase/supabase-js';

import { SupabaseRepositoryBase } from '../../base/SupabaseRepositoryBase';

import { 
    Price, 
    PriceList, 
    PriceQuery, 
    PriceRepository,
    CreatePrice,
    UpdatePrice,
    PriceSort
} from '../../../../../commerce/domain/price';

import { PriceRow } from '../../../entities';

import { PriceRepositoryMapper as mapper } from './to-price';

export class SupabasePriceRepository
    extends SupabaseRepositoryBase<
        Price,
        string,
        CreatePrice,
        UpdatePrice,
        PriceQuery,
        PriceList,
        PriceRow
    >
    implements PriceRepository {

    constructor(
        protected readonly client: SupabaseClient,
    ) {
        super(client);
    }

    protected readonly schema = "pricing";

    protected readonly table = "prices";

    protected readonly createRpc = "create_prices";

    protected readonly updateRpc = "update_prices";

    protected readonly mapper = mapper;

    private sortMap = {

        "newest": {
            column: "effective_from",
                ascending: false,
        },

        "oldest": {
            column: "effective_from",
            ascending: true,
        },

        "price-asc": {
            column: "amount",
            ascending: true,
        },

        "price-desc": {
            column: "amount",
            ascending: false,
        },

        "effective_At-asc": {
            column: "effective_from",
            ascending: true,
        },

        "effective_At-desc": {
            column: "effective_from",
            ascending: false,
        },

    } satisfies Record<
        PriceSort,
        {
            column: string;
            ascending: boolean;
        }
    >;


    protected override buildQuery(
        options: PriceQuery,
    ) {

        let query =
            super.buildQuery(options);

        if (options.skuIds?.length) {

            query = query.in(

                "sku_id",

                options.skuIds,

            );

        }

        if (options.currency) {

            query = query.eq(

                "currency",

                options.currency,

            );

        }

        if (options.effectiveAt) {

            const date =

                options.effectiveAt.toISOString();

            query =

                query.or(

                    `effective_from.is.null,effective_from.lte.${date}`,

                );

            query =

                query.or(

                    `effective_to.is.null,effective_to.gte.${date}`,

                );

        }

        if (options.sort) {

            const sort =

                this.sortMap[options.sort];

            query = query.order(

                sort.column,

                {

                    ascending: sort.ascending,

                },

            );

        }

        const page = options.page ?? 1;
        const pageSize = options.pageSize ?? 50;
        const from = (page - 1) * pageSize;

        query = query.range(
            from,
            from + pageSize - 1,
        );

        return query;
    }

    async getBySKUId(
        skuId: string,
    ): Promise<readonly Price[]> {
        const { data, error } = await this
            .from()
            .select("*")
            .eq("sku_id", skuId);

        if (error) {
            throw new Error(`Error fetching prices for SKU ${skuId}: ${error.message}`);
        }

        if (!data) {
            return [];
        }

        return mapper.fromRows(data);
    }

    async getManyBySKUIds(
        skuIds: readonly string[],
    ): Promise<readonly Price[]> {
        const { data, error } = await this
            .from()
            .select("*")
            .in("sku_id", skuIds);

        if (error) {
            throw new Error(`Error fetching prices for SKUs ${skuIds.join(", ")}: ${error.message}`);
        }

        if (!data) {
            return [];
        }

        return mapper.fromRows(data);
    }


}
