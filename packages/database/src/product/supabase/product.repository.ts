import type { SupabaseClient } from "@supabase/supabase-js";

import type {
    ProductList,
    ProductListOptions,
} from "@repo/commerce/product";


import type {
    ProductRepository,
} from "../interfaces/";
import { toProduct } from "../mappers/";


export class SupabaseProductRepository
    implements ProductRepository {

    constructor(
        private readonly client: SupabaseClient,
    ) {}

    private createListQuery(
        options: ProductListOptions,
    ) {

        let query =
            this.client
                .schema("commerce")
                .from("products")
                .select(
                    "*",
                    {
                        count: "exact",
                    },
                );

        if (options.status?.length) {

            query =
                query.in(
                    "status",
                    options.status,
                );

        }

        if (options.productIds?.length) {

            query =
                query.in(
                    "id",
                    options.productIds,
                );
        }

        if (options.keyword) {

            query =
                query.ilike(
                    "name",
                    `%${options.keyword}%`,
                );

        }

        switch (options.sort) {

            case "price-asc":

                query =
                    query.order(
                        "price",
                        {
                            ascending: true,
                        },
                    );

                break;

            case "price-desc":

                query =
                    query.order(
                        "price",
                        {
                            ascending: false,
                        },
                    );

                break;

            case "oldest":

                query =
                    query.order(
                        "created_at",
                        {
                            ascending: true,
                        },
                    );

                break;

            default:

                query =
                    query.order(
                        "created_at",
                        {
                            ascending: false,
                        },
                    );

        }

        const from =
            (options.page - 1)
            * options.pageSize;

        query =
            query.range(
                from,
                from + options.pageSize - 1,
            );

        return query;

    }


    async findById(
        id: string,
    ) {

        const commerceClient =
            this.client.schema("commerce");
        
        const { data, error } = await commerceClient
            .from("products")
            .select(`
                *, 
                product_images(*)
            `)
            .eq("id", id)
            .maybeSingle();

        if (error) {
            throw new Error(error.message);
        }

        if (!data) {
            return null;
        }

        return data;
    }

    async findBySlug(
        slug: string,
    ){
        const { data, error } = await this.client
            .from("commerce")
            .select(`
                *, 
                product_images(*)
            `)
            .eq("slug", slug)
            .maybeSingle();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async list(
        options: ProductListOptions,
    ): Promise<ProductList> {

        const query =
            this.createListQuery(options);

        const {
            data,
            error,
            count,
        } = await query;

        if (error) {
            throw error;
        }

        return {

            items:
                data.map(toProduct),

            total:
                count ?? 0,

            page:
                options.page,

            pageSize:
                options.pageSize,

        };

    }

}