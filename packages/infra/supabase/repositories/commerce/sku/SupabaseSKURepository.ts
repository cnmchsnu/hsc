import { SupabaseClient } from '@supabase/supabase-js';

import {
    SKU,
    SKUList,
    SKUQuery,
    SKURepository,
    CreateSKU,
    UpdateSKU
} from '../../../../../commerce/domain/sku';

import { SKURow } from '../../../entities';


import { SupabaseRepositoryBase } from '../../base/SupabaseRepositoryBase';
import { SKURepositoryMapper as mapper } from './mapper';


export class SupabaseSKURepository
    extends SupabaseRepositoryBase<
        SKU,
        string,
        CreateSKU,
        UpdateSKU,
        SKUQuery,
        SKUList,
        SKURow
    >
    implements SKURepository {

    constructor(
        protected readonly client: SupabaseClient,
    ) {
        super(client);
    }

    protected readonly schema = "commerce";

    protected readonly table = "skus";

    protected readonly createRpc = "create_skus";

    protected readonly updateRpc = "update_skus";

    protected readonly mapper = mapper;    

    protected override buildQuery(
        options: SKUQuery,
    ) {
        let query =
            super.buildQuery(options);
                
        if (options.productId?.length) {
            query = 
                query.in(
                    "product_id",
                    options.productId,
                );
        }

        if (options.codes?.length) {
            query = 
                query.in(
                    "code",
                    options.codes,
                );
        }

        if (options.status?.length) {
            query = 
                query.in(
                    "status",
                    options.status,
                );
        }

        if (options.keyword) {
            query = 
                query.ilike(
                    "code",
                    `%${options.keyword}%`,
                );
        }

        if (options.sort) {
            switch (options.sort) {
                case "newest":
                    query = query.order(
                        "created_at",
                        {
                            ascending: false,
                        },
                    );

                    break;

                case "oldest":
                    query = query.order(
                        "created_at",
                        {
                            ascending: true,
                        },
                    );

                    break;

                case "code-asc":
                    query = query.order(
                        "code",
                        {
                            ascending: true,
                        },
                    );

                    break;

                case "code-desc":
                    query = query.order(
                        "code",
                        {
                            ascending: false,
                        },
                    );

                    break;
                default:
                    break;
            }

        }

        return query;

    }


    async getByCode(
        code: string,
    ): Promise<SKU | null> {
        const { data, error } = await this.client
            .schema("commerce")
            .from("skus")
            .select("*")
            .eq("code", code)
            .single();

        if (error) {

            throw error;

        }

        if (!data) {

            return null;

        }

        return mapper.fromRow(data);
    }

    async existsByCode(
        code: string,
    ): Promise<boolean> {

        const { data, error } = await this.from()
            .select("code")
            .eq("code", code)
            .single();

        if (error) {
            throw error;
        }

        return !!data;

    }

    async listExistingCode(
        codes: readonly string[],
    ): Promise<readonly string[]> {

        const { data, error } = await this.from()
            .select("code")
            .in("code", codes);

        if (error) {
            throw error;
        }

        return data.map(
            row => row.code,
        );

    }

    async getByProduct(
        productId: string,
    ): Promise<readonly SKU[]> {

        const { data, error } = await this.from()
            .select("*")
            .eq("product_id", productId);

        if (error) {
            throw error;
        }

        return mapper.fromRows(data);
    }

    async getByProducts(
        productIds: readonly string[],
    ): Promise<readonly SKU[]> {
        const { data, error } = await this.from()
            .select("*")
            .in("product_id", productIds);

        if (error) {
            throw error;
        }

        return mapper.fromRows(data);
    }

    async findActive(): Promise<readonly SKU[]> {

        const options: SKUQuery = {
            status: ["active"],
            page: 1,
            pageSize: 299,
        };

        const list = await this.find(options);

        return list.items;
    }



}